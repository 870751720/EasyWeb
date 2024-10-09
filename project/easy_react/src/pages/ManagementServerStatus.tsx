import { useRequest } from "ahooks"
import { Card, Col, Row, Statistic } from "antd"
import React, { useEffect, useRef, useState } from "react"
import _l from "../utils/i18n"
import { fetchGet } from "../utils/netUtil"

const ManagementServerStatus: React.FC = () => {
	const [serverStatus, setServerStatus] = useState<any>(null)
	const ref = useRef<HTMLDivElement>(null)
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
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				fetchServerStatusRequest()
				const interval = setInterval(fetchServerStatusRequest, 1000)

				return () => clearInterval(interval)
			}
		})

		if (ref.current) {
			observer.observe(ref.current)
		}

		return () => {
			if (ref.current) {
				observer.unobserve(ref.current)
			}
		}
	}, [fetchServerStatusRequest])

	return (
		<div>
			{serverStatus && (
				<Row gutter={16}>
					<Col span={6}>
						<Card title={_l.TID_COMMON_MEMORY} bordered={false}>
							<Statistic
								title={_l.TID_COMMON_TOTAL}
								value={
									serverStatus.memory.total / (1024 * 1024)
								}
								suffix="MB"
							/>
							<Statistic
								title={_l.TID_COMMON_AVAILABLE}
								value={
									serverStatus.memory.available /
									(1024 * 1024)
								}
								suffix="MB"
							/>
							<Statistic
								title={_l.TID_COMMON_USED}
								value={serverStatus.memory.used / (1024 * 1024)}
								suffix="MB"
							/>
							<Statistic
								title={_l.TID_COMMON_USE_PERCENT}
								value={serverStatus.memory.percent}
								suffix="%"
							/>
						</Card>
					</Col>
					<Col span={6}>
						<Card title="CPU" bordered={false}>
							<Statistic
								title={_l.TID_COMMON_USE_PERCENT}
								value={serverStatus.cpu.percent}
								suffix="%"
							/>
						</Card>
					</Col>
					<Col span={6}>
						<Card title={_l.TID_COMMON_DISK} bordered={false}>
							<Statistic
								title={_l.TID_COMMON_TOTAL}
								value={serverStatus.disk.total / (1024 * 1024)}
								suffix="MB"
							/>
							<Statistic
								title={_l.TID_COMMON_AVAILABLE}
								value={serverStatus.disk.used / (1024 * 1024)}
								suffix="MB"
							/>
						</Card>
					</Col>
					<Col span={6}>
						<Card title={_l.TID_COMMON_NETWORK} bordered={false}>
							<Statistic
								title={_l.TID_COMMON_SENT}
								value={
									serverStatus.network.bytes_sent /
									(1024 * 1024)
								}
								suffix="MB"
							/>
							<Statistic
								title={_l.TID_COMMON_RECEIVED}
								value={
									serverStatus.network.bytes_recv /
									(1024 * 1024)
								}
								suffix="MB"
							/>
						</Card>
					</Col>
				</Row>
			)}
		</div>
	)
}

export default ManagementServerStatus
