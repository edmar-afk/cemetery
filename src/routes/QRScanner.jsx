import { useState, useEffect, useRef } from "react";import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import api from "../assets/api";
import KalagProfile from "../components/qrScanner/KalagProfile";
import jsQR from "jsqr";

const QRScanner = () => {
	const [data, setData] = useState(null);
	const [isScanning, setIsScanning] = useState(true);
	const [kalagId, setKalagId] = useState(null);
	const [isCameraEnabled, setIsCameraEnabled] = useState(false);
	const [showPrompt, setShowPrompt] = useState(true); // Show custom prompt initially
	const videoRef = useRef(null);
	const canvasRef = useRef(null);

	// Handle custom prompt response
	const handleEnableCamera = () => {
		setIsCameraEnabled(true);
		setShowPrompt(false);
	};

	const handleDenyCamera = () => {
		setIsCameraEnabled(false);
		setShowPrompt(false);
	};

	// Fetch Kalag data when kalagId changes
	useEffect(() => {
		if (kalagId) {
			const fetchKalagData = async () => {
				try {
					const response = await api.get(`/api/scanned-kalag/${kalagId}/`);
					setData(response.data);
				} catch (error) {
					console.error("Error fetching Kalag data:", error);
				}
			};
			fetchKalagData();
		}
	}, [kalagId]);

	// Access camera and display video feed if user enabled it
	useEffect(() => {
		if (isCameraEnabled && videoRef.current) {
			navigator.mediaDevices
				.getUserMedia({ video: { facingMode: "environment" } })
				.then((stream) => {
					videoRef.current.srcObject = stream;
				})
				.catch((error) => console.error("Camera access error:", error));
		}
	}, [isCameraEnabled]);

	// Capture and process QR code from video feed every second
	useEffect(() => {
		const interval = setInterval(() => {
			if (videoRef.current && canvasRef.current && isScanning) {
				const canvas = canvasRef.current;
				const context = canvas.getContext("2d");
				canvas.width = videoRef.current.videoWidth;
				canvas.height = videoRef.current.videoHeight;

				// Draw video frame to canvas
				context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

				// Extract image data and scan for QR code
				const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
				const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

				// If a QR code is detected, process it
				if (qrCode) {
					const qrData = qrCode.data;
					const parsedData = Object.fromEntries(
						qrData.split("\n").map((line) => line.split(": ").map((str) => str.trim()))
					);
					const id = parsedData.id;
					setKalagId(id);
					setIsScanning(false);
					clearInterval(interval);
				}
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [isScanning]);

	return (
		<div className="min-h-screen bg-gray-100 p-4 rounded-xl">
			<div className="flex justify-between items-center my-8 mb-12">
				<Link to={"/dashboard"}>
					<ArrowBackIosIcon />
				</Link>
				<h1 className="text-sm font-bold text-gray-800 text-center">Deceased Person QR Code Scanner</h1>
			</div>

			{/* Custom Camera Access Prompt */}
			{showPrompt && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg text-center">
						<p className="mb-4 text-lg font-semibold">Enable camera for QR scanning?</p>
						<div className="flex justify-center space-x-4">
							<button
								onClick={handleEnableCamera}
								className="bg-blue-500 text-white px-4 py-2 rounded">
								Allow
							</button>
							<button
								onClick={handleDenyCamera}
								className="bg-gray-300 text-black px-4 py-2 rounded">
								Deny
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="flex flex-col items-center justify-between">
				{isScanning ? (
					<div className="bg-white p-4 rounded-md shadow-2xl">
						{isCameraEnabled ? (
							<>
								<video
									ref={videoRef}
									autoPlay
									className="w-full h-auto rounded-md"></video>
								<canvas
									ref={canvasRef}
									style={{ display: "none" }}></canvas>
							</>
						) : (
							<p>Camera access not enabled.</p>
						)}
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
