import { getLanguage } from "./netUtil";

const translations = {
    zh: {
        TID_HOME: '首页',
        TID_LOGIN: '登录',
        TID_ADMIN: '后台',
        TID_SWITCH_LANGUAGE: '英文',
        TID_LOGIN_TITLE: '登录',
        TID_LOGIN_EMAIL: '邮箱',
        TID_LOGIN_PASSWORD: '密码',
        TID_LOGIN_SUCCESS: '登录成功',
        TID_LOGIN_FAILED: '登录失败: ',
        TID_LOGIN_EMAIL_TIP: '请输入邮箱',
        TID_LOGIN_EMAIL_PLZ: "请输入邮箱!",
        TID_LOGIN_EMAIL_FORMAT: "邮箱格式不正确!",
        TID_LOGIN_PASSWORD_TIP: "输入密码",
        TID_LOGIN_PASSWORD_PLZ: "请输入密码!",
        TID_LOGIN_BTN_NAME: "登录",
        TID_LOGIN_BTN_NAME_ING: "登录中",
        TID_LOGIN_NO_ACCOUNT: "没有账号? ",
        TID_REGISTER: "注册",
    },
    en: {
        TID_HOME: 'Home',
        TID_LOGIN: 'Login',
        TID_ADMIN: 'Admin',
        TID_SWITCH_LANGUAGE: 'Chinese',
        TID_LOGIN_TITLE: 'Login',
        TID_LOGIN_EMAIL: 'Email',
        TID_LOGIN_PASSWORD: 'Password',
        TID_LOGIN_SUCCESS: 'Login success',
        TID_LOGIN_FAILED: 'Login failed: ',
        TID_LOGIN_EMAIL_TIP: 'Please enter email',
        TID_LOGIN_EMAIL_PLZ: 'Please enter email!',
        TID_LOGIN_EMAIL_FORMAT: 'Email format is incorrect!',
        TID_LOGIN_PASSWORD_TIP: 'Input password',
        TID_LOGIN_PASSWORD_PLZ: 'Please enter password!',
        TID_LOGIN_BTN_NAME: 'Login',
        TID_LOGIN_BTN_NAME_ING: 'Logging ing',
        TID_LOGIN_NO_ACCOUNT: "No account? ",
        TID_REGISTER: 'Register',

    }
};

const language = getLanguage();
const _l = translations[language as 'zh' | 'en'];
export default _l;