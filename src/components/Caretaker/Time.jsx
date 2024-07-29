import React from "react";import { motion } from "framer-motion";
import morning from "../../assets/img/morning.png";
import evening from "../../assets/img/evening.png";

function Time() {
	const currentHour = new Date().getHours();
	const isMorning = currentHour >= 6 && currentHour < 18; // Morning is between 6 AM and 6 PM

	return (
		<>
			<div className="relative my-4">
				<motion.img
					initial={{ x: "-100vw" }}
					animate={{ x: 0 }}
					transition={{ type: "spring", stiffness: 50 }}
					src={isMorning ? morning : evening}
					className="absolute -top-44 -left-32"
					alt=""
				/>
				<div className="relative z-10">
					<motion.p
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ type: "spring", stiffness: 150, bounce: 0.5 }}
						className="text-center text-3xl text-white font-bold mt-8">
						{isMorning ? "Good Morning" : "Good Evening"}
					</motion.p>
				</div>
			</div>
		</>
	);
}

export default Time;
