import styled from "styled-components";

export const BackToContainer = styled.div`
background-color: #FFF;
	position: absolute;
	margin: 24px;
	top: 24px;
	left: 24px;
	cursor: pointer;
	display: flex;
	align-items: center;
	font-size: 20px;
	gap: 8px;
	.back {
		opacity: 0.8;
	}
	.current {
		font-weight: 500;
	}
`;