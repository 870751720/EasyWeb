import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Head.css';
import _l from "../utils/i18n"


const Header = () => {
    const [language, setLanguage] = useState('zh');

    const toggleLanguage = () => {
        const newLanguage = language === 'zh' ? 'en' : 'zh';
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
        window.location.reload();
    };

    useEffect(() => {
        const lang = localStorage.getItem('language') || 'zh';
        setLanguage(lang);
    }, []);

    return (
        <header style={{ padding: '10px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
            <nav>
                <Link to="/" style={{ marginRight: '20px' }}>
                    {_l.home}
                </Link>
                <Link to="/login" style={{ marginRight: '20px' }}>
                    {_l.login}
                </Link>
                <Link to="/admin">
                    {_l.admin}
                </Link>
            </nav>

            <button onClick={toggleLanguage} style={{ marginLeft: '20px' }}>
                {_l.switch_language}
            </button>
        </header>
    );
};

export default Header;