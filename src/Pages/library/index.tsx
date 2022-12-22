import React from "react";
import styled from "@emotion/styled";
import BackTo from "../../components/main/BackTo";
import SearchLibrary from "../../components/searchLibrary/SearchLibrary";
import BooksProvider from "../../context/useBooks";
import BooksLibrary from "../../components/booksLibrary/BooksLibrary";

const LibraryContainer = styled.div`
	border-radius: 5px;
	background-color: #fff;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 95px;
	gap: 76px;
	overflow-y: scroll;
`;

const Library = () => {
	return (
		<LibraryContainer>
			<BackTo back="Home" current="Biblioteca" />

			<BooksProvider>
				<SearchLibrary />
				<BooksLibrary />
			</BooksProvider>
		</LibraryContainer>
	);
};

export default Library;
