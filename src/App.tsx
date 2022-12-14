import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Pages/home";
import Login from "./Pages/login";
import Library from "./Pages/library";
import { ToastContainer } from "react-toastify";

function App() {
	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
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
