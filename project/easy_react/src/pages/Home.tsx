import React from 'react';
import './Home.css';
import _l from "../utils/i18n";

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <h1>{_l.TID_HOME}</h1>
        </div>
    );
};

export default Home;