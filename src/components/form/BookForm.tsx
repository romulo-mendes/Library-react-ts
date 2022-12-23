import { TextField, Button, Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import * as yup from "yup";
import { useFormik } from "formik";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useStateBook from "../../hooks/useStateBook";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { postBook } from "../../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DivInput, Form } from "./BookFormStyled";

const validationSchema = yup.object({
	author: yup.string().required("Campo Obrigatório"),
	synopsis: yup.string().required("Campo Obrigatório"),
	tittle: yup.string().required("Campo Obrigatório"),
	genre: yup.string().required("Campo Obrigatório"),
	systemEntryDate: yup.date().required("Campo Obrigatório"),
});

const BookForm = () => {
	const [book, setBook] = useStateBook();
	const [img, setImg] = useState("");
	const navigate = useNavigate();

	function ImgChange(e: { target: HTMLInputElement }) {
		const getImg = e.target.files;
		if (getImg && getImg.length > 0) {
			const loadingImg = getImg[0];
			const readFile = new FileReader();
			readFile.readAsDataURL(loadingImg);
			readFile.onloadend = function (loadingImg) {
				if (loadingImg.target?.DONE) {
					setImg(loadingImg.target.result as string);
				}
			};
		}
	}

	const formik = useFormik({
		initialValues: {
			author: "",
			synopsis: "",
			tittle: "",
			genre: "",
			systemEntryDate: "",
			id: "",
			image: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			if (!values.id) {
				values.id = self.crypto.randomUUID();
			}
			values.image = img;
			setBook({ ...book, ...values });
		},
	});

	useEffect(() => {
		async function postBookWithValue() {
			await postBook(book);
		}
		if (book.id) {
			postBookWithValue();
			navigate(-1);
		}
	}, [book]);

	return (
		<Form
			onSubmit={(e) => {
				e.preventDefault();
				formik.handleSubmit();
			}}
		>
			<div className="input-container">
				<Box
					className="input-img"
					sx={{ border: "2px dashed #ffc501", width: 172, height: 206 }}
				>
					{img && <img src={img} />}
					<input required type="file" name="img" id="img" onChange={ImgChange} />
					<AddCircleOutlineIcon color="secondary" />
					<p>Capa</p>
				</Box>
				<div className="input-main">
					<DivInput>
						<TextField
							id="tittle"
							value={formik.values.tittle}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.tittle && Boolean(formik.errors.tittle)}
							helperText={formik.touched.tittle && formik.errors.tittle}
							fullWidth
							label="Título"
						/>
						<TextField
							id="synopsis"
							value={formik.values.synopsis}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.synopsis && Boolean(formik.errors.synopsis)}
							helperText={formik.touched.synopsis && formik.errors.synopsis}
							fullWidth
							label="Sinopse"
							multiline
							rows={4.6}
						/>
					</DivInput>
					<DivInput>
						<TextField
							id="author"
							value={formik.values.author}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.author && Boolean(formik.errors.author)}
							helperText={formik.touched.author && formik.errors.author}
							fullWidth
							label="Autor"
						/>
						<FormControl fullWidth>
							<InputLabel id="select-genre-label">Gênero</InputLabel>
							<Select
								labelId="select-genre-label"
								id="genre"
								name="genre"
								value={formik.values.genre}
								onChange={formik.handleChange}
								fullWidth
								label="Gênero"
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
							placeholder="Data de Entrada"
							type="date"
							id="systemEntryDate"
							value={formik.values.systemEntryDate}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.systemEntryDate &&
								Boolean(formik.errors.systemEntryDate)
							}
							helperText={
								formik.touched.systemEntryDate && formik.errors.systemEntryDate
							}
							InputLabelProps={{ shrink: true }}
						/>
					</DivInput>
				</div>
			</div>
			<div className="div-button">
				<Button
					sx={{ color: "black" }}
					size="large"
					onClick={() => {
						navigate(-1);
					}}
					variant="outlined"
					fullWidth
				>
					CANCELAR
				</Button>
				<Button
					size="large"
					color="secondary"
					variant="contained"
					type="submit"
					fullWidth
				>
					Enviar
				</Button>
			</div>
		</Form>
	);
};

export default BookForm;
