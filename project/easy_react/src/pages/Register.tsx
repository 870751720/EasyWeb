import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import API_BASE_URL from '../config/config';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [deleteMessage, setDeleteMessage] = useState(''); // 添加删除表的消息状态
    const [createMessage, setCreateMessage] = useState(''); // 添加创建表的消息状态

    const { run: registerUser, loading } = useRequest(
        async () => {
            const response = await fetch(`${API_BASE_URL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }),
            });
            if (!response.ok) {
                throw new Error('注册失败');
            }
            return response.json();
        },
        {
            manual: true,
            onSuccess: (data) => {
                console.log('注册成功:', data);
                setResponseMessage(data.message);
            },
            onError: (error) => {
                console.error('注册错误:', error);
                setResponseMessage(error.message);
            },
        }
    );

    // 添加删除数据表的请求
    const { run: deleteTables, loading: deleting } = useRequest(
        async () => {
            const response = await fetch(`${API_BASE_URL}/init_project/delete_tables`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('删除数据表失败');
            }
            return response.json();
        },
        {
            manual: true,
            onSuccess: (data) => {
                console.log('删除成功:', data);
                setDeleteMessage(data.message);
            },
            onError: (error) => {
                console.error('删除错误:', error);
                setDeleteMessage(error.message);
            },
        }
    );

    // 添加创建数据表的请求
    const { run: createTables, loading: creating } = useRequest(
        async () => {
            const response = await fetch(`${API_BASE_URL}/init_project/create_tables`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('创建数据表失败');
            }
            return response.json();
        },
        {
            manual: true,
            onSuccess: (data) => {
                console.log('创建成功:', data);
                setCreateMessage(data.message);
            },
            onError: (error) => {
                console.error('创建错误:', error);
                setCreateMessage(error.message);
            },
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        registerUser();
    };

    return (
        <div>
            <h2>注册</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>用户名:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>密码:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>邮箱:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? '注册中...' : '注册'}
                </button>
            </form>

            {responseMessage && <p>{responseMessage}</p>}

            {/* 添加删除数据表的按钮 */}
            <button onClick={() => deleteTables()} disabled={deleting}>
                {deleting ? '删除中...' : '删除数据表'}
            </button>
            {deleteMessage && <p>{deleteMessage}</p>}

            {/* 添加创建数据表的按钮 */}
            <button onClick={() => createTables()} disabled={creating}>
                {creating ? '创建中...' : '创建数据表'}
            </button>
            {createMessage && <p>{createMessage}</p>}
        </div>
    );
};

export default Register;