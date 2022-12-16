import { useNavigate } from "react-router-dom";
import { CardContainer } from "./styles";

const CardHome = ({ icon, text, linkTo }) => {
	const navigate = useNavigate();
	function handleClick() {
		navigate(`/${linkTo}`);
	}

	return (
		<CardContainer onClick={handleClick}>
			<div className="icon">{icon}</div>
			<div className="text">{text}</div>
		</CardContainer>
	);
};

export default CardHome;
