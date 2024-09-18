import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import { useRequest } from "ahooks";
import { fetchGet } from "../utils/netUtil";
import _l from "../utils/i18n";

const TriggerManagement: React.FC = () => {
    const [logsVisible, setLogsVisible] = useState(false);
    const [logsContent, setLogsContent] = useState("");

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

    const { run: fetchDockerLogs } = useRequest(
        () => fetchGet("/init_project/docker_logs"),
        {
            manual: true,
            onSuccess: (data) => {
                setLogsContent(data.logs);
                setLogsVisible(true);
            },
            onError: (error) => {
                message.error(error.message);
            },
        }
    );

    const handleInitDatabase = () => {
        initDatabaseRequest();
    };

    const handleFetchLogs = () => {
        fetchDockerLogs();
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

            <Button
                type="default"
                onClick={handleFetchLogs}
                style={{ marginBottom: "16px" }}
            >
                {_l.TID_MANAGE_TRIGGER_DOCKER_LOGS}
            </Button>

            <Modal
                title={_l.TID_MANAGE_TRIGGER_DOCKER_LOGS}
                open={logsVisible}
                onCancel={() => setLogsVisible(false)}
                footer={null}
                width={800}
            >
                <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                    {logsContent}
                </pre>
            </Modal>
        </div>
    );
};

export default TriggerManagement;