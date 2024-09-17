import React, { useState, useRef } from "react";
import { useRequest } from "ahooks";
import { Form, Input, message } from "antd";
import { fetchPost } from "../utils/netUtil";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import _l from "../utils/i18n";

const Register: React.FC = () => {
    const [isFormValid, setIsFormValid] = useState(false);
    const [buttonText, setButtonText] = useState(_l.TID_REGISTER_BTN_NAME);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const { run: registerUser, loading: registerLoading } = useRequest(
        (values) => fetchPost("/user/register", values),
        {
            manual: true,
            onSuccess: (data) => {
                message.success(_l.TID_REGISTER_TRY_SUCCESS);
                setButtonText(_l.TID_REGISTER_EMAIL_CONFIRM);
                intervalRef.current = setInterval(() => {
                    onLogin();
                }, 3000);
            },
            onError: (error) => {
                message.error(_l.TID_REGISTER_TRY_FAILED + error.message);
            },
        }
    );

    const { run: loginUser } = useRequest(
        (values) => fetchPost("/user/login", values),
        {
            manual: true,
            onSuccess: (data) => {
                message.success(_l.TID_LOGIN_SUCCESS);
                navigate("/home");
                if (intervalRef.current !== null) {
                    clearInterval(intervalRef.current);
                }
                window.location.reload();
            },
        }
    );

    const onLogin = () => {
        const values = form.getFieldsValue(["email", "password"]);
        loginUser(values);
    };

    const onFinish = (values: { username: string; password: string; email: string }) => {
        registerUser(values);
    };

    const onFieldsChange = (_: any, allFields: any) => {
        const isValid = allFields.every(
            (field: { errors: any[]; value: any }) =>
                field.errors.length === 0 && field.value
        );
        setIsFormValid(isValid);
        setButtonText(_l.TID_REGISTER_BTN_NAME);

        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = null;
    };

    return (
        <div>
            <Form
                name="register"
                form={form}
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
                <h2 className="register-title">{_l.TID_REGISTER_TITLE}</h2>
                <Form.Item
                    label={_l.TID_REGISTER_NAME}
                    name="username"
                    rules={[
                        { required: true, message: _l.TID_REGISTER_NAME_PLZ },
                        { max: 80, message: _l.TID_REGISTER_NAME_OVER },
                    ]}
                >
                    <Input placeholder={_l.TID_REGISTER_NAME_TIP} maxLength={81} />
                </Form.Item>

                <Form.Item
                    label={_l.TID_REGISTER_PASSWORD}
                    name="password"
                    rules={[
                        { required: true, message: _l.TID_REGISTER_PASSWORD_PLZ },
                        { max: 20, message: _l.TID_REGISTER_PASSWORD_OVER },
                    ]}
                >
                    <Input.Password placeholder={_l.TID_REGISTER_PASSWORD_TIP} maxLength={21} />
                </Form.Item>

                <Form.Item
                    label={_l.TID_REGISTER_PASSWORD_CONFIRM}
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                        { required: true, message: _l.TID_REGISTER_PASSWORD_CONFIRM_PLZ },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(_l.TID_REGISTER_PASSWORD_CONFIRM_ERROR)
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder={_l.TID_REGISTER_PASSWORD_CONFIRM_TIP} maxLength={21} />
                </Form.Item>

                <Form.Item
                    label={_l.TID_REGISTER_EMAIL}
                    name="email"
                    rules={[
                        { required: true, message: _l.TID_REGISTER_EMAIL_PLZ },
                        { type: "email", message: _l.TID_REGISTER_EMAIL_FORMAT },
                    ]}
                >
                    <Input placeholder={_l.TID_REGISTER_EMAIL_TIP} />
                </Form.Item>

                <Form.Item>
                    <button
                        className={`custom-register-button ${
                            isFormValid ? "charging" : ""
                        }`}
                        type="submit"
                        disabled={registerLoading}
                    >
                        {registerLoading ? _l.TID_REGISTER_BTN_NAME_ING : buttonText}
                    </button>
                </Form.Item>
                <div className="login-link-container">
                    <span>{_l.TID_REGISTER_HAS_ACCOUNT}</span>
                    <button
                        className="login-link"
                        onClick={() => navigate("/login")}
                    >
                        {_l.TID_LOGIN}
                    </button>
                </div>
            </Form>
        </div>
    );
};

export default Register;