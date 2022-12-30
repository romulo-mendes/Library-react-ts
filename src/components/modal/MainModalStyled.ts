import styled from "styled-components";

export const RentHistoryContainer = styled.div`
	.MuiTableCell-root {
		color: #3e4756;
		border: none;
		padding: 0 0 8px 16px;
	}
	.MuiTableCell-head {
		font-weight: 600;
		padding-top: 16px;
	}
	.MuiTableCell-body {
		font-weight: 300;
		padding-bottom: 16px;
	}
`;
export const IsActiveContainer = styled.div`
	div {
		background-color: #f4f4f4;
		border-radius: 5px;
		padding: 16px;
	}
`;

export const MainModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 60px;
	.main-content {
		display: flex;
		gap: 40px;
	}
	.img-side {
		max-width: 272px;
		min-height: 390px;
		img {
			max-width: 272px;
		}
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 32px;
		.Mui-disabled {
			background-color: #ffc50155;
		}
	}
	.text-side {
		min-width: 424px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.text {
			min-height: 390px;
		}
		.buttons {
			display: flex;
			gap: 24px;
			justify-content: center;
			.MuiButton-root {
				padding: 16px 24px;
			}
		}
	}
`;
