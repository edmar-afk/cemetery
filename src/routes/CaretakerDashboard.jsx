import { useState } from "react";import NavBar from "../components/Caretaker/NavBar";import Bubbles from "../components/Caretaker/Bubbles";
import Time from "../components/Caretaker/Time";
import Kalag from "../components/dashboard/Kalag";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import BasicModalDialog from "../components/Caretaker/Modal";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import PlotModal from "../components/Caretaker/PlotModal";

function CaretakerDashboard() {
	const [modalState, setModalState] = useState({
		basicModalOpen: false,
		plotModalOpen: false,
	});

	const toggleModal = (modal) => {
		setModalState((prevState) => ({
			...prevState,
			[modal]: !prevState[modal],
		}));
	};

	return (
		<>
			<BasicModalDialog
				modalIsOpen={modalState.basicModalOpen}
				handleClose={() => toggleModal("basicModalOpen")}
			/>
			<PlotModal
				modalIsOpen={modalState.plotModalOpen}
				handleClose={() => toggleModal("plotModalOpen")}
			/>
			<div className="bg-blue-600 h-[450px] pt-12">
				<Time />
				<NavBar />
				<Bubbles />
				<div className="bg-white mx-2 rounded-t-3xl shadow-2xl h-full mt-4">
					<div className="flex flex-row justify-between p-4 mx-2">
						<p className="">Center Cemetery</p>
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
					<p className="ml-6 -mt-2 text-xs">
						<LayersOutlinedIcon fontSize="small" /> 4 Available Plots
					</p>
					<Kalag isAdmin={true} />
				</div>
			</div>
		</>
	);
}

export default CaretakerDashboard;
