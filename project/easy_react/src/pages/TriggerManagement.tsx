import React from "react";
import { Button, message } from "antd";
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
            <Button
                type="primary"
                onClick={handleInitDatabase}
                style={{ marginBottom: "16px" }}
            >
                {_l.TID_MANAGE_TRIGGER_INIT_DF}
            </Button>
        </div>
    );
};

export default TriggerManagement;