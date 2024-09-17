import { getLanguage } from "./netUtil";

const translations = {
    zh: {
        TID_HOME: '首页',
        TID_LOGIN: '登录',
        TID_ADMIN: '后台',
        TID_SWITCH_LANGUAGE: 'English',
    },
    en: {
        TID_HOME: 'Home',
        TID_LOGIN: 'Login',
        TID_ADMIN: 'Admin',
        TID_SWITCH_LANGUAGE: '中文',
    }
};

const language = getLanguage();
const _l = translations[language as 'zh' | 'en'];
export default _l;