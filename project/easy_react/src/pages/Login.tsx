import React, { useState } from 'react';
import API_BASE_URL from '../config/config';
import './Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(''); // 新增token状态

    // 登录请求
    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('登录成功:', data);
                setIsLoggedIn(true);
                setToken(data.token);  // 保存token
                setResponseMessage('登录成功');
            } else {
                throw new Error(data.message || '登录失败');
            }
        } catch (error: any) {
            console.error('登录错误:', error);
            setResponseMessage(error.message);
        }
    };

    // 更改用户名请求
    const handleUsernameChangeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/user/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // 将token加入请求头
                },
                body: JSON.stringify({ username: newUsername , user_id: 1}),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('用户名修改成功:', data);
                setResponseMessage('用户名修改成功');
            } else {
                throw new Error(data.message || '用户名修改失败');
            }
        } catch (error: any) {
            console.error('修改用户名错误:', error);
            setResponseMessage(error.message);
        }
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
                <button className="login-button" type="submit">登录</button>
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
                        <button className="login-button" type="submit">更改用户名</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Login;