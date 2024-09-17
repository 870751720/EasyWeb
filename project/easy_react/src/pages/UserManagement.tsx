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
import _l from "../utils/i18n";

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
                message.success(_l.TID_MANAGE_USER_ADD_SUCCESS);
                fetchUsersCountRequest();
                fetchUsersRequest(currentPage);
                setIsModalVisible(false);
            },
            onError: () => {
                message.error(_l.TID_MANAGE_USER_ADD_FAILED);
            },
        }
    );

    const { run: deleteUserRequest } = useRequest(
        (userData: User) =>
            fetchPost("/user/delete", { user_id: userData.user_id }),
        {
            manual: true,
            onSuccess: () => {
                message.success(_l.TID_MANAGE_USER_REMOVE_SUCCESS);
                fetchUsersCountRequest();
                fetchUsersRequest(currentPage);
            },
            onError: () => {
                message.error(_l.TID_MANAGE_USER_REMOVE_FAILED);
            },
        }
    );

    useEffect(() => {
        fetchUsersCountRequest();
        fetchUsersRequest(1);
    }, [fetchUsersCountRequest, fetchUsersRequest]);

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
                {_l.TID_MANAGE_NEW_USER_BTN}
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
                                        {_l.TID_MANAGE_USER_INFO_EDIT}
                                    </Button>
                                    <Popconfirm
                                        title={
                                            _l.TID_MANAGE_USER_INFO_REMOVE_CONFIRM
                                        }
                                        onConfirm={() => handleDelete(user)}
                                        okText={_l.TID_COMMON_CONFIRM}
                                        cancelText={_l.TID_COMMON_CANCEL}
                                    >
                                        <Button type="primary" danger>
                                            {_l.TID_MANAGE_USER_INFO_REMOVE}
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
                                    {_l.TID_MANAGE_USER_ROLE}: {user.role}
                                </Typography.Text>
                            </div>
                            <Typography.Text type="secondary">
                                {_l.TID_REGISTER_EMAIL}: {user.email}
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
                                {_l.TID_COMMON_LAST_PAGE}
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
                                {_l.TID_COMMON_NEXT_PAGE}
                            </button>
                        );
                    }
                    return originalElement;
                }}
                style={{ marginTop: "16px", textAlign: "center" }}
            />

            <Modal
                title={_l.TID_MANAGE_NEW_USER_BTN}
                open={isModalVisible}
                onOk={handleAddUser}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="username"
                        label={_l.TID_REGISTER_NAME}
                        rules={[
                            {
                                required: true,
                                message: _l.TID_REGISTER_NAME_TIP,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label={_l.TID_REGISTER_EMAIL}
                        rules={[
                            {
                                required: true,
                                message: _l.TID_REGISTER_EMAIL_TIP,
                            },
                            {
                                type: "email",
                                message: _l.TID_REGISTER_EMAIL_FORMAT,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={_l.TID_REGISTER_PASSWORD}
                        rules={[
                            {
                                required: true,
                                message: _l.TID_REGISTER_PASSWORD_TIP,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label={_l.TID_MANAGE_USER_ROLE}
                        rules={[
                            {
                                required: true,
                                message: _l.TID_MANAGE_USER_ROLE_TIP,
                            },
                        ]}
                    >
                        <Select>
                            <Select.Option value="guest">
                                {_l.TID_MANAGE_USER_ROLE_GUEST}
                            </Select.Option>
                            <Select.Option value="user">
                                {_l.TID_MANAGE_USER_ROLE_USER}
                            </Select.Option>
                            <Select.Option value="admin">
                                {_l.TID_MANAGE_USER_ROLE_ADMIN}
                            </Select.Option>
                            <Select.Option value="superadmin">
                                {_l.TID_MANAGE_USER_ROLE_SUPER}
                            </Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserManagement;
