import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <h1>欢迎来到主页</h1>
            <p>这是一个简单的主页示例。</p>
            <nav>
                <ul>
                    <li>
                        <Link to="/admin">前往后台管理页面</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;