import React, { useState } from "react";
import "./Admin.css";
import { useRequest } from "ahooks";
import { fetchPost } from "../utils/netUtil";

const Admin: React.FC = () => {
    interface User {
        user_id: number;
        username: string;
        email: string;
    }

    const [users, setUsers] = useState<User[]>([]);

    const { run: fetchUsersRequest, loading: fetchLoading } = useRequest(
        () =>
            fetchPost("/user/users", {
                page: 1,
                page_size: 10,
            }),
        {
            manual: true,
            onSuccess: (data) => {
                setUsers(data.users);
            },
        }
    );

    return (
        <div className="admin-container">
            <button onClick={fetchUsersRequest} disabled={fetchLoading}>
                {fetchLoading ? "加载中..." : "查看用户信息"}
            </button>

            <div className="user-list">
                <ul>
                    {users.map((user: User) => (
                        <li key={user.user_id}>
                            用户ID: {user.user_id}, 用户名: {user.username},
                            邮箱: {user.email}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Admin;
