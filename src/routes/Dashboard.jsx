/* eslint-disable react-hooks/exhaustive-deps */ import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Kalag from "../components/dashboard/Kalag";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Link } from "react-router-dom";
import api from "../assets/api";
import { Tooltip } from "react-tooltip";
import Map from "../components/dashboard/Map";

function Dashboard() {
	const [searchToggle, setSearchToggle] = useState(false);
	const [currentSection, setCurrentSection] = useState("Upper Portion");
	const [kalagCount, setKalagCount] = useState(0);
	const [latestPlot, setLatestPlot] = useState(null);
	const sections = ["Upper Portion", "Center Portion", "Lower Portion"];

	// Handle next section change (looping over available sections)
	const handleNextSection = () => {
		const currentIndex = sections.indexOf(currentSection);
		const nextIndex = (currentIndex + 1) % sections.length;
		setCurrentSection(sections[nextIndex]);
	};

	// Handle previous section change (looping over available sections)
	const handlePreviousSection = () => {
		const currentIndex = sections.indexOf(currentSection);
		const previousIndex = (currentIndex - 1 + sections.length) % sections.length;
		setCurrentSection(sections[previousIndex]);
	};

	// Fetch the plots data based on current cemetery section
	const fetchPlots = async () => {
		try {
			const response = await api.get("/api/plots-list/", {
				params: { cemetery_section: currentSection },
			});
			setLatestPlot(response.data[0] || null); // Update with the latest plot
		} catch (error) {
			console.error("Error fetching plots:", error);
		}
	};

	// Fetch plots whenever the currentSection changes
	useEffect(() => {
		fetchPlots();
	}, [currentSection]);

	return (
		<>
			{/* Search Component with passed callback to handle first result section */}

			<div className="h-screen bg-white">
				{/* Map Component with cemeterySection as prop */}
				<div className="overflow-x-auto">
					<Map cemeterySection={currentSection} />
				</div>

				{/* Fixed container for the sidebar */}
				<div className="fixed top-[330px] rounded-t-3xl h-full w-screen pb-80 bg-gray-200 overflow-y-auto z-[9999]">
					<div className="sticky top-0 pt-1 pb-2 bg-gray-200 z-50">
						<div className="text-gray-700 text-center my-4 text-xl font-semibold flex flex-row justify-between mx-8">
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", stiffness: 150, bounce: 0.5, delay: 0 }}
								onClick={handlePreviousSection}>
								<ArrowCircleLeftIcon />
							</motion.div>
							<motion.p
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", stiffness: 150, bounce: 0.5, delay: 0.1 }}>
								{currentSection}
							</motion.p>
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", stiffness: 150, bounce: 0.5, delay: 0.2 }}
								onClick={handleNextSection}>
								<ArrowCircleRightIcon />
							</motion.div>
						</div>
					</div>

					{/* Content below the sticky header */}

					<div className="text-gray-800 flex flex-row justify-between mx-4 my-4 pt-4">
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 150, bounce: 0.5, delay: 0.2 }}
							data-tooltip-id="my-tooltip"
							data-tooltip-content={
								latestPlot ? `${latestPlot.number} total Plots subtract to ${kalagCount} kalags` : "No data available"
							}
							data-tooltip-place="bottom">
							<p>Available Slots: {latestPlot ? latestPlot.number - kalagCount : "N/A"}</p>
							<Tooltip id="my-tooltip" />
						</motion.div>
						<div className="flex items-center">
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", stiffness: 150, bounce: 0.5, delay: 0.2 }}
								className="flex justify-end text-blue-800 hover:cursor-pointer">
								<Link to={'/search'}>
									<SearchOutlinedIcon fontSize="medium" />
								</Link>
							</motion.div>
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", stiffness: 150, bounce: 0.5, delay: 0.4 }}>
								<Link to={"/"}>
									<HomeOutlinedIcon
										fontSize="medium"
										className="text-cyan-900 ml-2 mb-0.5"
									/>
								</Link>
							</motion.div>
						</div>
					</div>

					{/* Kalag Component */}
					<Kalag
						isAdmin={false}
						cemetery_section={currentSection}
						setKalagCount={setKalagCount}
					/>
				</div>
			</div>
		</>
	);
}

export default Dashboard;
