/* eslint-disable react/prop-types */ import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
function Kalag({ name, dob, dod, address, age, isAdmin }) {
	return (
		<>
			<div className="text-gray-800 h-full overflow-y-scroll">
				<div className="relative flex flex-col text-gray-700 rounded-xl bg-clip-border">
					<nav className="flex flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
						<div className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
							<div className="grid mr-4 place-items-center">
								<FontAwesomeIcon
									icon={faSkullCrossbones}
									className="relative inline-block h-6 w-6 !rounded-full  object-cover object-center"
								/>
							</div>
							<div className="flex flex-col w-full">
								<div className="flex flex-row justify-between items-center">
									<h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
										Sample Person
									</h6>
									<p className="text-xs">1940 - 2024</p>
								</div>
								<div className="flex flex-row justify-between items-center">
									<p className="text-ellipsis text-xs">Margosatubig Zamboanga del Sur</p>
									<div className="mr-1">
										<EditOutlinedIcon
											fontSize="medium"
											className="bg-blue-700 rounded-full p-1 text-white"
										/>
										<DeleteOutlinedIcon
											fontSize="medium"
											className="bg-red-700 rounded-full p-1 text-white ml-1"
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
							<div className="grid mr-4 place-items-center">
								<FontAwesomeIcon
									icon={faSkullCrossbones}
									className="relative inline-block h-6 w-6 !rounded-full  object-cover object-center"
								/>
							</div>
							<div className="flex flex-col w-full">
								<div className="flex flex-row justify-between items-center">
									<h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
										Sample Person
									</h6>
									<p className="text-xs">1940 - 2024</p>
								</div>
								<div className="flex flex-row justify-between items-center">
									<p className="text-ellipsis text-xs">Margosatubig Zamboanga del Sur</p>
									<div className="mr-1">
										<EditOutlinedIcon
											fontSize="medium"
											className="bg-blue-700 rounded-full p-1 text-white"
										/>
										<DeleteOutlinedIcon
											fontSize="medium"
											className="bg-red-700 rounded-full p-1 text-white ml-1"
										/>
									</div>
								</div>
							</div>
						</div>
					</nav>
				</div>
			</div>
			<div className="mt-4"></div>
		</>
	);
}

export default Kalag;
