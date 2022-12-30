import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/main/Header";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Library from "./Pages/library";
import { mainTheme } from "./styles/Theme";
import { ThemeProvider } from "@mui/material";
import NewBook from "./Pages/newBook";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import EditBook from "./Pages/editBook";

function App() {
	return (
		<>
			<ThemeProvider theme={mainTheme}>
				<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
					<BrowserRouter>
						<Routes>
							<Route path="/login" element={<Login />} />
							<Route path="/" element={<Header />}>
								<Route index element={<Home />} />
								<Route path="biblioteca" element={<Library />} />
								<Route path="biblioteca/editar/:bookId" element={<EditBook />} />
								<Route path="cadastrar" element={<NewBook />} />
							</Route>
						</Routes>
					</BrowserRouter>
				</LocalizationProvider>
			</ThemeProvider>
		</>
	);
}

export default App;
