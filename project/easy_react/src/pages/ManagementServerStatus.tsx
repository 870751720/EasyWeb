import { useRequest } from "ahooks"
import { Button, Card, Col, Row, Statistic } from "antd"
import React, { useEffect, useState } from "react"
import { fetchGet } from "../utils/netUtil"

const ManagementServerStatus: React.FC = () => {
	const [serverStatus, setServerStatus] = useState<any>(null)
	const { run: fetchServerStatusRequest } = useRequest(
		() => fetchGet("/server_status/get"),
		{
			manual: true,
			onSuccess: (data) => {
				setServerStatus(data)
			}
		}
	)

	useEffect(() => {
		fetchServerStatusRequest()
	}, [fetchServerStatusRequest])

	return (
		<div>
			<Button
				onClick={fetchServerStatusRequest}
				type="primary"
				style={{ marginBottom: 16 }}
			>
				刷新状态
			</Button>
			{serverStatus && (
				<Row gutter={16}>
					<Col span={8}>
						<Card title="内存" bordered={false}>
							<Statistic
								title="总内存"
								value={serverStatus.memory.total}
								suffix="字节"
							/>
							<Statistic
								title="可用内存"
								value={serverStatus.memory.available}
								suffix="字节"
							/>
						</Card>
					</Col>
					<Col span={8}>
						<Card title="CPU" bordered={false}>
							<Statistic
								title="使用率"
								value={serverStatus.cpu.percent}
								suffix="%"
							/>
						</Card>
					</Col>
					<Col span={8}>
						<Card title="磁盘" bordered={false}>
							<Statistic
								title="总磁盘"
								value={serverStatus.disk.total}
								suffix="字节"
							/>
							<Statistic
								title="已用磁盘"
								value={serverStatus.disk.used}
								suffix="字节"
							/>
						</Card>
					</Col>
				</Row>
			)}
		</div>
	)
}

export default ManagementServerStatus
