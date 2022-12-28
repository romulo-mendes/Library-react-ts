import { useState } from "react";
import { Book } from "../../models/book";
import CardLibrary from "../../components/booksLibrary/CardLibrary";
import styled from "@emotion/styled";
import { useBooks } from "../../context/useBooks";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box/Box";
import MainModal from "../modal/MainModal";
import LentBook from "../modal/LentBook";
import { TModal } from "../../models/modalState";
import RentHistory from "../modal/RentHistory";

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

const style = {
	position: "absolute",
	left: "50%",
	transform: "translate(-50%, 0%)",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	bgcolor: "#FFF",
	border: "1px solid #707070",
	padding: "40px",
	mt: "55px",
};

const BooksLibrary = () => {
	const { filteredBooks } = useBooks();
	const [open, setOpen] = useState(false);
	const standardModal = {
		main: true,
		lent: false,
		rentHistory: false,
		inactive: false,
	};
	const [modal, setModal] = useState(standardModal);
	const [bookId, setBookId] = useState("");
	const handleOpen = () => setOpen(true);

	const handleClose = () => {
		setOpen(false);
		setModal(standardModal);
	};

	function handleClick(bookId: string) {
		setBookId(bookId);
		handleOpen();
	}

	const handleChangeModal = (closeModal: TModal, openModal: TModal) => {
		setModal((prev) => ({ ...prev, [closeModal]: false, [openModal]: true }));
	};

	return (
		<>
			<Modal sx={{ overflow: "scroll" }} open={open} onClose={handleClose}>
				<Box sx={style}>
					{modal.main && (
						<MainModal bookId={bookId} controlModal={handleChangeModal} />
					)}
					{modal.lent && (
						<LentBook bookId={bookId} controlModal={handleChangeModal} />
					)}
					{modal.rentHistory && (
						<RentHistory bookId={bookId} controlModal={handleChangeModal} />
					)}
				</Box>
			</Modal>
			<CardsContainer>
				{filteredBooks &&
					filteredBooks.map((book: Book) => {
						return (
							<CardLibrary
								key={book.id}
								onClick={() => handleClick(book.id)}
								img={book.image}
								tittle={book.tittle}
							/>
						);
					})}
			</CardsContainer>
		</>
	);
};

export default BooksLibrary;
