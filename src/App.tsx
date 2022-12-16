import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Library from "./Pages/library";
import { mainTheme } from "./styles/Theme";
import { ThemeProvider } from "@mui/material";

function App() {
	return (
		<>
			<ThemeProvider theme={mainTheme}>
				<BrowserRouter>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/" element={<Header />}>
							<Route index element={<Home />} />
							<Route path="biblioteca" element={<Library />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</>
	);
}

export default App;
