import { useState, useEffect } from "react";import { motion } from "framer-motion";import { Link } from "react-router-dom";import api from "../assets/api";import searchBg from "../assets/searchMenteryo.svg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import center from "../assets/img/center.jpg";
import lower from "../assets/img/lower.jpg";
import upper from "../assets/img/upper.jpg";

function Search() {
	const [kalagList, setKalagList] = useState([]); // Store all Kalag data
	const [filteredKalag, setFilteredKalag] = useState([]); // Store filtered results
	const [searchQuery, setSearchQuery] = useState(""); // Track search input
	const [activeSection, setActiveSection] = useState("search"); // Track the active section

	// Fetch Kalag data from API
	useEffect(() => {
		const fetchKalag = async () => {
			try {
				const response = await api.get("/api/kalags/");
				setKalagList(response.data);
			} catch (error) {
				console.error("Error fetching Kalag data:", error);
			}
		};

		fetchKalag();
	}, []);

	// Update filtered results when search query changes
	useEffect(() => {
		if (searchQuery.trim() === "") {
			setFilteredKalag([]);
		} else {
			const results = kalagList.filter((kalag) => kalag.name.toLowerCase().includes(searchQuery.toLowerCase()));
			setFilteredKalag(results);
		}
	}, [searchQuery, kalagList]);

	// Dynamically choose the image source based on the active section
	const imageSource = () => {
		switch (activeSection) {
			case "Upper Portion":
				return upper;
			case "Lower Portion":
				return lower;
			case "Center Portion":
				return center;
			default:
				return searchBg; // Fallback to searchBg for default case
		}
	};

	return (
		<div className="h-screen bg-white">
			{/* Header */}
			{(activeSection === "search" || searchQuery.trim() === "") && (
				<div>
					<img
						src={searchBg}
						alt=""
						className="w-52 mx-auto pt-8"
					/>
					<p className="text-center mx-4 font-extralight pb-44">
						Search Deceased person below and click their info to view better results
					</p>
				</div>
			)}

			{/* Map Display */}
			{/* Image Source Container with Scroll */}
			<div className="w-screen h-screen overflow-x-scroll">
				<div className="relative h-[540px] w-[775px] overflow-y-auto">
					<img
						src={imageSource()}
						alt="Map Display"
						className="w-full h-full mx-auto pb-24"
					/>
				</div>
			</div>

			{/* Section Buttons */}
			<div className="flex justify-around bg-gray-100 p-4">
				<button
					onClick={() => setActiveSection("Upper Portion")}
					className={`px-4 py-2 rounded ${
						activeSection === "Upper Portion" ? "bg-blue-500 text-white" : "bg-gray-200"
					}`}>
					Upper
				</button>
				<button
					onClick={() => setActiveSection("Lower Portion")}
					className={`px-4 py-2 rounded ${
						activeSection === "Lower Portion" ? "bg-blue-500 text-white" : "bg-gray-200"
					}`}>
					Lower
				</button>
				<button
					onClick={() => setActiveSection("Center Portion")}
					className={`px-4 py-2 rounded ${
						activeSection === "Center Portion" ? "bg-blue-500 text-white" : "bg-gray-200"
					}`}>
					Center
				</button>
			</div>

			{/* Fixed Sidebar */}
			<div className="fixed top-[330px] rounded-t-3xl h-screen w-screen bg-gray-200 overflow-y-auto z-[9999]">
				<div className="sticky top-0 pt-1 pb-2 bg-gray-200 z-50">
					<div className="text-gray-700 text-center my-4 text-xl font-semibold flex flex-row justify-between mx-8">
						<motion.p
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 150, bounce: 0.5, delay: 0.1 }}>
							Search
						</motion.p>

						<Link to={"/dashboard"}>
							<ArrowBackIcon />
						</Link>
					</div>

					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ type: "spring", stiffness: 150, bounce: 0.5, delay: 0.2 }}
						className="flex px-4 mx-4 py-3 rounded-full border-2 border-blue-500 overflow-hidden max-w-md">
						<input
							type="text"
							placeholder="Search..."
							className="w-full outline-none bg-transparent text-gray-600 text-sm"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 192.904 192.904"
							width="16px"
							className="fill-gray-600">
							<path d="..."></path>
						</svg>
					</motion.div>
				</div>

				{/* Filtered Results */}
				<div className="p-4">
					{filteredKalag.length > 0 ? (
						filteredKalag.map((kalag) => (
							<div
								key={kalag.id}
								className="p-4 bg-white mb-4 rounded shadow"
								onClick={() => setActiveSection(kalag.cemetery_section)}>
								<div className="flex items-center justify-between">
									<h3 className="text-md font-bold">{kalag.name}</h3>
									<p className="text-xs font-bold">Grave: {kalag.grave_number}</p>
								</div>
								<div className="text-xs flex gap-1">
									<p>Date Born: {kalag.date_born}</p> -<p>Date Died: {kalag.date_died}</p>
								</div>
								<div className="text-sm font-semibold flex gap-1">
									<p>Cemetery Section: {kalag.cemetery_section}</p>
								</div>
							</div>
						))
					) : (
						<p className="text-gray-500">No matching Person found.</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default Search;
