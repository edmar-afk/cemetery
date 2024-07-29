import { Link } from "react-router-dom";import NavBar from "../components/Caretaker/NavBar";
import Bubbles from "../components/Caretaker/Bubbles";
import Time from "../components/Caretaker/Time";
import Kalag from "../components/dashboard/Kalag";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
function CaretakerDashboard() {
	const userData = JSON.parse(localStorage.getItem("userData"));
	// console.log(userData);
	return (
		<>
			<div className="bg-blue-600 h-[450px] -mt-4">
				<Time />
				<NavBar />

				<Bubbles />

				<div className="bg-white mx-2 rounded-t-3xl shadow-2xl h-full mt-4">
					<div className="flex flex-row justify-between p-4 mx-2">
						<p className="">Center Cemetery</p>
						<p>
							<AddCircleOutlineOutlinedIcon
								fontSize="medium"
								className="text-blue-600"
							/>
						</p>
					</div>
					<Kalag />
				</div>
			</div>
		</>
	);
}

export default CaretakerDashboard;
