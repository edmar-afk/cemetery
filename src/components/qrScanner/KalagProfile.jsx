/* eslint-disable react/prop-types */ import profileBg from "../../assets/img/profilebg.jpg";
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
function KalagProfile({ name, id, cemeterySection }) {
	return (
		<>
			<div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg text-gray-900">
				<div className="rounded-t-lg h-32 overflow-hidden">
					<img
						className="object-cover object-top w-full"
						src={profileBg}
						alt="Mountain"
					/>
				</div>
				<div className="mx-auto w-32 h-32 bg-white relative -mt-16 border-4 border-blue-400 rounded-full overflow-hidden">
					<img
						className="object-cover object-center h-28 mx-auto pt-2"
						src={logo}
						alt="Woman looking front"
					/>
				</div>
				<div className="text-center mt-2">
					<h2 className="font-semibold text-xl">{name}</h2>
					<p className="text-gray-500 text-sm">{cemeterySection}</p>
				</div>

				<div className="p-4 border-t mx-8 mt-2">
					<Link
						to={`/kalag/${id}`}
						className="mx-auto rounded-full text-center flex items-center justify-center bg-blue-900 hover:shadow-lg font-semibold text-white px-6 py-4">
						Visit <PersonPinCircleIcon className="animate-bounce"/>
					</Link>
				</div>
			</div>
		</>
	);
}

export default KalagProfile;
