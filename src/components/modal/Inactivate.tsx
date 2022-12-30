import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useStateBook from "../../hooks/useStateBook";
import { MainModalProps } from "../../models/modalState";
import { editBook, getBook } from "../../services/books";
import Closer from "./Closer";
import { InactiveContainer } from "./InactivateStyled";

const Inactivate = ({ bookId, controlModal }: MainModalProps) => {
	const [value, setValue] = useState("");
	const [book, setBook] = useStateBook();

	async function getBookAsync() {
		const response = await getBook(bookId);
		setBook(response);
	}

	useEffect(() => {
		getBookAsync();
	}, []);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const bookEdited = {
			...book,
			status: { ...book.status, description: value, isActive: false },
		};
		editBook(bookId, bookEdited);
		controlModal("inactive", "main");
	}

	return (
		<>
			<Closer
				onClick={() => {
					controlModal("inactive", "main");
				}}
			/>
			<InactiveContainer
				onSubmit={(e) => {
					handleSubmit(e);
				}}
			>
				<Typography variant="h6">Inativar Livro</Typography>
				<TextField
					id="description"
					label="Descrição"
					value={value}
					onChange={(e) => {
						setValue(e.target.value);
					}}
					multiline
					minRows={4}
					maxRows={4}
				/>
				<Button variant="outlined" color="error" type="submit">
					Inativar
				</Button>
			</InactiveContainer>
		</>
	);
};

export default Inactivate;
