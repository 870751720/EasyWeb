import React from "react";
import { Button, message, Space } from "antd";
import { useRequest } from "ahooks";
import { fetchGet } from "../utils/netUtil";
import _l from "../utils/i18n";

const TriggerManagement: React.FC = () => {
    const { run: initDatabaseRequest } = useRequest(
        () => fetchGet("/init_project/create_tables"),
        {
            manual: true,
            onSuccess: (data) => {
                message.success(data.message);
            },
            onError: (error) => {
                message.error(error.message);
            },
        }
    );

    const handleInitDatabase = () => {
        initDatabaseRequest();
    };

    return (
        <div style={{ padding: "16px" }}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Button
                    type="primary"
                    onClick={handleInitDatabase}
                >
                    {_l.TID_MANAGE_TRIGGER_INIT_DF}
                </Button>
            </Space>
        </div>
    );
};

export default TriggerManagement;