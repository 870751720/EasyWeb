import React, { useState, useEffect } from "react";
import { useRequest } from "ahooks";
import { fetchPost, fetchGet } from "../utils/netUtil";
import {
    List,
    Pagination,
    Card,
    Button,
    Popconfirm,
    message,
    Typography,
    Space,
    Modal,
    Form,
    Input,
    Select,
} from "antd";

const PAGE_SIZE = 10;

const UserManagement: React.FC = () => {
    interface User {
        user_id: number;
        username: string;
        email: string;
        password: string;
        role: string;
    }

    const [users, setUsers] = useState<User[]>([]);
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [form] = Form.useForm();

    const { run: fetchUsersCountRequest } = useRequest(
        () => fetchGet("/user/users_count"),
        {
            manual: true,
            onSuccess: (data) => {
                setTotalUsers(data.users_count);
            },
        }
    );
    const { run: fetchUsersRequest } = useRequest(
        (page: number) =>
            fetchPost("/user/users", {
                page,
                page_size: PAGE_SIZE,
            }),
        {
            manual: true,
            onSuccess: (data) => {
                setUsers(data.users);
            },
        }
    );

    const { run: addUserRequest } = useRequest(
        (userData: User) => fetchPost("/user/add", userData),
        {
            manual: true,
            onSuccess: () => {
                message.success("用户新增成功");
                fetchUsersCountRequest();
                fetchUsersRequest(currentPage);
                setIsModalVisible(false);
            },
            onError: () => {
                message.error("新增用户失败");
            },
        }
    );

    const { run: deleteUserRequest } = useRequest(
        (userData: User) => fetchPost("/user/delete", {"user_id": userData.user_id}),
        {
            manual: true,
            onSuccess: () => {
                message.success("用户删除成功");
                fetchUsersCountRequest();
                fetchUsersRequest(currentPage);
            },
            onError: () => {
                message.error("删除用户失败");
            },
        }
    );

    useEffect(() => {
        fetchUsersCountRequest();
        fetchUsersRequest(1);
    }, []);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchUsersRequest(page);
    };

    const handleEdit = (user: User) => {
        message.info(`编辑用户：${user.username}`);
        // 在这里实现编辑功能
    };

    const handleDelete = (user: User) => {
        deleteUserRequest(user);
    };

    const showAddUserModal = () => {
        setIsModalVisible(true);
    };

    const handleAddUser = () => {
        form.validateFields().then((values) => {
            addUserRequest(values);
        });
    };

    return (
        <div style={{ padding: "16px" }}>
            <Button
                type="primary"
                onClick={showAddUserModal}
                style={{ marginBottom: "16px" }}
            >
                新增用户
            </Button>

            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={users}
                renderItem={(user: User) => (
                    <List.Item>
                        <Card
                            style={{
                                borderRadius: "8px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            }}
                            extra={
                                <Space>
                                    <Button
                                        type="primary"
                                        onClick={() => handleEdit(user)}
                                    >
                                        编辑
                                    </Button>
                                    <Popconfirm
                                        title="确定删除这个用户吗？"
                                        onConfirm={() => handleDelete(user)}
                                        okText="是"
                                        cancelText="否"
                                    >
                                        <Button type="primary" danger>
                                            删除
                                        </Button>
                                    </Popconfirm>
                                </Space>
                            }
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "8px",
                                }}
                            >
                                <Typography.Text strong>
                                    {user.username}
                                </Typography.Text>
                                <Typography.Text type="secondary">
                                    角色: {user.role}
                                </Typography.Text>
                            </div>
                            <Typography.Text type="secondary">
                                邮箱: {user.email}
                            </Typography.Text>
                        </Card>
                    </List.Item>
                )}
            />

            <Pagination
                current={currentPage}
                total={totalUsers}
                pageSize={PAGE_SIZE}
                onChange={handlePageChange}
                showQuickJumper
                itemRender={(page, type, originalElement) => {
                    if (type === "prev") {
                        return (
                            <button
                                style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                }}
                            >
                                上一页
                            </button>
                        );
                    }
                    if (type === "next") {
                        return (
                            <button
                                style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                }}
                            >
                                下一页
                            </button>
                        );
                    }
                    return originalElement;
                }}
                style={{ marginTop: "16px", textAlign: "center" }}
            />

            <Modal
                title="新增用户"
                open={isModalVisible}
                onOk={handleAddUser}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="username"
                        label="用户名"
                        rules={[{ required: true, message: "请输入用户名" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="邮箱"
                        rules={[
                            { required: true, message: "请输入邮箱" },
                            { type: "email", message: "请输入有效的邮箱地址" },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[{ required: true, message: "请输入密码" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label="角色"
                        rules={[{ required: true, message: "请选择角色" }]}
                    >
                        <Select>
                            <Select.Option value="user">用户</Select.Option>
                            <Select.Option value="admin">管理员</Select.Option>
                            <Select.Option value="superadmin">
                                超级管理员
                            </Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserManagement;
