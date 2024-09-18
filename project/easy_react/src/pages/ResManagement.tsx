import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Upload, message } from 'antd';
import { useRequest } from 'ahooks';
import { fetchGet, fetchPost, fetchUpload } from "../utils/netUtil";

const PAGE_SIZE = 10;

interface Resource {
    resource_id: number;
    path: string;
    res_type: string;
}

const ResManagement: React.FC = () => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [totalResources, setTotalResources] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [form] = Form.useForm();

    const { run: fetchResourcesCountRequest } = useRequest(
        () => fetchGet("/upload/resources_count"),
        {
            manual: true,
            onSuccess: (data) => {
                setTotalResources(data.resources_count);
            },
        }
    );

    const { run: fetchResourcesRequest } = useRequest(
        (page: number) => fetchPost("/upload/resources", { page, page_size: PAGE_SIZE }),
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
                message.success("上传成功");
                fetchResourcesCountRequest();
                fetchResourcesRequest(currentPage);
                setIsModalVisible(false);
            },
            onError: () => {
                message.error("上传失败");
            },
        }
    );

    const { run: deleteResourceRequest } = useRequest(
        (resourceId: number) => fetchPost("/upload/delete", { id: resourceId }),
        {
            manual: true,
            onSuccess: () => {
                message.success("删除成功");
                fetchResourcesCountRequest();
                fetchResourcesRequest(currentPage);
            },
            onError: () => {
                message.error("删除失败");
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
        uploadResourceRequest(file);
        return false; // 阻止 Upload 组件自动上传
    };

    return (
        <>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>上传资源</Button>
            <Table
                dataSource={resources}
                pagination={{
                    total: totalResources,
                    pageSize: PAGE_SIZE,
                    onChange: handlePageChange,
                }}
                columns={[
                    { title: '资源 ID', dataIndex: 'resource_id', key: 'resource_id' },
                    { title: '路径', dataIndex: 'path', key: 'path' },
                    { title: '类型', dataIndex: 'res_type', key: 'res_type' },
                    {
                        title: '操作',
                        render: (_, record) => (
                            <Button onClick={() => handleDelete(record.resource_id)}>删除</Button>
                        ),
                    },
                ]}
            />
            <Modal
                title="上传资源"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form>
                    <Form.Item>
                        <Upload beforeUpload={handleUpload} showUploadList={false}>
                            <Button>选择文件</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={form.submit}>提交</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ResManagement;