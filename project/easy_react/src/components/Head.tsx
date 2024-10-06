import { useRequest } from "ahooks"
import { Select, Tooltip } from "antd"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { setUserInfo } from "../store/userSlice"
import _l from "../utils/i18n"
import { fetchGet } from "../utils/netUtil"
import "./Head.css"
import UserInfoCard from "./UserInfoCard"

const { Option } = Select

const Header = () => {
	const [language, setLanguage] = useState("zh")
	const [username, setUsername] = useState<string | null>(null)
	const [role, setRole] = useState<string | null>(null)
	const dispatch = useDispatch()

	const handleLanguageChange = (value: string) => {
		setLanguage(value)
		localStorage.setItem("language", value)
		window.location.reload()
	}

	useEffect(() => {
		const lang = localStorage.getItem("language") || "zh"
		setLanguage(lang)
	}, [])

	const { run: fetchUserInfo } = useRequest(
		() => fetchGet("/user/self_info"),
		{
			manual: true,
			onSuccess: (data) => {
				setUsername(data.self_info.username)
				setRole(data.self_info.role)
				dispatch(
					setUserInfo({
						name: data.self_info.username,
						email: data.self_info.email
					})
				)
			},
			onError: () => {
				setUsername(null)
				setRole(null)
				dispatch(
					setUserInfo({
						name: "",
						email: ""
					})
				)
			}
		}
	)

	useEffect(() => {
		fetchUserInfo()
	}, [fetchUserInfo])

	return (
		<header
			style={{
				padding: "10px",
				backgroundColor: "#f0f0f0",
				marginBottom: "20px"
			}}
		>
			<nav>
				<Select
					value={language}
					onChange={handleLanguageChange}
					style={{
						width: 120,
						marginLeft: "20px",
						marginRight: "20px"
					}}
				>
					<Option value="zh">中文</Option>
					<Option value="en">English</Option>
					<Option value="jp">日本語</Option>
				</Select>
				<Link to="/" style={{ marginRight: "20px" }}>
					{_l.TID_HOME}
				</Link>
				{(role === "superadmin" || role === "admin") && (
					<Link to="/admin" style={{ marginRight: "20px" }}>
						{_l.TID_ADMIN}
					</Link>
				)}
				{username ? (
					<Tooltip
						title={<UserInfoCard />}
						placement="bottom"
						mouseEnterDelay={0.3}
						color="#f9f9f9"
					>
						<span
							style={{
								marginRight: "20px",
								position: "relative",
								cursor: "pointer"
							}}
						>
							{username}
						</span>
					</Tooltip>
				) : (
					<Link to="/login" style={{ marginRight: "20px" }}>
						{_l.TID_COMMON_LOGIN}
					</Link>
				)}
			</nav>
		</header>
	)
}

export default Header
