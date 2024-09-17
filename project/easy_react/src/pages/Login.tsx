import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { useRequest } from "ahooks";
import { fetchPost, setAccessToken } from "../utils/netUtil";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import _l from "../utils/i18n";

const Login: React.FC = () => {
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();

    const { run: loginUser, loading: loginLoading } = useRequest(
        (values) => fetchPost("/user/login", values),
        {
            manual: true,
            onSuccess: (data) => {
                setAccessToken(data.token);
                message.success(_l.TID_LOGIN_SUCCESS);
                navigate("/home");
                window.location.reload();
            },
            onError: (error) => {
                message.error(_l.TID_LOGIN_FAILED + error.message);
            },
        }
    );

    const onFinish = (values: { email: string; password: string }) => {
        loginUser(values);
    };

    const onFieldsChange = (_: any, allFields: any) => {
        const isValid = allFields.every(
            (field: { errors: any[]; value: any }) =>
                field.errors.length === 0 && field.value
        );
        setIsFormValid(isValid);
    };

    return (
        <div>
            <Form
                name="login"
                layout="vertical"
                onFinish={onFinish}
                onFieldsChange={onFieldsChange}
                style={{
                    maxWidth: "400px",
                    margin: "0 auto",
                    padding: "20px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                }}
            >
                <h2 className="login-title">{_l.TID_LOGIN_TITLE}</h2>
                <Form.Item
                    label={_l.TID_LOGIN_EMAIL}
                    name="email"
                    rules={[
                        { required: true, message: _l.TID_LOGIN_EMAIL_PLZ },
                        { type: "email", message: _l.TID_LOGIN_EMAIL_FORMAT },
                    ]}
                >
                    <Input placeholder={_l.TID_LOGIN_EMAIL_TIP} />
                </Form.Item>

                <Form.Item
                    label={_l.TID_LOGIN_PASSWORD}
                    name="password"
                    rules={[
                        { required: true, message: _l.TID_LOGIN_PASSWORD_PLZ },
                    ]}
                >
                    <Input.Password
                        placeholder={_l.TID_LOGIN_PASSWORD_TIP}
                        maxLength={21}
                    />
                </Form.Item>

                <Form.Item>
                    <button
                        type="submit"
                        disabled={loginLoading}
                        className={`custom-login-button ${
                            isFormValid ? "charging" : ""
                        }`}
                    >
                        {loginLoading
                            ? _l.TID_LOGIN_BTN_NAME_ING
                            : _l.TID_LOGIN_BTN_NAME}
                    </button>
                </Form.Item>
                <div className="register-link-container">
                    <span>{_l.TID_LOGIN_NO_ACCOUNT}</span>
                    <button
                        className="register-link"
                        onClick={() => navigate("/register")}
                    >
                        {_l.TID_REGISTER}
                    </button>
                </div>
            </Form>
        </div>
    );
};

export default Login;
