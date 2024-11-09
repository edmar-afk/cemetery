import { useState, useEffect } from "react";import QrScanner from "react-qr-scanner";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import KalagProfile from "../components/qrScanner/KalagProfile";
import api from "../assets/api";

const QRScanner = () => {
	const [data, setData] = useState(null); // Store Kalag data
	const [isScanning, setIsScanning] = useState(true);
	const [kalagId, setKalagId] = useState(null); // Store the id of Kalag after scan

	// Handle QR scan result
	const handleScan = (result) => {
		if (result) {
			const qrData = result.text;
			// Split and parse the data into key-value pairs
			const parsedData = Object.fromEntries(
				qrData.split("\n").map((line) => line.split(": ").map((str) => str.trim()))
			);

			const id = parsedData.id; // Extract id from QR code data
			setKalagId(id); // Set the Kalag id to fetch the data
			setIsScanning(false); // Stop scanning after QR is scanned
		}
	};

	const handleError = (err) => {
		console.error(err);
	};

	// Fetch Kalag data when kalagId changes (after scanning the QR code)
	useEffect(() => {
		if (kalagId) {
			const fetchKalagData = async () => {
				try {
					const response = await api.get(`/api/scanned-kalag/${kalagId}/`);
					setData(response.data); // Set the Kalag data after successful fetch
				} catch (error) {
					console.error("Error fetching Kalag data:", error);
				}
			};

			fetchKalagData();
		}
	}, [kalagId]);

	return (
		<div className="min-h-screen bg-gray-100 p-4 rounded-xl">
			<div className="flex justify-between items-center my-8 mb-12">
				<Link to={"/dashboard"}>
					<ArrowBackIosIcon />
				</Link>
				<h1 className="text-sm font-bold text-gray-800 text-center">Deceased Person QR Code Scanner</h1>
			</div>
			<div className="flex flex-col items-center justify-between">
				{isScanning ? (
					<div className="bg-white p-4 rounded-md shadow-2xl">
						<QrScanner
							delay={300}
							style={{ height: 240, width: 320 }}
							onError={handleError}
							onScan={handleScan}
							facingMode="environment" // Set to back camera
							className="w-full h-full rounded-md"
						/>
					</div>
				) : (
					<div className="bg-white w-full mt-24">
						{data ? (
							<KalagProfile
								name={data.name || "Name not found"}
								id={data.id || 0}
								cemeterySection={data.cemetery_section || "Cemetery Section not found"}
							/>
						) : (
							<p>Loading Kalag data...</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default QRScanner;
