import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Library from "./Pages/library";

function App() {
	return (
		<>
			<BrowserRouter>
				<Header>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/home" element={<Home />} />
						<Route path="/biblioteca" element={<Library />} />
					</Routes>
				</Header>
			</BrowserRouter>
		</>
	);
}

export default App;
