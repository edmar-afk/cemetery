import { Link } from "react-router-dom";import NavBar from "../components/Caretaker/NavBar";import Bubbles from "../components/Caretaker/Bubbles";
import Time from "../components/Caretaker/Time";
import Kalag from "../components/dashboard/Kalag";
function CaretakerDashboard() {
	const userData = JSON.parse(localStorage.getItem("userData"));
	console.log(userData);
	return (
		<>
			<div className="bg-blue-600 h-[450px] -mt-4">
				<NavBar />

				<Time />
				<Bubbles />

                <div className="bg-white mx-2 rounded-t-3xl mt-4">
                    <p className="p-4 mx-2">Center Cemetery</p>
					<Kalag />
				</div>
				<Link to={"/logout"}>Logout</Link>
			</div>
		</>
	);
}

export default CaretakerDashboard;
