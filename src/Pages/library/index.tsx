import styled from "@emotion/styled";
import BackTo from "../../components/BackTo";
import SearchLibrary from "../../components/searchLibrary/SearchLibrary";
import BooksProvider from "../../context/useBooks";

const LibraryContainer = styled.div`
	border-radius: 5px;
	background-color: #fff;
	width: 100%;
	height: 100%;
`;

const Library = () => {
	return (
		<LibraryContainer>
			<BackTo back="Home" current="Biblioteca" />
			<BooksProvider>
				<SearchLibrary />
			</BooksProvider>
		</LibraryContainer>
	);
};

export default Library;
