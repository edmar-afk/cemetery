import map from "../assets/map/sample.png"; import { motion } from "framer-motion";
import Slots from "../components/dashboard/Slots";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Kalag from "../components/dashboard/Kalag";
import Search from "../components/dashboard/Search";
import { useEffect, useState } from "react";
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

				<motion.div
					initial={{ y: "100vw" }}
					animate={{ y: 0 }}
					transition={{ type: "spring", stiffness: 50 }}
					className="fixed top-[320px] rounded-t-3xl h-screen w-screen bg-gray-200 overflow-y-auto">
					<div className="sticky top-0 pt-1 pb-2 bg-gray-200 z-50">
						<motion.div
							initial={{ y: "100vw" }}
							animate={{ y: 0 }}
							transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
							className=" text-gray-700 text-center my-4 text-xl font-semibold flex flex-row justify-between mx-8">
							<motion.div
								initial={{ x: "100vw" }}
								animate={{ x: 0 }}
								transition={{ type: "spring", stiffness: 50, delay: 0.5 }}>
								<ArrowCircleLeftIcon />
							</motion.div>
							<p>Upper Cemetery</p>
							<motion.div
								initial={{ x: "-100vw" }}
								animate={{ x: 0 }}
								transition={{ type: "spring", stiffness: 50, delay: 0.5 }}>
								<ArrowCircleRightIcon />
							</motion.div>
						</motion.div>
					</div>
					<div className="text-gray-800 flex flex-row justify-between mx-4 my-4 pt-4">
						<div>
							<p>Avaiable Slots: 4</p>
						</div>
						<div
							onClick={() => setSearchToggle(!searchToggle)}
							className="flex justify-end text-gray-800 hover:cursor-pointer">
							Search kalag
						</div>
					</div>
					<Kalag />
				</motion.div>
			</div>
		</>
	);
}

export default Dashboard;
