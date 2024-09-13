import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import API_BASE_URL from '../config/config';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { run: registerUser, loading } = useRequest(
        async () => {
            const response = await fetch(`${API_BASE_URL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
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
            },
            onError: (error) => {
                console.error('注册错误:', error);
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
                <button type="submit" disabled={loading}>
                    {loading ? '注册中...' : '注册'}
                </button>
            </form>
        </div>
    );
};

export default Register;