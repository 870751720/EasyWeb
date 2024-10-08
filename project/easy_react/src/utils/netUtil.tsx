import { message } from 'antd';
import { API_BASE_URL } from "./config";

const getAccessToken = () => localStorage.getItem('accessToken');

export const setAccessToken = (token: string) => localStorage.setItem('accessToken', token);

export const setLanguage = (language: string) => localStorage.setItem('language', language);

export const getLanguage = () => localStorage.getItem('language') || 'zh';

export const resUrl = (urlPath: string) => `${API_BASE_URL}/upload/file/${urlPath}`;

export const fetchPost = async (urlPath: string, bodyData: Record<string, any> = {}) => {
    const accessToken = getAccessToken();
    let defaultHeaders: Record<string, string> = {
        'Accept-Language': getLanguage(),
        'Content-Type': 'application/json',
    };
    if (accessToken) {
        defaultHeaders['Authorization'] = accessToken;
    }
    const response = await fetch(`${API_BASE_URL}${urlPath}`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(bodyData),
    });
    if (!response.ok) {
        throw new Error('Error response from server');
    }
    let data = await response.json();
    if (data.status !== 200) {
        if (data.status === -2) {
            message.error(data.error);
            setAccessToken("");
            window.location.reload();
        }
        throw new Error(data.error);
    }
    return data;
};

export const fetchGet = async (urlPath: string, queryParams: Record<string, any> = {}) => {
    const accessToken = getAccessToken();
    let defaultHeaders: Record<string, string> = {
        'Accept-Language': getLanguage(),
    };
    if (accessToken) {
        defaultHeaders['Authorization'] = accessToken;
    }

    const queryString = Object.keys(queryParams).length
        ? '?' + new URLSearchParams(queryParams).toString()
        : '';

    const fullUrl = `${API_BASE_URL}${urlPath}${queryString}`;

    const response = await fetch(fullUrl, {
        method: 'GET',
        headers: defaultHeaders,
    });

    if (!response.ok) {
        throw new Error('Error response from server');
    }
    let data = await response.json();
    if (data.status !== 200) {
        if (data.status === -2) {
            message.error(data.error);
            setAccessToken("");
            window.location.reload();
        }
        throw new Error(data.error);
    }
    return data;
};

export const fetchUpload = async (urlPath: string, file: File) => {
    const accessToken = getAccessToken();
    let defaultHeaders: Record<string, string> = {
        'Accept-Language': getLanguage(),
    };
    if (accessToken) {
        defaultHeaders['Authorization'] = accessToken;
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}${urlPath}`, {
        method: 'POST',
        headers: defaultHeaders, // FormData 不需要 'Content-Type'，浏览器会自动设置
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Error response from server');
    }

    const data = await response.json();
    if (data.status !== 200) {
        if (data.status === -2) {
            message.error(data.error);
            setAccessToken("");
            window.location.reload();
        }
        throw new Error(data.error);
    }

    return data;
};