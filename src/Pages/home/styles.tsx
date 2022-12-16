import styled from "styled-components";

export const HomeContainer = styled.div`
	width: 100%;
	height: 100%;
	background-color: #fff;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 40px;
	padding: 20px;
	flex-wrap: wrap;
	/* overflow-y: auto; */
	scrollbar-width: auto;
	overflow: auto;
	scroll-snap-type: x mandatory;
	::-webkit-scrollbar {
		width: 0px;
	}
`;
