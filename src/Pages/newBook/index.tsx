import BackTo from "../../components/main/BackTo";
import BookForm from "../../components/form/BookForm";
import { NewBookContainer } from "./styles";

const NewBook = () => {
	return (
		<NewBookContainer>
			<BackTo current="Cadastrar novo livro" back="Home" />
			<BookForm />
		</NewBookContainer>
	);
};

export default NewBook;
