import { motion } from "framer-motion";import map from "../../assets/img/map.jpg";import AddLocationIcon from "@mui/icons-material/AddLocation";
// eslint-disable-next-line react/prop-types
function Map({ cemeterySection }) {
	return (
		<>
			<div className="relative w-[800px] h-[340px] overflow-x-scroll">
				<img
					src={map}
					alt="Map"
					className="h-[440px] w-full relative z-50"
				/>
				{cemeterySection === "Upper Portion" && (
					<motion.div
						className="absolute p-6 border-4 rounded-full z-50 top-[240px] left-[250px] bg-white/40"
						initial={{ scale: 0.8 }} // Initial state
						animate={{ scale: 2 }} // Target state
						transition={{
							duration: 1, // 2 seconds for each phase
							ease: "easeInOut",
							repeat: Infinity, // Infinite loop
							repeatType: "reverse", // Reverses the animation back to initial
						}}>
						<p className="text-sm font-bold">
							<AddLocationIcon />
						</p>
					</motion.div>
				)}

				{cemeterySection === "Center Portion" && (
					<motion.div
						className="absolute p-6 rounded-full border-4 z-50 top-[100px] left-[80px] bg-white/40"
						initial={{ scale: 0.8 }} // Initial state
						animate={{ scale: 2 }} // Target state
						transition={{
							duration: 1, // 2 seconds for each phase
							ease: "easeInOut",
							repeat: Infinity, // Infinite loop
							repeatType: "reverse", // Reverses the animation back to initial
						}}>
						<p className="text-sm font-bold">
							<AddLocationIcon />
						</p>
					</motion.div>
				)}

				{cemeterySection === "Lower Portion" && (
					<motion.div
						className="absolute p-6 rounded-full border-4 z-50 top-[76px] left-[254px] bg-white/40"
						initial={{ scale: 0.8 }} // Initial state
						animate={{ scale: 1.5 }} // Target state
						transition={{
							duration: 1, // 2 seconds for each phase
							ease: "easeInOut",
							repeat: Infinity, // Infinite loop
							repeatType: "reverse", // Reverses the animation back to initial
						}}>
						<p className="text-sm font-bold">
							<AddLocationIcon />
						</p>
					</motion.div>
				)}

				<div className="absolute top-0 left-0 w-full h-full bg-red-500 opacity-50">
					{/* This div will overlap the image */}
				</div>
			</div>
		</>
	);
}

export default Map;
