import { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Outlet, useNavigate } from "react-router-dom";

const MainContainer = styled.div`
	width: 100vw;
	height: calc(100vh - 105px);
	background-color: #f4f4f4;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 24px;
	position: relative;
`;

const HeaderNav = styled.header`
	padding: 24px;
	width: 100vw;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const UserContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	cursor: pointer;
	position: relative;
	p {
		color: #495057 !important;
		font-weight: 500;
		font-size: 18px;
	}
	.logout {
		color: #2a2a2a;
		background-color: #f4f4f4;
		border-radius: 5px;
		position: absolute;
		width: 148px;
		height: 57px;
		right: 0;
		top: 0;
		padding: 16px;
		margin-top: 46px;
		z-index: 2;
	}
`;

const Header = () => {
	const [logout, setLogout] = useState(false);
	const navigate = useNavigate();
	const email = localStorage.getItem("email");

	useEffect(() => {
		if (!email) navigate("/login");
	}, []);

	function userLogout(): void {
		localStorage.removeItem("email");
		navigate("/login");
	}
	return (
		<>
			<HeaderNav>
				<div>
					<Logo className="logo" />
				</div>
				<UserContainer
					onClick={() => {
						setLogout(!logout);
					}}
				>
					<PersonIcon sx={{ color: "#ffc501" }} />
					<p>{email}</p>
					<KeyboardArrowDownIcon />
					{logout && (
						<div onClick={(): void => userLogout()} className="logout">
							<p>Sair</p>
						</div>
					)}
				</UserContainer>
			</HeaderNav>
			<MainContainer>
				<Outlet />
			</MainContainer>
		</>
	);
};

export default Header;
