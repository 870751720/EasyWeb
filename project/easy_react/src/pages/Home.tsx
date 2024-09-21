import React from 'react';
import _l from "../utils/i18n";
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <h1>{_l.TID_HOME}</h1>
        </div>
    );
};

export default Home;