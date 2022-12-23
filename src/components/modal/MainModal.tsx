import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getBook } from "../../services/api";
import { Book } from "../../models/book";
import styled from "styled-components";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import { MainModalProps } from "../../models/modalState";

const MainModalContainer = styled.div`
	display: flex;
	gap: 40px;
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

const MainModal = ({ bookId, controleModal }: MainModalProps) => {
	const [book, setBook] = useState<Book>();

	useEffect(() => {
		async function AwaitGetBook() {
			setBook(await getBook(bookId));
		}
		AwaitGetBook();
	}, []);

	return (
		<MainModalContainer>
			{book && (
				<>
					<div className="img-side">
						<img src={book.image} alt={`Capa do livro ${book.tittle}`} />
						<Button
							fullWidth
							variant="contained"
							color="secondary"
							onClick={() => controleModal && controleModal("main", "lent")}
						>
							<AutoStoriesOutlinedIcon sx={{ mr: "12px" }} /> Emprestar
						</Button>
					</div>
					<div className="text-side">
						<div className="text">
							<Typography align="center" variant="h6" sx={{ mb: "24px" }}>
								{book.tittle}
							</Typography>
							<Typography variant="subtitle1">Sinopse</Typography>
							<Typography variant="body1">{book.synopsis}</Typography>
							<Typography variant="subtitle1">Autor</Typography>
							<Typography variant="body1">{book.author}</Typography>
							<Typography variant="subtitle1">Gênero</Typography>
							<Typography variant="body1">{book.genre}</Typography>
							<Typography variant="subtitle1">Data de entrada</Typography>
							<Typography variant="body1">{book.systemEntryDate}</Typography>
						</div>
						<div className="buttons">
							<Button variant="outlined" color="info">
								Editar
							</Button>
							<Button variant="outlined" color="error">
								Inativar
							</Button>
							<Button variant="outlined" sx={{ color: "black" }}>
								Histórico
							</Button>
						</div>
					</div>
				</>
			)}
		</MainModalContainer>
	);
};

export default MainModal;
