import React, { lazy } from 'react';

const Login = lazy(() => import('../pages/Login'));
const Home = lazy(() => import('../pages/Home'));
const Admin = lazy(() => import('../pages/Admin'));


const routes = [
    { path: '/login', element: <Login /> },
    { path: '/', element: <Home /> },
    { path: '/admin', element: <Admin /> },
];

export default routes;