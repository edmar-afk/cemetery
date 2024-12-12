import { motion } from "framer-motion";
import morning from "../../assets/img/morning.png";
import evening from "../../assets/img/evening.png";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link } from "react-router-dom";

function Time() {
	const currentHour = new Date().getHours();
	let greeting = "";
	let imageSrc = morning; // Default to morning image for all periods

	// Determine greeting based on time of day
	if (currentHour >= 0 && currentHour < 12) {
		greeting = "Good Morning";
	} else if (currentHour >= 12 && currentHour < 17) {
		greeting = "Good Afternoon";
	} else {
		greeting = "Good Night";
		imageSrc = evening; // Change image for night
	}

	return (
		<>
			<div className="relative">
				<Link
					to={"/logout"}
					className="text-red-200 absolute top-6 right-4 z-50">
					<LogoutOutlinedIcon sx={{ stroke: "currentColor", strokeWidth: "1" }} />
				</Link>
				<motion.img
					initial={{ x: "-100vw" }}
					animate={{ x: 0 }}
					transition={{ type: "spring", stiffness: 50 }}
					src={imageSrc}
					className="absolute -top-16 -left-40"
					alt=""
				/>
				<div className="relative z-10">
					<motion.p
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ type: "spring", stiffness: 150, bounce: 0.5 }}
						className="text-center text-3xl text-white font-bold pt-14">
						{greeting}
					</motion.p>
				</div>
			</div>
		</>
	);
}

export default Time;
