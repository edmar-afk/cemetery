import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import { motion } from "framer-motion";
function NavBar() {
	const userData = JSON.parse(localStorage.getItem("userData"));
	return (
		<>
			<div className="my-4 pt-12 mx-5 text-white relative">
				<div className="flex flex-row items-center justify-between">
					<div className="flex flex-col z-50">
						<motion.p
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 150, bounce: 0.5 }}
							className="text-xs">
							Margosatubig Cemetery <br /> Information System
						</motion.p>
						<motion.p
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 150, bounce: 0.5, delay: 0.2 }}
							className="text-lg font-semibold">
							Welcome, caretaker {userData.first_name}
						</motion.p>
					</div>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ type: "spring", stiffness: 150, bounce: 0.5, delay: 0.3 }}
						className="z-50">
						<Person3OutlinedIcon fontSize="large" />
					</motion.div>
				</div>
			</div>
		</>
	);
}

export default NavBar;
