import { getLanguage } from "./netUtil"

const translations = {
	zh: {
		TID_COMMON_PASSWORD: "密码",
		TID_COMMON_EMAIL: "邮箱",
		TID_COMMON_LOGIN: "登录",
		TID_COMMON_LOGOUT: "注销",
		TID_COMMON_USER_INFO: "用户信息",
		TID_COMMON_CONFIRM: "确认",
		TID_COMMON_CANCEL: "取消",
		TID_COMMON_LAST_PAGE: "上一页",
		TID_COMMON_NEXT_PAGE: "下一页",
		TID_COMMON_OPERATION: "操作",
		TID_COMMON_SUCCESS: "成功",
		TID_COMMON_FAILED: "失败",
		TID_COMMON_UPLOAD: "上传",
		TID_COMMON_ID: "ID",
		TID_COMMON_PATH: "路径",
		TID_COMMON_CHOOSE: "选择",
		TID_COMMON_PLZ_CHOOSE: "请选择",
		TID_COMMON_HAS_CHOOSE: "已选择",
		TID_COMMON_COMMIT: "提交",
		TID_COMMON_REMOVE_CONFIRM: "确定删除吗?",
		TID_COMMON_PREVIEW: "预览",
		TID_COMMON_ADD: "添加",
		TID_COMMON_EDIT: "编辑",
		TID_COMMON_REMOVE: "删除",
		TID_COMMON_TXT: "文本",
		TID_COMMON_IMG: "图片",
		TID_COMMON_VIDEO: "视频",
		TID_COMMON_MEMORY: "内存",
		TID_COMMON_TOTAL: "总共",
		TID_COMMON_AVAILABLE: "可用",
		TID_COMMON_USED: "已用",
		TID_COMMON_USE_PERCENT: "使用率",
		TID_COMMON_DISK: "磁盘",
		TID_COMMON_NETWORK: "网络",
		TID_COMMON_SENT: "已发送",
		TID_COMMON_RECEIVED: "已接收",

		TID_HOME: "首页",
		TID_ADMIN: "后台",
		TID_SWITCH_LANGUAGE: "语言",
		TID_SWITCH_LANGUAGE_NOW: "简体中文",
		TID_LOGIN_SUCCESS: "登录成功",
		TID_LOGIN_FAILED: "登录失败: ",
		TID_LOGIN_EMAIL_TIP: "请输入邮箱",
		TID_LOGIN_EMAIL_PLZ: "请输入邮箱!",
		TID_LOGIN_EMAIL_FORMAT: "邮箱格式不正确!",
		TID_LOGIN_PASSWORD_TIP: "输入密码",
		TID_LOGIN_PASSWORD_PLZ: "请输入密码!",
		TID_LOGIN_BTN_NAME_ING: "登录中",
		TID_LOGIN_NO_ACCOUNT: "没有账号? ",
		TID_REGISTER: "注册",
		TID_REGISTER_TRY_SUCCESS: "邮件发送成功",
		TID_REGISTER_TRY_FAILED: "注册失败: ",
		TID_REGISTER_TITLE: "注册",
		TID_REGISTER_NAME: "用户名",
		TID_REGISTER_NAME_TIP: "输入用户名",
		TID_REGISTER_NAME_PLZ: "请输入用户名!",
		TID_REGISTER_NAME_OVER: "用户名过长",
		TID_REGISTER_PASSWORD: "密码",
		TID_REGISTER_PASSWORD_TIP: "输入密码",
		TID_REGISTER_PASSWORD_PLZ: "请输入密码!",
		TID_REGISTER_PASSWORD_OVER: "密码过长",
		TID_REGISTER_PASSWORD_CONFIRM: "确认密码",
		TID_REGISTER_PASSWORD_CONFIRM_TIP: "输入确认密码",
		TID_REGISTER_PASSWORD_CONFIRM_PLZ: "请确认密码!",
		TID_REGISTER_PASSWORD_CONFIRM_ERROR: "两次输入的密码不匹配!",
		TID_REGISTER_EMAIL_TIP: "输入邮箱",
		TID_REGISTER_EMAIL_PLZ: "请输入邮箱!",
		TID_REGISTER_EMAIL_FORMAT: "邮箱格式不正确!",
		TID_REGISTER_BTN_NAME: "注册",
		TID_REGISTER_BTN_NAME_ING: "注册中",
		TID_REGISTER_HAS_ACCOUNT: "已有账号? ",
		TID_REGISTER_EMAIL_CONFIRM: "请在邮箱确认",
		TID_MANAGE_USER_ROLE: "角色",
		TID_MANAGE_USER_ROLE_USER: "用户",
		TID_MANAGE_USER_ROLE_ADMIN: "管理员",
		TID_MANAGE_USER_ROLE_SUPER: "超级管理员",
		TID_ADMIN_USER_MANAGEMENT: "用户管理",
		TID_ADMIN_RESOURCE_MANAGEMENT: "资源管理",
		TID_ADMIN_RECOMMEND_MANAGEMENT: "推荐管理",
		TID_ADMIN_TRIGGER_MANAGEMENT: "触发器管理",
		TID_ADMIN_SERVER_STATUS_MANAGEMENT: "服务器状态管理",
		TID_MANAGE_TRIGGER_DOCKER_LOGS: "Docker 日志",
		TID_MAMAGE_TRIGGER_DROP: "删除数据库",
		TID_MAMAGE_RECOMMEND_INFO: "推荐信息",
		TID_MAMAGE_RECOMMEND_TYPE: "推荐类型",
		TID_MAMAGE_RECOMMEND_RANDOM: "推荐权重"
	},
	en: {
		TID_COMMON_PASSWORD: "Password",
		TID_COMMON_EMAIL: "Email",
		TID_COMMON_LOGIN: "Login",
		TID_COMMON_LOGOUT: "Logout",
		TID_COMMON_USER_INFO: "User information",
		TID_COMMON_CONFIRM: "Confirm",
		TID_COMMON_CANCEL: "Cancel",
		TID_COMMON_LAST_PAGE: "Previous page",
		TID_COMMON_NEXT_PAGE: "Next page",
		TID_COMMON_OPERATION: "Operation",
		TID_COMMON_SUCCESS: "Success",
		TID_COMMON_FAILED: "Failed",
		TID_COMMON_UPLOAD: "Upload",
		TID_COMMON_ID: "ID",
		TID_COMMON_PATH: "Path",
		TID_COMMON_CHOOSE: "Choose",
		TID_COMMON_PLZ_CHOOSE: "Please choose",
		TID_COMMON_HAS_CHOOSE: "Has choose",
		TID_COMMON_COMMIT: "Commit",
		TID_COMMON_REMOVE_CONFIRM: "Do you want to delete?",
		TID_COMMON_PREVIEW: "Preview",
		TID_COMMON_ADD: "Add",
		TID_COMMON_EDIT: "Edit",
		TID_COMMON_REMOVE: "Delete",
		TID_COMMON_TXT: "Text",
		TID_COMMON_IMG: "Image",
		TID_COMMON_VIDEO: "Video",
		TID_COMMON_MEMORY: "Memory",
		TID_COMMON_TOTAL: "Total",
		TID_COMMON_AVAILABLE: "Available",
		TID_COMMON_USED: "Used",
		TID_COMMON_USE_PERCENT: "Use percentage",
		TID_COMMON_DISK: "Disk",
		TID_COMMON_NETWORK: "Network",
		TID_COMMON_SENT: "Sent",
		TID_COMMON_RECEIVED: "Received",

		TID_HOME: "Home",
		TID_ADMIN: "Admin",
		TID_SWITCH_LANGUAGE: "Language",
		TID_SWITCH_LANGUAGE_NOW: "English",
		TID_LOGIN_SUCCESS: "Login success",
		TID_LOGIN_FAILED: "Login failed: ",
		TID_LOGIN_EMAIL_TIP: "Please enter email",
		TID_LOGIN_EMAIL_PLZ: "Please enter email!",
		TID_LOGIN_EMAIL_FORMAT: "Email format is incorrect!",
		TID_LOGIN_PASSWORD_TIP: "Input password",
		TID_LOGIN_PASSWORD_PLZ: "Please enter password!",
		TID_LOGIN_BTN_NAME_ING: "Logging ing",
		TID_LOGIN_NO_ACCOUNT: "No account? ",
		TID_REGISTER: "Register",
		TID_REGISTER_TRY_SUCCESS: "Email sent successfully",
		TID_REGISTER_TRY_FAILED: "Register failed: ",
		TID_REGISTER_TITLE: "Register",
		TID_REGISTER_NAME: "Username",
		TID_REGISTER_NAME_TIP: "Input username",
		TID_REGISTER_NAME_PLZ: "Please enter username!",
		TID_REGISTER_NAME_OVER: "Username too long",
		TID_REGISTER_PASSWORD: "Password",
		TID_REGISTER_PASSWORD_TIP: "Input password",
		TID_REGISTER_PASSWORD_PLZ: "Please enter password!",
		TID_REGISTER_PASSWORD_OVER: "Password too long",
		TID_REGISTER_PASSWORD_CONFIRM: "Confirm password",
		TID_REGISTER_PASSWORD_CONFIRM_TIP: "Input confirm password",
		TID_REGISTER_PASSWORD_CONFIRM_PLZ: "Please confirm password!",
		TID_REGISTER_PASSWORD_CONFIRM_ERROR: "Two passwords do not match!",
		TID_REGISTER_EMAIL_TIP: "Input email",
		TID_REGISTER_EMAIL_PLZ: "Please enter email!",
		TID_REGISTER_EMAIL_FORMAT: "Email format is incorrect!",
		TID_REGISTER_BTN_NAME: "Register",
		TID_REGISTER_BTN_NAME_ING: "Registering",
		TID_REGISTER_HAS_ACCOUNT: "Has account? ",
		TID_REGISTER_EMAIL_CONFIRM: "Please confirm email",
		TID_MANAGE_USER_ROLE: "Role",
		TID_MANAGE_USER_ROLE_USER: "User",
		TID_MANAGE_USER_ROLE_ADMIN: "Admin",
		TID_MANAGE_USER_ROLE_SUPER: "Super",
		TID_ADMIN_USER_MANAGEMENT: "User management",
		TID_ADMIN_RESOURCE_MANAGEMENT: "Resource management",
		TID_ADMIN_RECOMMEND_MANAGEMENT: "Recommend management",
		TID_ADMIN_TRIGGER_MANAGEMENT: "Trigger management",
		TID_ADMIN_SERVER_STATUS_MANAGEMENT: "Server status management",
		TID_MANAGE_TRIGGER_DOCKER_LOGS: "Docker logs",
		TID_MAMAGE_TRIGGER_DROP: "Drop database",
		TID_MAMAGE_RECOMMEND_INFO: "Recommend information",
		TID_MAMAGE_RECOMMEND_TYPE: "Recommend type",
		TID_MAMAGE_RECOMMEND_RANDOM: "Recommend weight"
	},
	jp: {
		TID_COMMON_PASSWORD: "パスワード",
		TID_COMMON_EMAIL: "メールアドレス",
		TID_COMMON_LOGIN: "ログイン",
		TID_COMMON_LOGOUT: "ログアウト",
		TID_COMMON_USER_INFO: "ユーザー情報",
		TID_COMMON_CONFIRM: "確認",
		TID_COMMON_CANCEL: "キャンセル",
		TID_COMMON_LAST_PAGE: "前のページ",
		TID_COMMON_NEXT_PAGE: "次のページ",
		TID_COMMON_OPERATION: "操作",
		TID_COMMON_SUCCESS: "成功",
		TID_COMMON_FAILED: "失敗",
		TID_COMMON_UPLOAD: "アップロード",
		TID_COMMON_ID: "ID",
		TID_COMMON_PATH: "パス",
		TID_COMMON_CHOOSE: "選択",
		TID_COMMON_PLZ_CHOOSE: "選択してください",
		TID_COMMON_HAS_CHOOSE: "選択済み",
		TID_COMMON_COMMIT: "コミット",
		TID_COMMON_REMOVE_CONFIRM: "削除しますか？",
		TID_COMMON_PREVIEW: "プレビュー",
		TID_COMMON_ADD: "追加",
		TID_COMMON_EDIT: "編集",
		TID_COMMON_REMOVE: "削除",
		TID_COMMON_TXT: "テキスト",
		TID_COMMON_IMG: "画像",
		TID_COMMON_VIDEO: "ビデオ",
		TID_COMMON_MEMORY: "メモリ",
		TID_COMMON_TOTAL: "合計",
		TID_COMMON_AVAILABLE: "利用可能",
		TID_COMMON_USED: "使用済み",
		TID_COMMON_USE_PERCENT: "使用率",
		TID_COMMON_DISK: "ディスク",
		TID_COMMON_NETWORK: "ネットワーク",
		TID_COMMON_SENT: "送信",
		TID_COMMON_RECEIVED: "已接收",

		TID_HOME: "ホーム",
		TID_ADMIN: "管理者",
		TID_SWITCH_LANGUAGE: "言語",
		TID_SWITCH_LANGUAGE_NOW: "日本語",
		TID_LOGIN_SUCCESS: "ログイン成功",
		TID_LOGIN_FAILED: "ログイン失敗: ",
		TID_LOGIN_EMAIL_TIP: "メールアドレスを入力してください",
		TID_LOGIN_EMAIL_PLZ: "メールアドレスを入力してください",
		TID_LOGIN_EMAIL_FORMAT: "メールアドレスの形式が正しくありません",
		TID_LOGIN_PASSWORD_TIP: "パスワードを入力してください",
		TID_LOGIN_PASSWORD_PLZ: "パスワードを入力してください",
		TID_LOGIN_BTN_NAME_ING: "ログイン中",
		TID_LOGIN_NO_ACCOUNT: "アカウントがありません。 ",
		TID_REGISTER: "登録",
		TID_REGISTER_TRY_SUCCESS: "メールを送信しました",
		TID_REGISTER_TRY_FAILED: "登録失敗: ",
		TID_REGISTER_TITLE: "登録",
		TID_REGISTER_NAME: "ユーザー名",
		TID_REGISTER_NAME_TIP: "ユーザー名を入力してください",
		TID_REGISTER_NAME_PLZ: "ユーザー名を入力してください",
		TID_REGISTER_NAME_OVER: "ユーザー名が長すぎます",
		TID_REGISTER_PASSWORD: "パスワード",
		TID_REGISTER_PASSWORD_TIP: "パスワードを入力してください",
		TID_REGISTER_PASSWORD_PLZ: "パスワードを入力してください",
		TID_REGISTER_PASSWORD_OVER: "パスワードが長すぎます",
		TID_REGISTER_PASSWORD_CONFIRM: "パスワード確認",
		TID_REGISTER_PASSWORD_CONFIRM_TIP: "パスワードを入力してください",
		TID_REGISTER_PASSWORD_CONFIRM_PLZ: "パスワードを入力してください",
		TID_REGISTER_PASSWORD_CONFIRM_ERROR: "パスワードが一致しません",
		TID_REGISTER_EMAIL_TIP: "メールアドレスを入力してください",
		TID_REGISTER_EMAIL_PLZ: "メールアドレスを入力してください",
		TID_REGISTER_EMAIL_FORMAT: "メールアドレスの形式が正しくありません",
		TID_REGISTER_BTN_NAME: "登録",
		TID_REGISTER_BTN_NAME_ING: "登録中",
		TID_REGISTER_HAS_ACCOUNT: "アカウントがありません。 ",
		TID_REGISTER_EMAIL_CONFIRM: "メールアドレスを確認してください",
		TID_MANAGE_USER_ROLE: "ロール",
		TID_MANAGE_USER_ROLE_USER: "ユーザー",
		TID_MANAGE_USER_ROLE_ADMIN: "管理者",
		TID_ADMIN_USER_MANAGEMENT: "ユーザー管理",
		TID_ADMIN_RESOURCE_MANAGEMENT: "リソース管理",
		TID_ADMIN_RECOMMEND_MANAGEMENT: "推薦管理",
		TID_ADMIN_TRIGGER_MANAGEMENT: "トリカゥ管理",
		TID_ADMIN_SERVER_STATUS_MANAGEMENT: "サーバーステータス管理",
		TID_MANAGE_TRIGGER_DOCKER_LOGS: "Docker ログ",
		TID_MAMAGE_TRIGGER_DROP: "DBを削除",
		TID_MAMAGE_RECOMMEND_INFO: "推薦情報",
		TID_MAMAGE_RECOMMEND_TYPE: "推薦タイプ",
		TID_MAMAGE_RECOMMEND_RANDOM: "推薦重み"
	}
}

const language = getLanguage()
const _l = translations[language as "zh" | "en"]
export default _l
