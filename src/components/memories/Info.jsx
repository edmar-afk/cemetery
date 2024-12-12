import { useState } from "react";import LocationOnIcon from "@mui/icons-material/LocationOn";import AddLocationIcon from "@mui/icons-material/AddLocation";import MapModal from "../dashboard/MapModal";

// eslint-disable-next-line react/prop-types
function Info({ name, address, graveNumber, cemeterySection }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleModalOpen = () => {
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<div className="z-[999]">
				<p className="mt-2 mb-4 ml-4 font-bold">Info of {name}</p>
				{/* <div className="mb-0 mx-4">
					<div className="flex flex-row justify-between items-center space-y-6 transition-all duration-500">
						<div className="ml-4 mt-8">
							<h5 className="text-sm font-bold lg:text-2xl">Address:</h5>
							<p className="text-xs text-gray-600 mt-1">{address}</p>
						</div>
						<div className="mr-4 flex items-center justify-center w-12 h-12 bg-green-100 border border-green-200 rounded-full shadow-inner">
							<LocationOnIcon
								className="text-green-800"
								fontSize="medium"
							/>
						</div>
					</div>
				</div> */}

				<div className="mb-0 mx-4">
					<div
						className="flex flex-row justify-between items-center space-y-6 transition-all duration-500 cursor-pointer"
						onClick={handleModalOpen}>
						<div className="ml-4 mt-8">
							<h5 className="text-sm font-bold lg:text-2xl">Cemetery Section:</h5>
							<p className="text-xs text-gray-600 mt-1">{cemeterySection}</p>
						</div>
						<div className="mr-4 flex items-center justify-center w-12 h-12 bg-green-100 border border-green-200 rounded-full shadow-inner">
							<AddLocationIcon
								className="text-green-800"
								fontSize="medium"
							/>
						</div>
					</div>
				</div>

				<div
					className="mb-0 mx-4"
					onClick={handleModalOpen}>
					<div className="flex flex-row justify-between items-center space-y-6 transition-all duration-500">
						<div className="ml-4 mt-8">
							<h5 className="text-sm font-bold lg:text-2xl">Grave Number</h5>
						</div>
						<div className="mr-4 flex font-bold items-center justify-center w-12 h-12 bg-green-100 border border-green-200 rounded-full shadow-inner">
							{graveNumber}
						</div>
					</div>
				</div>
			</div>

			{/* Map Modal */}
			<MapModal
				open={isModalOpen}
				onClose={handleModalClose}
				cemetery_section={cemeterySection}
				graveNum={graveNumber}
				name={name}
			/>
		</>
	);
}

export default Info;
