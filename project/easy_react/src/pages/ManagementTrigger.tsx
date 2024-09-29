import { useRequest } from "ahooks";
import { Button, message, Space } from "antd";
import React from "react";
import _l from "../utils/i18n";
import { fetchGet } from "../utils/netUtil";

const ManagementTrigger: React.FC = () => {
    const { run: fetchDropRequest } = useRequest(
        () => fetchGet("/init_project/drop"),
        {
            manual: true,
            onSuccess: (data) => {
                message.success(_l.TID_COMMON_SUCCESS);
            },
        }
    );

    return (
        <div style={{ padding: "16px" }}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                <Button type="primary" onClick={fetchDropRequest}>{_l.TID_MAMAGE_TRIGGER_DROP}</Button>
            </Space>
        </div>
    );
};

export default ManagementTrigger;
