import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Head.css';

const Header: React.FC = () => {
    const [language, setLanguage] = useState<string>(localStorage.getItem('language') || 'zh'); // 默认中文

    // 切换语言
    const toggleLanguage = () => {
        const newLanguage = language === 'zh' ? 'en' : 'zh';
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };

    // 在语言改变时，更新页面内容
    useEffect(() => {
        const lang = localStorage.getItem('language') || 'zh';
        setLanguage(lang);
    }, []);

    return (
        <header style={{ padding: '10px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
            <nav>
                <Link to="/" style={{ marginRight: '20px' }}>
                    {language === 'zh' ? '首页' : 'Home'}
                </Link>
                <Link to="/login" style={{ marginRight: '20px' }}>
                    {language === 'zh' ? '登录' : 'Login'}
                </Link>
                <Link to="/admin">
                    {language === 'zh' ? '后台' : 'Admin'}
                </Link>
            </nav>
            {/* 语言切换按钮 */}
            <button onClick={toggleLanguage} style={{ marginLeft: '20px' }}>
                {language === 'zh' ? 'English' : '中文'}
            </button>
        </header>
    );
};

export default Header;