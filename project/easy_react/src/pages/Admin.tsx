import React from "react";
import { Tabs } from "antd";
import UserManagement from "./UserManagement";
import './Admin.css';

const Admin: React.FC = () => {
    const items = [
        {
            key: "1",
            label: "用户管理",
            children: <UserManagement />
        }
    ];

    return (
        <div className="admin-container">
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
};

export default Admin;