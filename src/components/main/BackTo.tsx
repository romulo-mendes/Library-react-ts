import { FunctionComponent } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";

const BackToContainer = styled.div`
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
type BackToProps = {
	back: string;
	current: string;
};
const BackTo: FunctionComponent<BackToProps> = ({ back, current }) => {
	const navigate = useNavigate();
	function handleClick() {
		navigate(-1);
	}

	return (
		<BackToContainer onClick={handleClick}>
			<KeyboardArrowLeftOutlinedIcon />
			<div>
				<span className="back">{back}</span>
				<span className="current">{` / ${current}`}</span>
			</div>
		</BackToContainer>
	);
};

export default BackTo;
