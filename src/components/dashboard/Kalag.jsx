import { useEffect, useState } from "react";import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";import EditOutlinedIcon from "@mui/icons-material/EditOutlined";import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import api from "../../assets/api";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SearchKalag from "./SearchKalag";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import EditKalagModal from "../Caretaker/EditKalagModal";
import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
function Kalag({ cemetery_section, isAdmin, setKalagCount }) {
	const [kalagData, setKalagData] = useState([]);
	const [isRefreshing, setIsRefreshing] = useState(false); // State for tracking refresh status
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const handleEditClick = () => {
		setIsEditModalOpen(true);
	};

	const handleEditModalClose = () => {
		setIsEditModalOpen(false);
	};

	const fetchKalagData = async () => {
		setIsRefreshing(true); // Set to "Refreshing..." when clicked
		try {
			const response = await api.get(`/api/kalag/?cemetery_section=${cemetery_section}`);
			setKalagData(response.data);
			setKalagCount(response.data.length); // Update the parent with the count
		} catch (error) {
			console.error("Error fetching Kalag data:", error);
		} finally {
			setIsRefreshing(false); // Set back to "Refresh" when done
		}
	};

	useEffect(() => {
		fetchKalagData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cemetery_section]);

	const refreshData = () => {
		fetchKalagData();
	};

	const handleDelete = async (id) => {
		const confirmed = window.confirm("Are you sure you want to delete this record?");
		if (confirmed) {
			try {
				await api.delete(`/api/kalag/${id}/delete/`);
				// Remove the deleted item from the state
				setKalagData(kalagData.filter((item) => item.id !== id));
			} catch (error) {
				console.error("Error deleting Kalag record:", error);
			}
		}
	};

	return (
		<>
			<div className="text-gray-800 h-full overflow-y-scroll">
				<div className="relative flex flex-col text-gray-700 rounded-xl bg-clip-border">
					<nav className="flex flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
						<div className="flex justify-end items-center text-xs mr-4 py-3 cursor-pointer">
							{isAdmin && <SearchKalag />}
							<div onClick={refreshData}>
								<RefreshIcon
									fontSize="small"
									className="mr-1 ml-2"
								/>
								{isRefreshing ? "Refreshing..." : "Refresh"}
							</div>
						</div>
						{kalagData.map((kalag) => (
							<div
								key={kalag.id}
								className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
								<Link
									to={`/memories/${kalag.id}`}
									className="grid mr-4 place-items-center">
									<FontAwesomeIcon
										icon={faSkullCrossbones}
										className="relative inline-block h-6 w-6 !rounded-full object-cover object-center"
									/>
								</Link>
								<div className="flex flex-col w-full">
									<Link
										to={`/memories/${kalag.id}`}
										className="flex flex-row justify-between items-center">
										<h6 className="block font-sans text-xs antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
											{kalag.name}
										</h6>
										<p className="text-[10px]">
											{kalag.date_born} - {kalag.date_died}
										</p>
									</Link>
									<div className="flex flex-row justify-between items-center">
										<Link
											to={`/memories/${kalag.id}`}
											className="text-ellipsis text-[10px]">
											{kalag.address}
										</Link>
										<div className="mr-1 flex items-center">
											<PsychologyAltIcon
												fontSize="medium"
												className="bg-cyan-600 rounded-full p-1 text-white mr-1"
											/>
											{isAdmin && (
												<>
													<Link to={`/memories/${kalag.id}`}>
														<RemoveRedEyeOutlinedIcon
															fontSize="medium"
															className="bg-green-600 rounded-full p-1 text-white mr-1"
														/>
													</Link>

													<EditOutlinedIcon
														fontSize="medium"
														className="bg-blue-700 rounded-full p-1 text-white"
														onClick={handleEditClick}
													/>
													<EditKalagModal
														modalIsOpen={isEditModalOpen}
														handleClose={handleEditModalClose}
														kalagid={kalag.id}
														kalagname={kalag.name}
														section={cemetery_section}
													/>
													<DeleteOutlinedIcon
														fontSize="medium"
														className="bg-red-700 rounded-full p-1 text-white ml-1"
														onClick={() => handleDelete(kalag.id)}
													/>
												</>
											)}
										</div>
									</div>
								</div>
							</div>
						))}
					</nav>
				</div>
			</div>
			<div className="mt-4"></div>
		</>
	);
}

export default Kalag;
