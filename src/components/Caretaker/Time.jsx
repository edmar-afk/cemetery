import { motion } from "framer-motion";
import morning from "../../assets/img/morning.png";
import evening from "../../assets/img/evening.png";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link } from "react-router-dom";
function Time() {
	const currentHour = new Date().getHours();
	const isMorning = currentHour >= 6 && currentHour < 18; // Morning is between 6 AM and 6 PM

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
					src={isMorning ? morning : evening}
					className="absolute -top-16 -left-40"
					alt=""
				/>
				<div className="relative z-10">
					<motion.p
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ type: "spring", stiffness: 150, bounce: 0.5 }}
						className="text-center text-3xl text-white font-bold pt-14">
						{isMorning ? "Good Morning" : "Good Evening"}
					</motion.p>
				</div>
			</div>
		</>
	);
}

export default Time;
