import { useState } from "react";import QrScanner from "react-qr-scanner";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing";
const QRScanner = () => {
	const [data, setData] = useState({ name: "", status: "" });
	const [isScanning, setIsScanning] = useState(true);

	const handleScan = (result) => {
		if (result) {
			const qrData = result.text;
			const [usernameLine, statusLine] = qrData.split("\n");

			const name = usernameLine.split(": ")[1];
			const status = statusLine.split(": ")[1];

			setData({
				name: name || "Name not found",
				status: status || "Status not found",
			});

			setIsScanning(false);
			console.log(data);
		}
	};

	const handleError = (err) => {
		console.error(err);
	};

	const previewStyle = {
		height: 240,
		width: 320,
	};

	return (
		<div className="min-h-screen bg-gray-100 p-4 rounded-xl">
			<div className="flex justify-between items-center my-8 mb-12">
				<Link to={"/dashboard"}>
					<ArrowBackIosIcon />
				</Link>
				<h1 className="text-sm font-bold text-gray-800 text-center">Deceased Person QR Code Scanner</h1>
			</div>
			<div className="flex flex-col items-center justify-between">
				{isScanning && (
					<div className="bg-white p-4 rounded-md shadow-2xl">
						<QrScanner
							delay={300}
							style={previewStyle}
							onError={handleError}
							onScan={handleScan}
							className="w-full h-full rounded-md"
						/>
					</div>
				)}
				<p className="mt-2">
					Function available in capstone 2
				</p>

				<a
					href="#"
					className="inline-flex mt-4 items-center justify-center p-5 text-base font-medium text-blue-500 rounded-lg bg-blue-200 hover:text-blue-900 hover:bg-blue-100">
					<InfoIcon className="mr-2" />
					<span className="w-full">Kobe Bryant QR Detected</span>
					<CallMissedOutgoingIcon />
				</a>
				<p className="text-xs">Click to view</p>
			</div>
		</div>
	);
};

export default QRScanner;
