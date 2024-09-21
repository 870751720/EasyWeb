import { Tabs } from "antd";
import React from "react";
import _l from "../utils/i18n";
import './Admin.css';
import ResManagement from "./ResManagement";
import TriggerManagement from "./TriggerManagement";
import UserManagement from "./UserManagement";

const Admin: React.FC = () => {
    const items = [
        {
            key: "1",
            label: _l.TID_ADMIN_USER_MANAGEMENT,
            children: <UserManagement />
        },
        {
            key: "2",
            label: _l.TID_ADMIN_RESOURCE_MANAGEMENT,
            children: <ResManagement />
        },
        {
            key: "3",
            label: _l.TID_ADMIN_TRIGGER_MANAGEMENT,
            children: <TriggerManagement />
        }
    ];

    return (
        <div className="admin-container">
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
};

export default Admin;