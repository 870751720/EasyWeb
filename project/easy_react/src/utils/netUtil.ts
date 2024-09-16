import { API_BASE_URL } from "./config";

const getAccessToken = () => localStorage.getItem('accessToken');

export const setAccessToken = (token: string) => localStorage.setItem('accessToken', token);

export const setLanguage = (language: string) => localStorage.setItem('language', language);

export const getLanguage = () => localStorage.getItem('language') || 'zh';

export const fetchPost = async (urlPath: string, bodyData: Record<string, any>) => {
    const accessToken = getAccessToken();
    let defaultHeaders: Record<string, string> = {
        'Accept-Language': getLanguage(),
        'Content-Type': 'application/json',
    };
    console.log(getLanguage());
    if (accessToken) {
        defaultHeaders['Authorization'] = accessToken;
    }
    const response = await fetch(`${API_BASE_URL}${urlPath}`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(bodyData),
    });
    return response;
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

    return response;
};