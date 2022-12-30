import SearchLibrary from "../../components/searchLibrary/SearchLibrary";
import BooksProvider from "../../context/useBooks";
import BooksLibrary from "../../components/booksLibrary/BooksLibrary";
import { LibraryContainer } from "./styles";

const Library = () => {
	return (
		<LibraryContainer>
			<BooksProvider>
				<SearchLibrary />
				<BooksLibrary />
			</BooksProvider>
		</LibraryContainer>
	);
};

export default Library;
