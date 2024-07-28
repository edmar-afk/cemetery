import { Link } from "react-router-dom";

function CaretakerDashboard() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData)
	return (
		<>
            <p className="text-sm p-4">Welcome, caretaker {userData.first_name}</p>
            <Link to={'/logout'}>Logout</Link>
		</>
	);
}

export default CaretakerDashboard;
