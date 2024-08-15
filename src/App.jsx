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

function Logout() {
	localStorage.clear();
	return <Navigate to="/login" />;
}

function RegisterAndLogout() {
	localStorage.clear();
	return null;
}

function App() {
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
