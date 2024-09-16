
const API_BASE_URL = 'http://123.207.50.78';
const getAccessToken = () => localStorage.getItem('accessToken');
const getLanguage = () => localStorage.getItem('language') || 'zh';


export const setAccessToken = (token: string) => localStorage.setItem('accessToken', token);

export const setLanguage = (language: string) => localStorage.setItem('language', language);

export const fetchPost = async (urlPath: string, bodyData: Record<string, any>) => {
    const accessToken = getAccessToken();
    let defaultHeaders: Record<string, string> = {
        'Language': getLanguage(),
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
    return response;
};

export const fetchGet = async (urlPath: string, queryParams: Record<string, any> = {}) => {
    const accessToken = getAccessToken();
    let defaultHeaders: Record<string, string> = {
        'Language': getLanguage(),
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