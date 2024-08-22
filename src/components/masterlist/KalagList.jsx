import { useEffect, useState } from "react";import api from "../../assets/api";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { motion } from "framer-motion";

function KalagList() {
	const [kalagList, setKalagList] = useState([]);

	useEffect(() => {
		const fetchKalagList = async () => {
			try {
				const response = await api.get("/api/masterlist/"); // Adjust the endpoint as needed
				setKalagList(response.data);
			} catch (error) {
				console.error("Error fetching Kalag list:", error);
			}
		};
		fetchKalagList();
	}, []);

	const handleDelete = async (id, name) => {
		const isConfirmed = window.confirm(`Are you sure you want to delete ${name} data?`);
		if (isConfirmed) {
			try {
				await api.delete(`/api/masterlist/${id}/delete/`); // Adjust the endpoint as needed
				setKalagList(kalagList.filter((item) => item.id !== id));
				window.alert(`Deceased ${name} has been successfully deleted.`);
			} catch (error) {
				console.error("Error deleting item:", error);
				window.alert("There was an error deleting the item.");
			}
		}
	};

	return (
		<ul className="space-y-4">
			{kalagList.length > 0 ? (
				kalagList.map((list, index) => {
					const formattedDate = new Date(list.date_registered).toLocaleDateString("en-US", {
						year: "numeric",
						month: "short",
						day: "numeric",
					});

					return (
						<motion.li
							key={list.id}
							className="px-4 py-4 shadow-2xl border-2 rounded-xl"
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.1, duration: 0.5 }}>
							<div className="flex items-center justify-between">
								<h3 className="text-lg leading-6 font-medium text-gray-900">{list.kalag.name}</h3>
								<p className="mt-1 max-w-2xl text-sm text-gray-500">{formattedDate}</p>
							</div>
							<div className="mt-4 flex items-center justify-between">
								<p className="text-sm font-medium text-gray-500">
									Payment Status:{" "}
									<span className={`text-${list.status === "Active" ? "green" : "red"}-600`}>{list.status}</span>
								</p>

								<div className="flex flex-row">
									<button className="font-medium text-green-600 hover:text-green-500">
										<EditOutlinedIcon />
									</button>
									<button className="font-medium text-blue-600 mx-1 hover:text-blue-500">
										<RemoveRedEyeOutlinedIcon />
									</button>
									<button
										className="font-medium text-red-600 hover:text-red-500"
										onClick={() => handleDelete(list.id, list.kalag.name)}>
										<DeleteOutlineOutlinedIcon />
									</button>
								</div>
							</div>
						</motion.li>
					);
				})
			) : (
				<li className="px-4 py-5 sm:px-6 text-gray-500">No data available</li>
			)}
		</ul>
	);
}

export default KalagList;
