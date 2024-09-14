import React, { useState } from 'react';
import './Admin.css'; // 导入 CSS 文件
import API_BASE_URL from '../config/config';

const Admin: React.FC = () => {
    interface User {
        user_id: number;
        username: string;
        email: string;
    }

    const [users, setUsers] = useState<User[]>([]); // 保存用户信息
    const [loading, setLoading] = useState(false); // 控制加载状态
    const [error, setError] = useState(''); // 保存错误信息

    const fetchUsers = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    page: 1, // 获取第1页的数据
                    page_size: 10, // 每页10个用户
                }),
            });

            if (!response.ok) {
                throw new Error('获取用户信息失败');
            }

            const data = await response.json();
            setUsers(data.users); // 保存用户数据
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || '未知错误');
            } else {
                setError('未知错误');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-container">
            <h1>Admin Page</h1>

            {/* 显示用户信息的按钮 */}
            <button onClick={fetchUsers} disabled={loading}>
                {loading ? '加载中...' : '查看用户信息'}
            </button>

            {/* 错误提示 */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* 用户信息列表 */}
            <div className="user-list">
                {users.length > 0 ? (
                    <ul>
                        {users.map((user) => (
                            <li key={user.user_id}>
                                用户ID: {user.user_id}, 用户名: {user.username}, 邮箱: {user.email}
                            </li>
                        ))}
                    </ul>
                ) : (
                    !loading && <p>暂无用户信息</p>
                )}
            </div>
        </div>
    );
};

export default Admin;