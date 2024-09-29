import React, { useState, useEffect } from "react";
import { message } from "antd";
import { useRequest } from "ahooks";
import { fetchGet, fetchPost } from "../utils/netUtil";

const PAGE_SIZE = 10;

interface Recommend {
    id: number;
    res_info: string;
    res_type: string;
    random_num: number;
}

const RecommendManagement: React.FC = () => {
    const [recommends, setRecommends] = useState<Recommend[]>([]);
    const [totalRecommends, setTotalRecommends] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    // 获取推荐数量
    const { run: fetchRecommendCountRequest } = useRequest(
        () => fetchGet("/recommend/count"),
        {
            manual: true,
            onSuccess: (data) => {
                setTotalRecommends(data.count);
            },
        }
    );

    // 获取推荐列表
    const { run: fetchRecommendsRequest } = useRequest(
        (page: number) =>
            fetchPost("/recommend/recommends", { page, page_size: PAGE_SIZE }),
        {
            manual: true,
            onSuccess: (data) => {
                setRecommends(data.recommends);
            },
        }
    );

    // 删除推荐
    const { run: deleteRecommendRequest } = useRequest(
        (recommendId: number) => fetchPost("/recommend/delete", { id: recommendId }),
        {
            manual: true,
            onSuccess: () => {
                message.success("删除成功");
                fetchRecommendCountRequest();
                fetchRecommendsRequest(currentPage);
            },
            onError: (error) => {
                message.error(error.message);
            },
        }
    );

    // 初始化加载数据
    useEffect(() => {
        fetchRecommendCountRequest();
        fetchRecommendsRequest(1);
    }, [fetchRecommendCountRequest, fetchRecommendsRequest]);

    // 分页处理
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchRecommendsRequest(page);
    };

    // 删除推荐
    const handleDelete = (recommendId: number) => {
        deleteRecommendRequest(recommendId);
    };

    return (
        <div>
            <h1>推荐管理</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Res Info</th>
                        <th>Res Type</th>
                        <th>Random Num</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {recommends.map((recommend) => (
                        <tr key={recommend.id}>
                            <td>{recommend.id}</td>
                            <td>{recommend.res_info}</td>
                            <td>{recommend.res_type}</td>
                            <td>{recommend.random_num}</td>
                            <td>
                                <button onClick={() => handleDelete(recommend.id)}>
                                    删除
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {/* 分页组件可以根据需要替换 */}
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>上一页</button>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage * PAGE_SIZE >= totalRecommends}>下一页</button>
            </div>
        </div>
    );
};

export default RecommendManagement;