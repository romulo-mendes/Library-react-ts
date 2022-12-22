import { Book } from "../../models/book";
import CardLibrary from "../../components/booksLibrary/CardLibrary";
import styled from "@emotion/styled";
import { useBooks } from "../../context/useBooks";

const CardsContainer = styled.div`
	display: flex;
	gap: 40px;
	flex-wrap: wrap;
	justify-content: center;
	min-height: 45vh;
	width: 100%;
	height: 100%;
	padding: 0 20px 20px 20px;
`;

const BooksLibrary = () => {
	const { filteredBooks } = useBooks();
	return (
		<div>
			<CardsContainer>
				{filteredBooks &&
					filteredBooks.map((book: Book) => {
						return (
							<CardLibrary key={book.id} img={book.image} tittle={book.tittle} />
						);
					})}
			</CardsContainer>
		</div>
	);
};

export default BooksLibrary;
