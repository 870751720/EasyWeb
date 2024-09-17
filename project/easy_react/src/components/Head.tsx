import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Select } from "antd";
import { useRequest } from "ahooks";
import { fetchPost } from "../utils/netUtil";
import "./Head.css";
import _l from "../utils/i18n";

const { Option } = Select;

const Header = () => {
    const [language, setLanguage] = useState("zh");
    const [username, setUsername] = useState<string | null>(null);

    const handleLanguageChange = (value: string) => {
        setLanguage(value);
        localStorage.setItem("language", value);
        window.location.reload();
    };

    useEffect(() => {
        const lang = localStorage.getItem("language") || "zh";
        setLanguage(lang);
    }, []);

    const { run: fetchUserInfo} = useRequest(
        () => fetchPost("/user/self_info"),
        {
            manual: true,
            onSuccess: (data) => {
                if (data && data.username) {
                    setUsername(data.username);
                }
            },
            onError: () => {
                setUsername(null);
            },
        }
    );

    useEffect(() => {
        fetchUserInfo();
    }, [fetchUserInfo]);

    return (
        <header
            style={{
                padding: "10px",
                backgroundColor: "#f0f0f0",
                marginBottom: "20px",
            }}
        >
            <nav>
                <Link to="/" style={{ marginRight: "20px" }}>
                    {_l.TID_HOME}
                </Link>
                {username ? (
                    <span style={{ marginRight: "20px" }}>{username}</span>
                ) : (
                    <Link to="/login" style={{ marginRight: "20px" }}>
                        {_l.TID_LOGIN}
                    </Link>
                )}
                <Link to="/admin">{_l.TID_ADMIN}</Link>

                <Select
                    value={language}
                    onChange={handleLanguageChange}
                    style={{ width: 120, marginLeft: "20px" }}
                >
                    <Option value="zh">中文</Option>
                    <Option value="en">English</Option>
                    <Option value="jp">日本語</Option>
                </Select>
            </nav>
        </header>
    );
};

export default Header;
