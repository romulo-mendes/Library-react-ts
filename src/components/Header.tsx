import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { useLocation } from "react-router-dom";

const MainContainer = styled.div`
	width: 100vw;
	height: calc(100vh - 105px);
	background-color: #f4f4f4;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 24px;
`;

const HeaderNav = styled.header`
	padding: 24px;
	width: 100vw;
`;

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	if (React.isValidElement(children)) {
		const location = useLocation();
		if (location.pathname === "/") return <>{children}</>;
	}
	return (
		<>
			<HeaderNav>
				<div>
					<Logo className="logo" />
				</div>
				<div></div>
			</HeaderNav>
			<MainContainer>{children}</MainContainer>
		</>
	);
};

export default Header;
