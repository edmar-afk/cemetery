import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
function Kalag({ name, dob, dod, address, age }) {
	return (
		<>
			<div className="text-gray-800">
				<FontAwesomeIcon icon={faSkullCrossbones} />
				
			</div>
		</>
	);
}

export default Kalag;
