import QrCode2Icon from "@mui/icons-material/QrCode2";
function GenerateQR() {
	const userData = JSON.parse(localStorage.getItem("userData"));
	console.log(userData)
	return (
		<>
			<div className="py-6 mx-4">
				<div className="flex flex-row justify-between items-center">
					<div className="flex">
						<p className="ml-2">QR Code Not Available</p>
					</div>

					{userData && ( // Check if userData is not null
						<div className="flex items-center bg-blue-500 text-white py-1 px-2 rounded-lg">
							<p className="mr-2">Generate</p>
							<QrCode2Icon />
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default GenerateQR;
