import React, { useState } from 'react';
import './Login.css'; // 直接导入 Login.css

const Login: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('登录信息:', { username, password });
	};

	return (
		<div className="login-container"> {/* 使用普通的类名 */}
			<h2 className="login-title">登录</h2>
			<form className="login-form" onSubmit={handleSubmit}>
				<div>
					<label className="login-label">用户名:</label>
					<input
						className="login-input"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
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
		</div>
	);
};

export default Login;
