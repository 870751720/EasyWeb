import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import { fetchPost } from '../utils/netUtil';
import './Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const { run: loginUser, loading: loginLoading } = useRequest(
        async () => {
            const response = await fetchPost('/user/login', { email, password });
            if (!response.ok) {
                throw new Error('登录失败');
            }
            return response.json();
        },
        {
            manual: true,
            onSuccess: (data) => {
                console.log('登录成功:', data);
                setResponseMessage('登录成功');
            },
            onError: (error) => {
                console.error('登录错误:', error);
                setResponseMessage(error.message || '登录失败');
            },
        }
    );

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginUser();
    };

    return (
        <div className="login-container">
            <h2 className="login-title">登录</h2>
            <form className="login-form" onSubmit={handleLoginSubmit}>
                <div>
                    <label className="login-label">邮箱:</label>
                    <input
                        className="login-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="login-label">密码:</label>
                    <input
                        className="login-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="login-button" type="submit" disabled={loginLoading}>
                    {loginLoading ? '登录中...' : '登录'}
                </button>
            </form>

            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default Login;