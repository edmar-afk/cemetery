import { motion } from "framer-motion";import { useLocation, Link } from "react-router-dom";

function Bubbles() {
	const location = useLocation();

	const isActive = (path) => location.pathname === path;

	return (
		<div className="flex flex-row justify-evenly mt-14 mb-4 relative">
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ type: "spring", stiffness: 150, bounce: 0.5 }}
				className={`${
					isActive("/upper") ? "bg-blue-500 text-white" : "bg-white text-blue-500"
				} rounded-full py-1.5 px-3 shadow-xl z-50 cursor-pointer`}>
				<Link
					to="/upper"
					className="text-[10px] m-1">
					Upper Cemetery
				</Link>
			</motion.div>
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ type: "spring", stiffness: 150, bounce: 0.5, delay: 0.2 }}
				className={`${
					isActive("/home") ? "bg-blue-500 text-white" : "bg-white text-blue-500"
				} rounded-full py-1.5 px-3 shadow-xl z-50 cursor-pointer`}>
				<Link
					to="/home"
					className="text-[10px] m-1">
					Center Cemetery
				</Link>
			</motion.div>
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ type: "spring", stiffness: 150, bounce: 0.5, delay: 0.4 }}
				className={`${
					isActive("/lower") ? "bg-blue-500 text-white" : "bg-white text-blue-500"
				} rounded-full py-2 px-3 shadow-xl z-50 cursor-pointer`}>
				<Link
					to="/lower"
					className="text-[10px]">
					Lower Cemetery
				</Link>
			</motion.div>
		</div>
	);
}

export default Bubbles;
