import { motion } from "framer-motion";import { useNavigate, useLocation } from "react-router-dom";

function Bubbles() {
	const navigate = useNavigate();
	const location = useLocation();

	const handleLinkClick = (path) => {
		navigate(path, { replace: true });
		navigate(0); // Force refresh
	};

	const isActive = (path) => location.pathname === path;

	return (
		<div className="flex flex-row justify-evenly mt-14 mb-4 relative">
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ type: "spring", stiffness: 150, bounce: 0.5 }}
				className={`${
					isActive("/home") ? "bg-blue-500 text-white" : "bg-white text-blue-500"
				} rounded-full py-1.5 px-3 shadow-xl z-50 cursor-pointer`}
				onClick={() => handleLinkClick("/home")}>
				<span className="text-xs m-1">Upper Cemetery</span>
			</motion.div>
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ type: "spring", stiffness: 150, bounce: 0.5, delay: 0.2 }}
				className={`${
					isActive("/home") ? "bg-blue-500 text-white" : "bg-white text-blue-500"
				} rounded-full py-1.5 px-3 shadow-xl z-50 cursor-pointer`}
				onClick={() => handleLinkClick("/home")}>
				<span className="text-xs m-1">Center Cemetery</span>
			</motion.div>
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ type: "spring", stiffness: 150, bounce: 0.5, delay: 0.4 }}
				className={`${
					isActive("/home") ? "bg-blue-500 text-white" : "bg-white text-blue-500"
				} rounded-full py-2 px-3 shadow-xl z-50 cursor-pointer`}
				onClick={() => handleLinkClick("/home")}>
				<span className="text-xs">Lower Cemetery</span>
			</motion.div>
		</div>
	);
}

export default Bubbles;
