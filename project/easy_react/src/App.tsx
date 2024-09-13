import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // 更新导入
import Login from './components/Login';

const App: React.FC = () => {
    return (
        <Router>
            <Routes> {/* 更新这里 */}
                <Route path="/login" element={<Login />} /> {/* 更新这里 */}
                <Route path="/" element={<Navigate to="/login" />} /> {/* 更新这里 */}
            </Routes> {/* 更新这里 */}
        </Router>
    );
};

export default App;
