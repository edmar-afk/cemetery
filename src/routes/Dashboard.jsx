import map from "../assets/map/sample.png";import { motion } from "framer-motion";function Dashboard() {
	return (
		<>
			<div className="h-[1000px]">
				<img
					src={map}
					alt=""
				/>

				<motion.div
					initial={{ y: "100vw" }}
					animate={{ y: 0 }}
					transition={{ type: "spring", stiffness: 50 }}
					className="fixed top-[250px] rounded-t-3xl h-screen w-screen bg-white">
					<motion.div
						initial={{ y: "100vw" }}
						animate={{ y: 0 }}
						transition={{ type: "spring", stiffness: 50, delay:0.2 }}
						className="text-gray-700 text-center my-4 text-xl font-semibold">
						<p>Dolpo Cemetery</p>
					</motion.div>
				</motion.div>
			</div>
		</>
	);
}

export default Dashboard;
