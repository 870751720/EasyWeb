import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import API_BASE_URL from '../config/config';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(''); // 保存token状态

    // 登录请求
    const { run: loginUser, loading: loginLoading } = useRequest(
        async () => {
            const response = await fetch(`${API_BASE_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                throw new Error('登录失败');
            }
            return response.json();
        },
        {
            manual: true,
            onSuccess: (data) => {
                console.log('登录成功:', data);
                setIsLoggedIn(true);
                setToken(data.token); // 保存token
                setResponseMessage('登录成功');
            },
            onError: (error) => {
                console.error('登录错误:', error);
                setResponseMessage(error.message || '登录失败');
            },
        }
    );

    // 更改用户名请求
    const { run: updateUsername, loading: updateLoading } = useRequest(
        async () => {
            const response = await fetch(`${API_BASE_URL}/user/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // 使用token进行身份验证
                },
                body: JSON.stringify({ username: newUsername }),
            });
            if (!response.ok) {
                throw new Error('用户名修改失败');
            }
            return response.json();
        },
        {
            manual: true,
            onSuccess: (data) => {
                console.log('用户名修改成功:', data);
                setResponseMessage('用户名修改成功');
            },
            onError: (error) => {
                console.error('修改用户名错误:', error);
                setResponseMessage(error.message || '用户名修改失败');
            },
        }
    );

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginUser(); // 触发登录请求
    };

    const handleUsernameChangeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUsername(); // 触发用户名更改请求
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

            {isLoggedIn && (
                <div>
                    <h3>更改用户名</h3>
                    <form onSubmit={handleUsernameChangeSubmit}>
                        <div>
                            <label className="login-label">新用户名:</label>
                            <input
                                className="login-input"
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                required
                            />
                        </div>
                        <button className="login-button" type="submit" disabled={updateLoading}>
                            {updateLoading ? '更改中...' : '更改用户名'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Login;