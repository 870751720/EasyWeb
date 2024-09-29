import { useRequest } from 'ahooks';
import React, { useEffect, useState } from 'react';
import { fetchGet, resUrl } from '../utils/netUtil';
import { Card, Typography } from 'antd';
const { Text } = Typography;


const Home: React.FC = () => {
    interface Recommend {
        res_info: string;
        res_type: string;
    }

    const [recommend, setRecommend] = useState<Recommend>();
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

    const renderContent = () => {
        if (!recommend) return null;

        switch (recommend.res_type) {
            case 'txt':
                return (
                    <Card style={{ width: 600 }}>
                        <Text>{recommend.res_info}</Text>
                    </Card>
                );
            case 'img':
                return (
                    <Card style={{ width: 600 }}>
                        <img src={resUrl(recommend.res_info)} alt="img" style={{ width: '100%' }} />
                    </Card>
                );
            case 'video':
                return (
                    <Card style={{ width: 600 }}>
                        <video src={recommend.res_info} controls style={{ width: '100%' }} />
                    </Card>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
            {renderContent()}
        </div>
    );
};

export default Home;