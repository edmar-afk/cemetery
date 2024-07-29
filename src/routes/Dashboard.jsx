/* eslint-disable no-unused-vars */
import map from "../assets/map/sample.png";
import { motion } from "framer-motion";
import Slots from "../components/dashboard/Slots";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Kalag from "../components/dashboard/Kalag";
import Search from "../components/dashboard/Search";
import { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Link } from "react-router-dom";

function Dashboard() {
	const [searchToggle, setSearchToggle] = useState(false);

	useEffect(() => {
		console.log("Toggle state:", searchToggle);
	}, [searchToggle]);
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
						<div className=" text-gray-700 text-center my-4 text-xl font-semibold flex flex-row justify-between mx-8">
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", stiffness: 150, bounce: 0.5, delay: 0 }}>
								<ArrowCircleLeftIcon />
							</motion.div>
							<motion.p
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", stiffness: 150, bounce: 0.5, delay: 0.1 }}>
								Upper Cemetery
							</motion.p>
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", stiffness: 150, bounce: 0.5, delay: 0.2 }}>
								<ArrowCircleRightIcon />
							</motion.div>
						</div>
					</div>
					<div className="text-gray-800 flex flex-row justify-between mx-4 my-4 pt-4">
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 150, bounce: 0.5, delay: 0.2 }}>
							<p>Avaiable Slots: 4</p>
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
					<Kalag isAdmin={false} />
				</div>
			</div>
		</>
	);
}

export default Dashboard;
