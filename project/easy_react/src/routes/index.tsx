import { lazy } from 'react';

const Login = lazy(() => import('../pages/Login'));
const Home = lazy(() => import('../pages/Home'));
const Admin = lazy(() => import('../pages/Admin'));
const Register = lazy(() => import('../pages/Register'));

const routes = [
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/', element: <Home /> },
    { path: '/home', element: <Home /> },
    { path: '/admin', element: <Admin /> },
];

export default routes;