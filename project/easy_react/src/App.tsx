import React, { Suspense } from 'react';
import { Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Head';
import routes from './routes';

const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {routes.map((route) => (
                        <Route key={route.path} path={route.path} element={route.element} />
                    ))}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;