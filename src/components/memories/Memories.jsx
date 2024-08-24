import { useState, useEffect } from "react";import { useParams, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import api from "../../assets/api";
import Loading from "../loading/Loading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Info from "./Info";
import Memory from "./Memory";

function Memories() {
	const { kalagId } = useParams(); // Get the kalagId from the URL
	const navigate = useNavigate(); // Initialize the navigate function
	const [kalagData, setKalagData] = useState(null); // State to store kalag data
	const [loading, setLoading] = useState(true); // State to handle loading
	const [activeComponent, setActiveComponent] = useState("info"); // State to toggle between Info and Memory

	useEffect(() => {
		// Fetch kalag data when component mounts
		api
			.get(`/api/kalags/${kalagId}/`)
			.then((response) => {
				setKalagData(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching kalag data:", error);
				setLoading(false);
			});
	}, [kalagId]);

	if (loading) {
		return <Loading />;
	}

	const formatDate = (dateString) => {
		if (!dateString) return "N/A"; // Handle cases where the date might be missing
		const date = new Date(dateString);
		return new Intl.DateTimeFormat("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		}).format(date);
	};

	return (
		<>
			{/* Back button to go to the last visited URL */}
			<div
				className="absolute top-4 left-4 cursor-pointer text-blue-500"
				onClick={() => navigate(-1)}>
				<ArrowBackIcon />
			</div>
			<div className="mx-auto flex w-full h-screen flex-col gap-3 rounded-xl bg-gray-100 text-gray-900">
				<div className="bg-white pt-16 pb-4 shadow-lg rounded-b-3xl">
					<img
						className="block h-24 w-24 mx-auto max-w-full rounded-full align-middle"
						src={logo}
						alt="Profile picture"
					/>
					<div className="flex flex-col items-center text-center mb-2">
						<h4 className="text-lg font-medium sm:m-0">{kalagData ? kalagData.name : "Name not available"}</h4>
						<p className="font-sans text-sm tracking-normal text-gray-500">
							Born in: <b>{formatDate(kalagData.date_born)}</b> - Died in: <b>{formatDate(kalagData.date_died)}</b>
						</p>
					</div>

					<div className="mt-4 flex w-full justify-evenly px-2 space-x-2">
						<button
							className={`flex items-center rounded-lg px-4 py-1 text-sm font-medium outline-none transition focus:ring ${
								activeComponent === "memory" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-400"
							}`}
							onClick={() => setActiveComponent("memory")}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="mr-2 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
								/>
							</svg>
							Memories
						</button>

						<button
							className={`flex items-center rounded-lg px-4 py-1 text-sm font-medium outline-none transition focus:ring ${
								activeComponent === "info" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-400"
							}`}
							onClick={() => setActiveComponent("info")}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="mr-2 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							Info
						</button>
					</div>
				</div>
				{/* Render the selected component based on activeComponent state */}
				{activeComponent === "info" ? (
					<Info
						name={kalagData.name}
						address={kalagData.address}
						graveNumber={kalagData.grave_number}
						cemeterySection={kalagData.cemetery_section}
					/>
				) : (
					<Memory name={kalagData.name} />
				)}
			</div>
		</>
	);
}

export default Memories;
