import { useState } from "react";import NavBar from "../components/Caretaker/NavBar";
import Bubbles from "../components/Caretaker/Bubbles";
import Time from "../components/Caretaker/Time";
import Kalag from "../components/dashboard/Kalag";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import BasicModalDialog from "../components/Caretaker/Modal";

function CaretakerDashboard() {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const handleIconClick = () => {
		setModalIsOpen(true);
	};

	const handleClose = () => {
		setModalIsOpen(false);
	};

	return (
		<>
			<BasicModalDialog
				modalIsOpen={modalIsOpen}
				handleClose={handleClose}
			/>
			<div className="bg-blue-600 h-[450px] pt-12">
				<Time />
				<NavBar />
				<Bubbles />
				<div className="bg-white mx-2 rounded-t-3xl shadow-2xl h-full mt-4">
					<div className="flex flex-row justify-between p-4 mx-2">
						<p className="">Center Cemetery</p>
						<p>
							<AddCircleOutlineOutlinedIcon
								fontSize="medium"
								className="text-blue-600 hover:cursor-pointer"
								onClick={handleIconClick}
							/>
						</p>
					</div>
					<Kalag isAdmin={true} />
				</div>
			</div>
		</>
	);
}

export default CaretakerDashboard;
