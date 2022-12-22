import styled from "styled-components";

export const DivInput = styled.div`
	width: 350px;
	display: flex;
	flex-direction: column;
	gap: 24px;
`;
export const Form = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	flex-direction: column;
	.input-container {
		display: flex;
	}
	.div-button {
		width: 310px;
		display: flex;
		gap: 24px;
		align-self: flex-end;
		margin-top: 32px;
	}
	.input-img {
		margin-right: 48px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		cursor: pointer;
		p {
			color: #ffc501;
			font-size: 20px;
			font-weight: 500;
		}
		input {
			position: absolute;
			color: transparent;
			width: 100%;
			height: 100%;
		}
		input::file-selector-button {
			display: none;
		}
		img {
			position: absolute;
			width: 100%;
			height: 100%;
			pointer-events: none;
		}
	}
	.input-main {
		display: flex;
		gap: 24px;
	}
`;