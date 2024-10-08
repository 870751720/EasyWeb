import { Tabs } from "antd"
import React from "react"
import _l from "../utils/i18n"
import "./Admin.css"
import ManagementRecommend from "./ManagementRecommend"
import ManagementRes from "./ManagementRes"
import ManagementServerStatus from "./ManagementServerStatus"
import ManagementTrigger from "./ManagementTrigger"
import ManagementUser from "./ManagementUser"

const Admin: React.FC = () => {
	const items = [
		{
			key: "1",
			label: _l.TID_ADMIN_USER_MANAGEMENT,
			children: <ManagementUser />
		},
		{
			key: "2",
			label: _l.TID_ADMIN_RESOURCE_MANAGEMENT,
			children: <ManagementRes />
		},
		{
			key: "3",
			label: _l.TID_ADMIN_RECOMMEND_MANAGEMENT,
			children: <ManagementRecommend />
		},
		{
			key: "4",
			label: _l.TID_ADMIN_SERVER_STATUS_MANAGEMENT,
			children: <ManagementServerStatus />
		},
		{
			key: "5",
			label: _l.TID_ADMIN_TRIGGER_MANAGEMENT,
			children: <ManagementTrigger />
		}
	]

	return (
		<div className="admin-container">
			<Tabs defaultActiveKey="1" items={items} />
		</div>
	)
}

export default Admin
