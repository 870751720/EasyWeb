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
    const [responseMessage, setResponseMessage] = useState("");

    const { run: fetchUsersRequest, loading: fetchLoading } = useRequest(
        () =>
            fetchPost("/user/users", {
                page: 1,
                page_size: 10,
            }),
        {
            manual: true,
            onSuccess: (data) => {
                console.log("用户信息获取成功:", data);
                setUsers(data.users);
                setResponseMessage("用户信息获取成功");
            },
            onError: (error) => {
                console.error("获取用户信息错误:", error);
                setResponseMessage(error.message || "获取用户信息失败");
            },
        }
    );

    return (
        <div className="admin-container">
            <h1>Admin Page</h1>

            {/* 显示用户信息的按钮 */}
            <button onClick={fetchUsersRequest} disabled={fetchLoading}>
                {fetchLoading ? "加载中..." : "查看用户信息"}
            </button>

            {/* 错误或成功提示 */}
            {responseMessage && <p>{responseMessage}</p>}

            {/* 用户信息列表 */}
            <div className="user-list">
                {users.length > 0 ? (
                    <ul>
                        {users.map((user: User) => (
                            <li key={user.user_id}>
                                用户ID: {user.user_id}, 用户名: {user.username},
                                邮箱: {user.email}
                            </li>
                        ))}
                    </ul>
                ) : (
                    !fetchLoading && <p>暂无用户信息</p>
                )}
            </div>
        </div>
    );
};

export default Admin;
