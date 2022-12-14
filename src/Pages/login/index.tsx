import React from "react";
import LoginForm from "../../components/form/LoginForm.js";
import styled from "styled-components";
import img from "../../assets/backgroundlogin.png";

const LoginContainer = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: url(${img}) no-repeat;
	background-position: 20% 70%;
	background-size: cover;
`;

const Login = () => {
	return (
		<LoginContainer>
			<LoginForm />
		</LoginContainer>
	);
};

export default Login;
