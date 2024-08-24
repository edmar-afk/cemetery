/* eslint-disable no-unused-vars */
import React from "react";
import NoInterConnection from "./components/NoInternetConnection";
import Homepage from "./routes/Homepage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./routes/Dashboard";
import { DarkModeProvider } from "./context/DarkModeContext";
import Login from "./routes/Login";
import CaretakerDashboard from "./routes/CaretakerDashboard";
import UpperCemetery from "./components/Caretaker/UpperCemetery";
import LowerCemetery from "./components/Caretaker/LowerCemetery";
import { useEffect } from "react";
import MasterList from "./components/masterlist/MasterList";
import Memories from "./components/memories/Memories";

function Logout() {
	localStorage.clear();
	return <Navigate to="/" />;
}

function RegisterAndLogout() {
	localStorage.clear();
	return;
}

const disableZoom = () => {
	// Disable zoom on mouse wheel
	window.addEventListener(
		"wheel",
		(e) => {
			if (e.ctrlKey) {
				e.preventDefault();
			}
		},
		{ passive: false }
	);

	// Disable zoom on keydown (Ctrl + '+' or '-' or '0')
	window.addEventListener("keydown", (e) => {
		if (
			(e.ctrlKey && (e.key === "+" || e.key === "-" || e.key === "0")) ||
			(e.key === "Meta" && (e.key === "+" || e.key === "-" || e.key === "0"))
		) {
			e.preventDefault();
		}
	});
};

function App() {
	useEffect(() => {
		disableZoom();

		return () => {
			// Cleanup event listeners on unmount
			window.removeEventListener("wheel", disableZoom);
			window.removeEventListener("keydown", disableZoom);
		};
	}, []);
	return (
		<>
			<NoInterConnection>
				<DarkModeProvider>
					<BrowserRouter>
						<Routes>
							<Route
								path="/"
								element={<Homepage />}
							/>
							<Route
								path="/login"
								element={<Login />}
							/>
							<Route
								path="/logout"
								element={<Logout />}
							/>
							<Route
								path="/dashboard"
								element={<Dashboard />}
							/>
							<Route
								path="/upper"
								element={
									<ProtectedRoute>
										<UpperCemetery />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/home"
								element={
									<ProtectedRoute>
										<CaretakerDashboard />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/lower"
								element={
									<ProtectedRoute>
										<LowerCemetery />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/masterlist"
								element={
									<ProtectedRoute>
										<MasterList />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/memories/:kalagId/"
								element={<Memories />}
							/>
							<Route
								path="*"
								element={<NotFound />}
							/>
						</Routes>
					</BrowserRouter>
				</DarkModeProvider>
			</NoInterConnection>
		</>
	);
}

export default App;
