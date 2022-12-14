import { ReactComponent as Logo } from "../../assets/logo.svg";
import { useState } from "react";
import {
	Alert,
	Button,
	Link,
	Snackbar,
	TextField,
	ThemeProvider,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import MailTwoToneIcon from "@mui/icons-material/MailTwoTone";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import { themeButton } from "../../styles/ThemeButtons";
import styled from "styled-components";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormContainer = styled.div`
	width: 433px;
	height: 456px;
	padding: 56px 40px;
	background-color: #fff;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 56px;
	z-index: 1;
	form {
		display: flex;
		flex-direction: column;
		gap: 16px;
		width: 100%;
	}
	.link {
		font-weight: 700;
		font-size: 14px;
	}
	.inputs-login {
		border-radius: 4px;
		background-color: #f1f2f3;
		border: 1px solid #f1f2f3;
		& fieldset {
			border: none;
		}
		& input {
			padding: 14px 16px;
		}
	}
`;

const validationSchema = yup.object({
	email: yup.string().email("Digite um email válido").required("Campo obrigatório"),
	password: yup.string().required("Campo obrigatório"),
});

const LoginForm = () => {
	const [err, setErr] = useState("");
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const url = "http://localhost:3000/login";

	const validateLogin = async (
		email: string,
		password: string
	): Promise<boolean> => {
		try {
			const response = await axios.get(`${url}?email=${email}&password=${password}`);
			const { data } = response;
			if (data.length > 0) {
				setErr("");
				localStorage.setItem("email", email);
				navigate("/home");
				return true;
			}
			setErr("Login ou senha inválido!");
			setOpen(true);
			return false;
		} catch (error) {
			return false;
		}
	};

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			setErr("");
			validateLogin(values.email, values.password);
		},
	});
	return (
		<>
			<Snackbar
				open={open}
				autoHideDuration={4000}
				onClose={() => {
					setOpen(false);
				}}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert severity="error" sx={{ width: "100%" }}>
					{err}
				</Alert>
			</Snackbar>
			<FormContainer
				onSubmit={(e) => {
					e.preventDefault();
					if (formik.values.email.length < 1 || formik.values.password.length < 1) {
						setErr("Preencha todos os campos!");
						setOpen(true);
					}
					formik.handleSubmit();
				}}
			>
				<div>
					<Logo className="logo" />
				</div>
				<form>
					<TextField
						className="inputs-login "
						id="email"
						value={formik.values.email}
						onChange={formik.handleChange}
						style={open ? { border: "1px solid red" } : {}}
						placeholder={"E-mail"}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<MailTwoToneIcon />
								</InputAdornment>
							),
						}}
						fullWidth
					/>
					<TextField
						className="inputs-login "
						id="password"
						type={"password"}
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						style={open ? { border: "1px solid red" } : {}}
						placeholder={"Senha"}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<LockTwoToneIcon />
								</InputAdornment>
							),
						}}
						fullWidth
					/>
					<Link className="link" href="" color="inherit">
						{"Esqueci minha senha"}
					</Link>
					<ThemeProvider theme={themeButton}>
						<Button
							type="submit"
							sx={{
								boxShadow: "0",
								marginTop: "16px",
								fontWeight: "700",
								fontSize: "16px",
							}}
							size="large"
							variant="contained"
						>
							ENTRAR
						</Button>
					</ThemeProvider>
				</form>
			</FormContainer>
		</>
	);
};

export default LoginForm;
