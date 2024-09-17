import React, { useState } from "react";
import { useRequest } from "ahooks";
import { Form, Input, message } from "antd";
import { fetchPost } from "../utils/netUtil";
import "./Register.css";

const Register: React.FC = () => {
    const [responseMessage, setResponseMessage] = useState("");

    const { run: registerUser, loading: registerLoading } = useRequest(
        (values) => fetchPost("/user/register", values),
        {
            manual: true,
            onSuccess: (data) => {
                message.success("注册成功");
                setResponseMessage("注册成功");
            },
            onError: (error) => {
                message.error("注册失败: " + error.message);
                setResponseMessage(error.message || "注册失败");
            },
        }
    );

    const onFinish = (values: { username: string; password: string; email: string }) => {
        registerUser(values);
    };

    return (
        <div className="register-container">
            <h2 className="register-title">注册中心</h2>
            <Form
                name="register"
                layout="vertical"
                onFinish={onFinish}
                style={{
                    maxWidth: "400px",
                    margin: "0 auto",
                    padding: "20px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                }}
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[
                        { required: true, message: "请输入用户名!" },
                        { max: 80, message: "用户名不能超过80个字符!" },
                    ]}
                >
                    <Input placeholder="输入用户名" maxLength={81} />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        { required: true, message: "请输入密码!" },
                        { max: 20, message: "密码不能超过20个字符!" },
                    ]}
                >
                    <Input.Password placeholder="输入密码" maxLength={21} />
                </Form.Item>

                <Form.Item
                    label="确认密码"
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                        { required: true, message: "请确认密码!" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("两次输入的密码不匹配!")
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="确认密码" maxLength={21} />
                </Form.Item>

                <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[
                        { required: true, message: "请输入邮箱!" },
                        { type: "email", message: "请输入有效的邮箱!" },
                    ]}
                >
                    <Input placeholder="输入邮箱" />
                </Form.Item>

                <Form.Item>
                    <button
                        className="custom-register-button"
                        type="submit"
                        disabled={registerLoading}
                    >
                        {registerLoading ? "注册中..." : "注册"}
                    </button>
                </Form.Item>

                {responseMessage && <p>{responseMessage}</p>}
            </Form>
        </div>
    );
};

export default Register;