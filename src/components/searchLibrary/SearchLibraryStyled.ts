import styled from "styled-components";

export const FormContainer = styled.form`
	display: flex;
	gap: 32px;
	.input-container {
		display: flex;
		.div-input {
			width: 666px;
		}
		.MuiInputBase-root {
			padding-right: 8px;
		}
	}
	.div-select {
		width: 260px;
	}

	@media (max-width: 1025px) {
		width: 100%;
		.input-container {
			width: 60%;
			margin-left: 20px;
		}
		.div-input {
			width: auto;
		}
		.div-select {
			width: 100%;
			margin-right: 20px;
		}
	}
	@media (max-width: 550px) {
		flex-direction: column;
		align-items: center;
		.input-container {
			width: 90%;
			margin: 0 auto;
		}
		.div-select {
			width: 90%;
			margin: 0 auto;
		}
	}
`;
