import { useState, useEffect } from "react";
import map from "../assets/map/sample.png";
import { motion } from "framer-motion";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Kalag from "../components/dashboard/Kalag";
import Search from "../components/dashboard/Search";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Link } from "react-router-dom";
import api from "../assets/api";
import { Tooltip } from "react-tooltip";

function Dashboard() {
	const [searchToggle, setSearchToggle] = useState(false);
	const [currentSection, setCurrentSection] = useState("Upper Cemetery");
	const [kalagCount, setKalagCount] = useState(0);
	const [latestPlot, setLatestPlot] = useState(null);
	const sections = ["Upper Cemetery", "Center Cemetery", "Lower Cemetery"];

	const handleNextSection = () => {
		const currentIndex = sections.indexOf(currentSection);
		const nextIndex = (currentIndex + 1) % sections.length;
		setCurrentSection(sections[nextIndex]);
	};

	const handlePreviousSection = () => {
		const currentIndex = sections.indexOf(currentSection);
		const previousIndex = (currentIndex - 1 + sections.length) % sections.length;
		setCurrentSection(sections[previousIndex]);
	};

	const fetchPlots = async () => {
		try {
			const response = await api.get("/api/plots-list/", {
				params: { cemetery_section: "Upper Cemetery" },
			});
			console.log(latestPlot);
			setLatestPlot(response.data[0] || null); // Update with the latest plot
		} catch (error) {
			console.error("Error fetching plots:", error);
		}
	};

	useEffect(() => {
		fetchPlots();
	}, []);

	return (
		<>
			<Search searchToggle={searchToggle} />
			<div className="h-[800px] bg-gray-950">
				<img
					src={map}
					className=""
					alt=""
					draggable="false"
				/>
				<div className="fixed top-[380px] rounded-t-3xl h-screen w-screen bg-gray-200 overflow-y-auto">
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
								onClick={() => setSearchToggle(!searchToggle)}
								className="flex justify-end text-blue-800 hover:cursor-pointer">
								<SearchOutlinedIcon fontSize="medium" />
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
