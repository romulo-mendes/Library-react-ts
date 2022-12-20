import { Alert, Snackbar, TextField, AlertColor, Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useStateBook from "../../hooks/useStateBook";

const validationSchema = yup.object({
	author: yup.string().required("Campo Obrigatório"),
	synopsis: yup.string().required("Campo Obrigatório"),
	tittle: yup.string().required("Campo Obrigatório"),
	genre: yup.string().required("Campo Obrigatório"),
	systemEntryDate: yup.date().required,
});

const BookForm = () => {
	const [genre, setGenre] = useState("");
	const [book, setBook] = useStateBook();

	function ImgChange(e: { target: HTMLInputElement }) {
		const getImg = e.target.files;
		if (getImg && getImg.length > 0) {
			const loadingImg = getImg[0];
			const readFile = new FileReader();
			readFile.readAsDataURL(loadingImg);
			readFile.onloadend = function (loadingImg) {
				if (loadingImg.target?.DONE) {
					const imgBase64 = loadingImg.target.result as string;
					setBook({ ...book, image: imgBase64 });
				}
			};
		}
	}

	const handleChange = (event: SelectChangeEvent) => {
		setGenre(event.target.value as string);
	};
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log(values);
		},
	});

	return (
		<>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					formik.handleSubmit();
				}}
			>
				<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
					<div>
						{book.image && <img src={book.image} />}
						<input type="file" name="img" id="img" onChange={ImgChange} />
						<p>Capa</p>
					</div>
					<TextField fullWidth label="Título" />
					<TextField fullWidth label="Sinopse" />
					<TextField fullWidth label="Autor" />
					<FormControl>
						<InputLabel id="select-genre-label">Gênero</InputLabel>
						<Select
							labelId="select-genre-label"
							id="select-genre"
							fullWidth
							label="Gênero"
							onChange={handleChange}
							value={genre}
						>
							<MenuItem value="Fantasia">Fantasia</MenuItem>
							<MenuItem value="Ação e Aventura">Ação e Aventura</MenuItem>
							<MenuItem value="Horror">Horror</MenuItem>
							<MenuItem value="Romance">Romance</MenuItem>
						</Select>
					</FormControl>
					<TextField
						fullWidth
						label="Data de Entrada"
						type="date"
						InputLabelProps={{ shrink: true }}
					/>
					<Button size="large" variant="contained" fullWidth>
						Enviar
					</Button>
				</div>
			</form>
		</>
	);
};

export default BookForm;
