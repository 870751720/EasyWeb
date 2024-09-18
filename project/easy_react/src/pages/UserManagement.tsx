import React, { useState, useEffect } from "react";
import { useRequest } from "ahooks";
import { fetchPost, fetchGet } from "../utils/netUtil";
import {
    Pagination,
    Button,
    Popconfirm,
    message,
    Modal,
    Form,
    Input,
    Select,
    Table,
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
    const [isEditing, setIsEditing] = useState<boolean>(false);
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
            onError: (error) => {
                message.error(error.message);
            },
        }
    );

    const { run: updateUserRequest } = useRequest(
        (userData: User) => fetchPost("/user/update", userData),
        {
            manual: true,
            onSuccess: () => {
                message.success(_l.TID_MANAGE_USER_EDIT_SUCCESS);
                fetchUsersCountRequest();
                fetchUsersRequest(currentPage);
                setIsModalVisible(false);
            },
            onError: (error) => {
                message.error(error.message);
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
        setIsEditing(true);
        form.setFieldsValue(user);
        setIsModalVisible(true);
    };

    const handleDelete = (user: User) => {
        deleteUserRequest(user);
    };

    const handleAdd = () => {
        setIsEditing(false);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleUpdateUser = () => {
        form.validateFields().then((values) => {
            updateUserRequest(values);
        });
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
                onClick={handleAdd}
                style={{ marginBottom: "16px" }}
            >
                {_l.TID_MANAGE_NEW_USER_BTN}
            </Button>
            <Table
                dataSource={users}
                rowKey="user_id"
                pagination={{
                    total: totalUsers,
                    pageSize: PAGE_SIZE,
                    onChange: handlePageChange,
                }}
                columns={[
                    { title: _l.TID_COMMON_USER_ID, dataIndex: "user_id", key: "user_id" },
                    {
                        title: _l.TID_REGISTER_NAME,
                        dataIndex: "username",
                        key: "username",
                    },
                    {
                        title: _l.TID_REGISTER_EMAIL,
                        dataIndex: "email",
                        key: "email",
                    },
                    {
                        title: _l.TID_MANAGE_USER_ROLE,
                        dataIndex: "role",
                        key: "role",
                    },
                    {
                        title: _l.TID_COMMON_OPERATION,
                        render: (user: User) => (
                            <>
                                <Button
                                    onClick={() => handleEdit(user)}
                                    style={{ marginRight: 8 }}
                                >
                                    {_l.TID_MANAGE_USER_INFO_EDIT}
                                </Button>
                                <Popconfirm
                                    title={
                                        _l.TID_COMMON_REMOVE_CONFIRM
                                    }
                                    onConfirm={() => handleDelete(user)}
                                    okText={_l.TID_COMMON_CONFIRM}
                                    cancelText={_l.TID_COMMON_CANCEL}
                                >
                                    <Button type="primary" danger>
                                        {_l.TID_MANAGE_USER_INFO_REMOVE}
                                    </Button>
                                </Popconfirm>
                            </>
                        ),
                    },
                ]}
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
                title={
                    isEditing
                        ? _l.TID_MANAGE_EDIT_USER_BTN
                        : _l.TID_MANAGE_NEW_USER_BTN
                }
                open={isModalVisible}
                onOk={isEditing ? handleUpdateUser : handleAddUser}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    {isEditing && (
                        <Form.Item
                            name="user_id"
                            label="id"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    )}
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
                    {!isEditing && (
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
                            <Input.Password />
                        </Form.Item>
                    )}
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
