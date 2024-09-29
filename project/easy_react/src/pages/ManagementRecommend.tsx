import { useRequest } from "ahooks";
import {
    Button,
    Form,
    Input,
    message,
    Modal,
    Pagination,
    Popconfirm,
    Select,
    Table,
    InputNumber,
} from "antd";
import React, { useEffect, useState } from "react";
import _l from "../utils/i18n";
import { fetchGet, fetchPost } from "../utils/netUtil";

const PAGE_SIZE = 10;

const ManagementRecommend: React.FC = () => {
    interface Recommend {
        recommend_id: number;
        res_info: string;
        res_type: string;
        random_num: number;
    }

    const [recommends, setRecommends] = useState<Recommend[]>([]);
    const [totalRecommends, setTotalRecommends] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [form] = Form.useForm();

    const { run: fetchRecommendsCountRequest } = useRequest(
        () => fetchGet("/recommend/count"),
        {
            manual: true,
            onSuccess: (data) => {
                setTotalRecommends(data.count);
            },
        }
    );
    const { run: fetchRecommendsRequest } = useRequest(
        (page: number) =>
            fetchPost("/recommend/recommends", {
                page,
                page_size: PAGE_SIZE,
            }),
        {
            manual: true,
            onSuccess: (data) => {
                setRecommends(data.recommends);
            },
        }
    );

    const { run: addRecommendRequest } = useRequest(
        (recommendData: Recommend) => fetchPost("/recommend/add", recommendData),
        {
            manual: true,
            onSuccess: () => {
                message.success(_l.TID_COMMON_SUCCESS);
                fetchRecommendsCountRequest();
                fetchRecommendsRequest(currentPage);
                setIsModalVisible(false);
            },
            onError: (error) => {
                message.error(error.message);
            },
        }
    );

    const { run: updateRecommendRequest } = useRequest(
        (recommendData: Recommend) => fetchPost("/recommend/update", recommendData),
        {
            manual: true,
            onSuccess: () => {
                message.success(_l.TID_COMMON_SUCCESS);
                fetchRecommendsCountRequest();
                fetchRecommendsRequest(currentPage);
                setIsModalVisible(false);
            },
            onError: (error) => {
                message.error(error.message);
            },
        }
    );

    const { run: deleteRecommendRequest } = useRequest(
        (recommendData: Recommend) =>
            fetchPost("/recommend/delete", { recommend_id: recommendData.recommend_id }),
        {
            manual: true,
            onSuccess: () => {
                message.success(_l.TID_COMMON_SUCCESS);
                fetchRecommendsCountRequest();
                fetchRecommendsRequest(currentPage);
            },
            onError: () => {
                message.error(_l.TID_COMMON_FAILED);
            },
        }
    );

    useEffect(() => {
        fetchRecommendsCountRequest();
        fetchRecommendsRequest(1);
    }, [fetchRecommendsCountRequest, fetchRecommendsRequest]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchRecommendsRequest(page);
    };

    const handleEdit = (recommend: Recommend) => {
        setIsEditing(true);
        form.setFieldsValue(recommend);
        setIsModalVisible(true);
    };

    const handleDelete = (recommend: Recommend) => {
        deleteRecommendRequest(recommend);
    };

    const handleAdd = () => {
        setIsEditing(false);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleUpdateRecommend = () => {
        form.validateFields().then((values) => {
            updateRecommendRequest(values);
        });
    };

    const handleAddRecommend = () => {
        form.validateFields().then((values) => {
            addRecommendRequest(values);
        });
    };

    return (
        <div style={{ padding: "16px" }}>
            <Button
                type="primary"
                onClick={handleAdd}
                style={{ marginBottom: "16px" }}
            >
                {_l.TID_COMMON_ADD}
            </Button>
            <Table
                dataSource={recommends}
                rowKey="recommend_id"
                pagination={{
                    total: totalRecommends,
                    pageSize: PAGE_SIZE,
                    onChange: handlePageChange,
                }}
                columns={[
                    { title: _l.TID_COMMON_ID, dataIndex: "recommend_id", key: "recommend_id" },
                    {
                        title: _l.TID_MAMAGE_RECOMMEND_INFO,
                        dataIndex: "res_info",
                        key: "res_info",
                    },
                    {
                        title: _l.TID_MAMAGE_RECOMMEND_TYPE,
                        dataIndex: "res_type",
                        key: "res_type",
                        render: (res_type: string) => {
                            switch (res_type) {
                                case "txt":
                                    return _l.TID_COMMON_TXT;
                                case "img":
                                    return _l.TID_COMMON_IMG;
                                case "video":
                                    return _l.TID_COMMON_VIDEO;
                                default:
                                    return res_type;
                            }
                        },
                    },
                    {
                        title: _l.TID_MAMAGE_RECOMMEND_RANDOM,
                        dataIndex: "random_num",
                        key: "random_num",
                    },
                    {
                        title: _l.TID_COMMON_OPERATION,
                        render: (recommend: Recommend) => (
                            <>
                                <Button
                                    onClick={() => handleEdit(recommend)}
                                    style={{ marginRight: 8 }}
                                >
                                    {_l.TID_COMMON_EDIT}
                                </Button>
                                <Popconfirm
                                    title={
                                        _l.TID_COMMON_REMOVE_CONFIRM
                                    }
                                    onConfirm={() => handleDelete(recommend)}
                                    okText={_l.TID_COMMON_CONFIRM}
                                    cancelText={_l.TID_COMMON_CANCEL}
                                >
                                    <Button type="primary" danger>
                                        {_l.TID_COMMON_REMOVE}
                                    </Button>
                                </Popconfirm>
                            </>
                        ),
                    },
                ]}
            />

            <Pagination
                current={currentPage}
                total={totalRecommends}
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
                        ? _l.TID_COMMON_EDIT
                        : _l.TID_COMMON_ADD
                }
                open={isModalVisible}
                onOk={isEditing ? handleUpdateRecommend : handleAddRecommend}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    {isEditing && (
                        <Form.Item
                            name="recommend_id"
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
                        name="res_info"
                        label={_l.TID_MAMAGE_RECOMMEND_INFO}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="res_type"
                        label={_l.TID_MAMAGE_RECOMMEND_TYPE}
                        rules={[
                            {
                                required: true,
                                message: _l.TID_COMMON_CHOOSE,
                            },
                        ]}
                    >
                        <Select>
                            <Select.Option value="txt">
                                {_l.TID_COMMON_TXT}
                            </Select.Option>
                            <Select.Option value="img">
                                {_l.TID_COMMON_IMG}
                            </Select.Option>
                            <Select.Option value="video">
                                {_l.TID_COMMON_VIDEO}
                            </Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="random_num"
                        label={_l.TID_MAMAGE_RECOMMEND_RANDOM}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
};

export default ManagementRecommend;
