import { useState, useEffect } from "react";import api from "../../assets/api";
import NavBar from "./NavBar";
import Bubbles from "./Bubbles";
import Time from "./Time";
import Kalag from "../dashboard/Kalag";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import BasicModalDialog from "./Modal";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import PlotModal from "./PlotModal";
import { Tooltip } from "react-tooltip";
function UpperCemetery() {
	const [kalagCount, setKalagCount] = useState(0);

	const [modalState, setModalState] = useState({
		basicModalOpen: false,
		plotModalOpen: false,
	});
	const [latestPlot, setLatestPlot] = useState(null);

	const toggleModal = (modal) => {
		setModalState((prevState) => ({
			...prevState,
			[modal]: !prevState[modal],
		}));
	};

	const fetchPlots = async () => {
		try {
			const response = await api.get("/api/plots-list/", {
				params: { cemetery_section: "Upper Cemetery" },
			});
			setLatestPlot(response.data[0] || null); // Update with the latest plot
		} catch (error) {
			console.error("Error fetching plots:", error);
		}
	};

	useEffect(() => {
		fetchPlots();
	}, []);

	const handlePlotSubmissionSuccess = () => {
		fetchPlots(); // Re-fetch plots to update the latest plot
	};

	return (
		<>
			<BasicModalDialog
				modalIsOpen={modalState.basicModalOpen}
				section="Upper Cemetery"
				handleClose={() => toggleModal("basicModalOpen")}
			/>
			<PlotModal
				modalIsOpen={modalState.plotModalOpen}
				section="Upper Cemetery"
				sectionAPI="upperCemetery"
				handleClose={() => toggleModal("plotModalOpen")}
				onSuccess={handlePlotSubmissionSuccess} // Pass the callback function
			/>
			<div className="bg-blue-600 h-[450px] pt-12">
				<Time />
				<NavBar />
				<Bubbles />
				<div className="bg-white mx-2 rounded-t-3xl shadow-2xl h-fit mt-4">
					<div className="flex flex-row justify-between p-4 mx-2">
						<p className="">Upper Cemetery</p>
						<div>
							<AddCircleOutlineOutlinedIcon
								fontSize="medium"
								className="text-blue-600 hover:cursor-pointer"
								onClick={() => toggleModal("basicModalOpen")}
							/>
							<LayersOutlinedIcon
								fontSize="medium"
								className="text-blue-600 hover:cursor-pointer ml-2"
								onClick={() => toggleModal("plotModalOpen")}
							/>
						</div>
					</div>
					{latestPlot ? (
						<div className="ml-6 -mt-2 text-sm w-fit flex">
							<div
								data-tooltip-id="my-tooltip"
								data-tooltip-content={`${latestPlot.number} total Plots subtract to ${kalagCount} kalags`}
								data-tooltip-place="bottom">
								<LayersOutlinedIcon fontSize="small" />
								Available Plot: <span className="font-bold">{latestPlot.number - kalagCount}</span>
							</div>
							<Tooltip id="my-tooltip" />
						</div>
					) : (
						<div className="ml-6 -mt-2 text-xs">No plots available</div>
					)}

					<Kalag
						isAdmin={true}
						cemetery_section="Upper Cemetery"
						setKalagCount={setKalagCount}
					/>
				</div>
			</div>
		</>
	);
}

export default UpperCemetery;
