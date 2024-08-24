import LocationOnIcon from "@mui/icons-material/LocationOn";import AddLocationIcon from "@mui/icons-material/AddLocation";

// eslint-disable-next-line react/prop-types
function Info({ name, address, graveNumber, cemeterySection }) {
	return (
		<>
			<div className="z-[999]">
				<p className="mt-2 mb-4 ml-4 font-bold">Info of {name}</p>
				<div className="mb-3 mx-4 rounded-2xl shadow-lg">
					<a
						href="#"
						className="flex flex-row p-6 justify-between items-center space-y-6 transition-all duration-500 bgWhite border border-indigo-100 rounded-lg shadow hover:shadow-xl">
						<div className="ml-4 mt-3">
							<h5 className="text-sm font-bold lg:text-2xl">Address:</h5>
							<p className="text-xs text-gray-600 mt-1">{address}</p>
						</div>
						<div className="mr-4 flex items-center justify-center w-16 h-16 bg-green-100 border border-green-200 rounded-full shadow-inner">
							<LocationOnIcon
								className="text-green-800"
								fontSize="large"
							/>
						</div>
					</a>
				</div>

				<div className="mb-3 mx-4 rounded-2xl shadow-lg">
					<a
						href="#"
						className="flex flex-row p-6 justify-between items-center space-y-6 transition-all duration-500 bgWhite border border-indigo-100 rounded-lg shadow hover:shadow-xl">
						<div className="ml-4 mt-3">
							<h5 className="text-sm font-bold lg:text-2xl">Cemetery Section:</h5>
							<p className="text-xs text-gray-600 mt-1">{cemeterySection}</p>
						</div>
						<div className="mr-4 flex items-center justify-center w-16 h-16 bg-green-100 border border-green-200 rounded-full shadow-inner">
							<AddLocationIcon
								className="text-green-800"
								fontSize="large"
							/>
						</div>
					</a>
				</div>

				<div className="mb-3 mx-4 rounded-2xl shadow-lg">
					<a
						href="#"
						className="flex flex-row p-6 justify-between items-center space-y-6 transition-all duration-500 bgWhite border border-indigo-100 rounded-lg shadow hover:shadow-xl">
						<div className="ml-4 mt-3">
							<h5 className="text-sm font-bold lg:text-2xl">Grave Number</h5>
						</div>
						<div className="mr-4 flex font-bold items-center justify-center w-16 h-16 bg-green-100 border border-green-200 rounded-full shadow-inner">
							{graveNumber}
						</div>
					</a>
				</div>
			</div>
		</>
	);
}

export default Info;
