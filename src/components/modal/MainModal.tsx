import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Book, rentHistory } from "../../models/book";
import styled from "styled-components";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import { MainModalProps } from "../../models/modalState";
import { editBook, getBook } from "../../services/books";
import IsRent from "./IsRent";

const RentHistoryContainer = styled.div`
	.MuiTableCell-root {
		color: #3e4756;
		border: none;
		padding: 0 0 8px 16px;
	}
	.MuiTableCell-head {
		font-weight: 600;
		padding-top: 16px;
	}
	.MuiTableCell-body {
		font-weight: 300;
		padding-bottom: 16px;
	}
`;
const MainModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 60px;
	.main-content {
		display: flex;
		gap: 40px;
	}
	.img-side {
		max-width: 272px;
		min-height: 390px;
		img {
			max-width: 272px;
		}
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 32px;
	}
	.text-side {
		min-width: 424px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.text {
			min-height: 390px;
		}
		.buttons {
			display: flex;
			gap: 24px;
			justify-content: center;
			.MuiButton-root {
				padding: 16px 24px;
			}
		}
	}
`;

const MainModal = ({ bookId, controlModal }: MainModalProps) => {
	const [book, setBook] = useState<Book>();
	const [isRent, setIsRent] = useState(false);
	const [lastRent, setLastRent] = useState<rentHistory>();

	async function AwaitGetBook() {
		const response = await getBook(bookId);
		setBook(response);
	}

	useEffect(() => {
		AwaitGetBook();
	}, []);

	useEffect(() => {
		if (book && book.rentHistory.length) {
			const currentRent = book.rentHistory[book.rentHistory.length - 1];
			if (currentRent && new Date(currentRent.deliveryDate) > new Date()) {
				setLastRent(currentRent);
				setIsRent(true);
			} else {
				setIsRent(false);
			}
		}
	}, [book]);

	async function returnBook() {
		if (book) {
			book.rentHistory[book.rentHistory.length - 1].deliveryDate = new Date();
			const editedBook = await editBook(bookId, book);
			setBook(editedBook);
		}
	}

	const buttonStyles = {
		backgroundColor: isRent ? "#f4f4f4" : undefined,
		border: isRent ? "1px solid #adb5bd" : undefined,
	};

	return (
		<MainModalContainer>
			{book && (
				<>
					<div className="main-content">
						<div className="img-side">
							<img src={book.image} alt={`Capa do livro ${book.tittle}`} />
							<Button
								style={buttonStyles}
								fullWidth
								variant="contained"
								color="secondary"
								onClick={() => {
									isRent ? returnBook() : controlModal("main", "lent");
								}}
							>
								<AutoStoriesOutlinedIcon sx={{ mr: "12px" }} />
								{isRent ? "Devolver" : "Emprestar"}
							</Button>
						</div>
						<div className="text-side">
							<div className="text">
								<Typography align="center" variant="h6" sx={{ mb: "24px" }}>
									{book.tittle}
								</Typography>
								<Typography variant="subtitle1">Sinopse</Typography>
								<Typography
									display="flex"
									style={{
										maxHeight: "67px",
										maxWidth: "424px",
										overflow: "hidden",
									}}
									variant="body1"
								>
									{book.synopsis}
								</Typography>
								<Typography variant="subtitle1">Autor</Typography>
								<Typography variant="body1">{book.author}</Typography>
								<Typography variant="subtitle1">Gênero</Typography>
								<Typography variant="body1">{book.genre}</Typography>
								<Typography variant="subtitle1">Data de entrada</Typography>
								<Typography variant="body1">
									{new Date(book.systemEntryDate).toLocaleDateString("pt-br")}
								</Typography>
							</div>
							<div className="buttons">
								<Button variant="outlined" color="info">
									Editar
								</Button>
								<Button variant="outlined" color="error">
									Inativar
								</Button>
								<Button
									variant="outlined"
									onClick={() => controlModal("main", "rentHistory")}
									sx={{ color: "black" }}
								>
									Histórico
								</Button>
							</div>
						</div>
					</div>
					{isRent && lastRent && (
						<RentHistoryContainer>
							<Typography variant="h6" sx={{ mb: "16px" }}>
								Dados do aluno
							</Typography>
							<IsRent lastRent={lastRent} />
						</RentHistoryContainer>
					)}
				</>
			)}
		</MainModalContainer>
	);
};

export default MainModal;
