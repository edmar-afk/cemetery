/* eslint-disable react/no-unescaped-entities */import { useState } from "react";import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NumbersIcon from "@mui/icons-material/Numbers";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../assets/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../assets/contstants";

function Login() {
	const [number, setNumber] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const res = await api.post("/api/token/", {
				username: number,
				password: password,
			});

			if (res.status === 200) {
				localStorage.setItem(ACCESS_TOKEN, res.data.access);
				localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

				const userRes = await api.get("/api/user/", {
					headers: {
						Authorization: `Bearer ${res.data.access}`,
					},
				});

				const userData = userRes.data;
				localStorage.setItem("userData", JSON.stringify(userData));

				navigate("/home");
			} else {
				setError("Login failed.");
			}
		} catch (error) {
			setError(error.response?.data?.detail || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="font-[sans-serif] bg-white">
			<div className="min-h-screen flex flex-col items-center justify-center">
				<div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4">
					<div className="md:max-w-md w-full px-4 py-4">
						<form onSubmit={handleSubmit}>
							<motion.div
								initial={{ x: "100vw" }}
								animate={{ x: 0 }}
								transition={{ type: "spring", stiffness: 50 }}
								className="mb-12">
								<h3 className="text-gray-800 text-2xl font-extrabold text-center">Welcome, Admin!</h3>
							</motion.div>

							<motion.div
								initial={{ x: "100vw" }}
								animate={{ x: 0 }}
								transition={{ type: "spring", stiffness: 50, delay: 0.1 }}>
								<label className="text-gray-800 text-xs block mb-2">Mobile Number</label>
								<div className="relative flex items-center">
									<input
										name="number"
										type="number"
										value={number}
										onChange={(e) => setNumber(e.target.value)}
										required
										className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
										placeholder="Enter Mobile Number"
									/>
									<NumbersIcon className="w-[18px] h-[18px] text-gray-400 absolute right-2" />
								</div>
							</motion.div>

							<motion.div
								initial={{ x: "100vw" }}
								animate={{ x: 0 }}
								transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
								className="mt-8">
								<label className="text-gray-800 text-xs block mb-2">Password</label>
								<div className="relative flex items-center">
									<input
										name="password"
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
										placeholder="Enter password"
									/>
									<VisibilityOffIcon className="w-[18px] h-[18px] text-gray-400 absolute right-2" />
								</div>
							</motion.div>

							<motion.div
								initial={{ x: "100vw" }}
								animate={{ x: 0 }}
								transition={{ type: "spring", stiffness: 50, delay: 0.3 }}
								className="mt-12">
								<button
									type="submit"
									className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none flex items-center justify-center"
									disabled={loading}>
									{loading ? (
										<div className="flex flex-row items-center justify-center">
											<CircularProgress
												size={24}
												className="text-white animate-spin"
											/>
											<p className="ml-2 text-xs text-white font-semibold animate-pulse">Validating</p>
										</div>
									) : (
										"Sign in"
									)}
								</button>
							</motion.div>

							{error && <div className="mt-4 text-red-500 text-center text-sm">{error}</div>}

							<div className="space-x-6 flex justify-center mt-6 text-gray-800 text-xs">
								<p className="">
									Back to{" "}
									<Link
										to={"/"}
										className="text-blue-400 font-semibold">
										Home
									</Link>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
