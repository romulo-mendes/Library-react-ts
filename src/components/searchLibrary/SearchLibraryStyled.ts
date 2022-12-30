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
`;