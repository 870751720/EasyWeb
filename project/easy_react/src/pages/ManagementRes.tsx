import { useRequest } from "ahooks";
import { Button, Form, message, Modal, Popconfirm, Table, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { isVideo } from "../utils/commonUtil";
import _l from "../utils/i18n";
import { fetchGet, fetchPost, fetchUpload, resUrl } from "../utils/netUtil";
const PAGE_SIZE = 10;

interface Resource {
    resource_id: number;
    path: string;
}

const ManagementRes: React.FC = () => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [totalResources, setTotalResources] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const { run: fetchResourcesCountRequest } = useRequest(
        () => fetchGet("/upload/count"),
        {
            manual: true,
            onSuccess: (data) => {
                setTotalResources(data.count);
            },
        }
    );

    const { run: fetchResourcesRequest } = useRequest(
        (page: number) =>
            fetchPost("/upload/resources", { page, page_size: PAGE_SIZE }),
        {
            manual: true,
            onSuccess: (data) => {
                setResources(data.resources);
            },
        }
    );

    const { run: uploadResourceRequest } = useRequest(
        (file: File) => fetchUpload("/upload/upload", file),
        {
            manual: true,
            onSuccess: () => {
                message.success(_l.TID_COMMON_SUCCESS);
                fetchResourcesCountRequest();
                fetchResourcesRequest(currentPage);
                setIsModalVisible(false);
            },
            onError: (error) => {
                message.error(error.message);
            },
        }
    );

    const { run: deleteResourceRequest } = useRequest(
        (resourceId: number) => fetchPost("/upload/delete", { id: resourceId }),
        {
            manual: true,
            onSuccess: () => {
                message.success(_l.TID_COMMON_SUCCESS);
                fetchResourcesCountRequest();
                fetchResourcesRequest(currentPage);
            },
            onError: (error) => {
                message.error(error.message);
            },
        }
    );

    useEffect(() => {
        fetchResourcesCountRequest();
        fetchResourcesRequest(1);
    }, [fetchResourcesCountRequest, fetchResourcesRequest]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchResourcesRequest(page);
    };

    const handleDelete = (resourceId: number) => {
        deleteResourceRequest(resourceId);
    };

    const handleUpload = (file: File) => {
        setSelectedFile(file);
        return false;
    };

    const handleSubmit = () => {
        if (selectedFile) {
            uploadResourceRequest(selectedFile);
        } else {
            message.error(_l.TID_COMMON_PLZ_CHOOSE);
        }
    };

    return (
        <>
            <Button
                type="primary"
                onClick={() => {
                    setSelectedFile(null);
                    setIsModalVisible(true);
                }}
            >
                {_l.TID_COMMON_UPLOAD}
            </Button>
            <Table
                dataSource={resources}
                rowKey="resource_id"
                pagination={{
                    total: totalResources,
                    pageSize: PAGE_SIZE,
                    onChange: handlePageChange,
                }}
                columns={[
                    {
                        title: _l.TID_COMMON_ID,
                        dataIndex: "resource_id",
                        key: "resource_id",
                    },
                    {
                        title: _l.TID_COMMON_PATH,
                        dataIndex: "path",
                        key: "path",
                    },
                    {
                        title: _l.TID_COMMON_PREVIEW,
                        key: "preview",
                        render: (_, record) => {
                            const resourceUrl = resUrl(record.path);

                            return isVideo(resourceUrl) ? (
                                <video
                                    src={resourceUrl}
                                    controls
                                    style={{
                                        width: 100,
                                        height: 100,
                                        objectFit: "cover",
                                    }}
                                />
                            ) : (
                                <img
                                    src={resourceUrl}
                                    alt="resource"
                                    style={{
                                        width: 100,
                                        height: 100,
                                        objectFit: "cover",
                                    }}
                                />
                            );
                        },
                    },
                    {
                        title: _l.TID_COMMON_OPERATION,
                        render: (_, record) => (
                            <Popconfirm
                                title={_l.TID_COMMON_REMOVE_CONFIRM}
                                onConfirm={() =>
                                    handleDelete(record.resource_id)
                                }
                                okText={_l.TID_COMMON_CONFIRM}
                                cancelText={_l.TID_COMMON_CANCEL}
                            >
                                <Button type="primary" danger>
                                    {_l.TID_MANAGE_USER_INFO_REMOVE}
                                </Button>
                            </Popconfirm>
                        ),
                    },
                ]}
            />
            <Modal
                title={_l.TID_COMMON_UPLOAD}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form>
                    <Form.Item>
                        <Upload
                            beforeUpload={handleUpload}
                            showUploadList={false}
                        >
                            <Button>{_l.TID_COMMON_CHOOSE}</Button>
                        </Upload>
                        {selectedFile && (
                            <div>
                                {_l.TID_COMMON_HAS_CHOOSE}: {selectedFile.name}
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={handleSubmit}>
                            {_l.TID_COMMON_COMMIT}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ManagementRes;
