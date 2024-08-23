import { motion } from "framer-motion";import map from "../../assets/img/map.jpg";function Map() {	return (
		<>
			<div className="relative w-[500px] overflow-x-scroll">
				<img
					src={map}
					alt="Map"
					className="h-[340px] w-full relative z-50"
				/>
				<motion.div
					className="absolute p-6 border-4 z-50 top-[16px] left-[128px] bg-white/40"
					initial={{ scale: 0.8 }} // Initial state
					animate={{ scale: 1 }} // Target state
					transition={{
						duration: 1, // 2 seconds for each phase
						ease: "easeInOut",
						repeat: Infinity, // Infinite loop
						repeatType: "reverse", // Reverses the animation back to initial
					}}>
					<p className="text-sm font-bold">
						Tap to <br /> zoom
					</p>
				</motion.div>
				<motion.div
					className="absolute p-10 border-4 z-50 top-[16px] left-[234px] bg-white/40"
					initial={{ scale: 0.8 }} // Initial state
					animate={{ scale: 1 }} // Target state
					transition={{
						duration: 1, // 2 seconds for each phase
						ease: "easeInOut",
						repeat: Infinity, // Infinite loop
						repeatType: "reverse", // Reverses the animation back to initial
					}}>
					<p className="text-sm font-bold">
						Tap to <br /> zoom
					</p>
				</motion.div>
				<motion.div
					className="absolute p-10 px-24 border-4 z-50 top-[136px] left-[134px] bg-white/40"
					initial={{ scale: 0.8 }} // Initial state
					animate={{ scale: 1 }} // Target state
					transition={{
						duration: 1, // 2 seconds for each phase
						ease: "easeInOut",
						repeat: Infinity, // Infinite loop
						repeatType: "reverse", // Reverses the animation back to initial
					}}>
					<p className="text-sm font-bold">
						Tap to <br /> zoom
					</p>
				</motion.div>
				<div className="absolute top-0 left-0 w-full h-full bg-red-500 opacity-50">
					{/* This div will overlap the image */}
				</div>
			</div>
		</>
	);
}

export default Map;
