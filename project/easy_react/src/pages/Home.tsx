import React, { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { Card } from "antd";
import { fetchGet, resUrl } from "../utils/netUtil";
import "./Home.css";

const Home: React.FC = () => {
    interface Recommend {
        res_info: string;
        res_type: string;
    }

    const [recommend, setRecommend] = useState<Recommend>();
    const [displayedText, setDisplayedText] = useState("");

    const { run: fetchRecommendGetRequest } = useRequest(
        () => fetchGet("/recommend/get"),
        {
            manual: true,
            onSuccess: (data) => {
                setRecommend({
                    res_info: data.res_info,
                    res_type: data.res_type,
                });
            },
        }
    );

    useEffect(() => {
        fetchRecommendGetRequest();
    }, [fetchRecommendGetRequest]);

    useEffect(() => {
        if (recommend?.res_type === "txt" && recommend?.res_info) {
            let currentIndex = -1;
            const intervalId = setInterval(() => {
                if (currentIndex + 1 < recommend.res_info.length) {
                    setDisplayedText((prev) => prev + recommend.res_info[currentIndex]);
                    currentIndex++;
                    console.log(currentIndex, recommend.res_info[currentIndex]);
                } else {
                    clearInterval(intervalId);
                }
            }, 100);

            return () => clearInterval(intervalId);
        }
    }, [recommend]);

    const renderContent = () => {
        if (!recommend) return null;

        switch (recommend.res_type) {
            case "txt":
                return (
                    <Card style={{ width: 800 }}>
                        <div className="styled-text">{displayedText}</div>
                    </Card>
                );
            case "img":
                return (
                    <Card style={{ width: 800 }}>
                        <img
                            src={resUrl(recommend.res_info)}
                            alt="img"
                            style={{
                                width: "100%",
                                maxHeight: "600px",
                                objectFit: "cover",
                            }}
                        />
                    </Card>
                );
            case "video":
                return (
                    <Card style={{ width: 800 }}>
                        <video
                            src={resUrl(recommend.res_info)}
                            controls
                            style={{ width: "100%" }}
                        />
                    </Card>
                );
            default:
                return null;
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                height: "100vh",
                paddingTop: "50px",
            }}
        >
            {renderContent()}
        </div>
    );
};

export default Home;