import BackTo from "../../components/BackTo";
import styled from "styled-components";
import BookForm from "../../components/form/BookForm";

const NewBookContainer = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 5px;
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const NewBook = () => {
	return (
		<NewBookContainer>
			<BackTo current="Cadastrar novo livro" back="Home" />
			<BookForm />
		</NewBookContainer>
	);
};

export default NewBook;
