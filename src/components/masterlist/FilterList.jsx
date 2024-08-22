import { useState } from "react";import { motion } from "framer-motion";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";

function FilterList() {
	// Set the default filter to "name"
	const [selectedFilter, setSelectedFilter] = useState("name");

	const handleSortClick = () => {
		setSelectedFilter("name"); // Set the selected filter to name
	};

	const handleAddCardClick = () => {
		setSelectedFilter("balance"); // Set the selected filter to balance
	};

	const iconAnimation = (delay) => ({
		initial: { scale: 0 },
		animate: { scale: 1 },
		transition: { type: "spring", bounce: 0.5, delay },
	});

	return (
		<>
			<div className="flex flex-row items-center justify-between">
				<p className="text-xs">
					Filtered by:
					{selectedFilter === "name" && " Name"}
					{selectedFilter === "balance" && " Balance"}
				</p>
				<div className="flex flex-row">
					<motion.div {...iconAnimation(0)}>
						<SortOutlinedIcon
							onClick={handleSortClick}
							className={`${selectedFilter === "name" ? "bg-blue-500 p-0.5 mr-3 rounded text-white shadow-xl" : ""}`}
						/>
					</motion.div>
					<motion.div {...iconAnimation(0.3)}>
						<AddCardOutlinedIcon
							onClick={handleAddCardClick}
							className={`${selectedFilter === "balance" ? "bg-blue-500 p-0.5 ml-3 rounded text-white shadow-xl" : ""}`}
						/>
					</motion.div>
				</div>
			</div>
		</>
	);
}

export default FilterList;
