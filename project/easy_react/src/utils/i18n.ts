import { getLanguage } from "./netUtil";

const translations = {
    zh: {
        home: '首页',
        login: '登录',
        admin: '后台',
        switch_language: 'English',
    },
    en: {
        home: 'Home',
        login: 'Login',
        admin: 'Admin',
        switch_language: '中文',
    }
};

const language = getLanguage();
const _l = translations[language as 'zh' | 'en'];
export default _l;