import QrCode2Icon from "@mui/icons-material/QrCode2";import { useEffect, useState } from "react";
import api from "../../assets/api";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function GenerateQR() {
	const { kalagId } = useParams();
	const [kalagData, setKalagData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [qrCode, setQrCode] = useState(null);
	const [refreshKey, setRefreshKey] = useState(0); // New state variable for refreshing
	const apiUrl = import.meta.env.VITE_API_URL; // Access the environment variable
	const userData = JSON.parse(localStorage.getItem("userData"));

	useEffect(() => {
		api
			.get(`/api/kalags/${kalagId}/`)
			.then((response) => {
				setKalagData(response.data);
				setLoading(false);
				if (response.data.qr) {
					setQrCode(`${apiUrl}/media/${response.data.qr}`);
				}
			})
			.catch((error) => {
				console.error("Error fetching kalag data:", error);
				setLoading(false);
			});
	}, [kalagId, apiUrl, refreshKey]);

	const handleGenerateQRCode = () => {
		if (kalagData) {
			api
				.post(`/api/kalag/${kalagId}/update-qr/`)
				.then((response) => {
					const qrCodePath = response.data.qr;
					setQrCode(`${apiUrl}${qrCodePath}`);
					Swal.fire({
						icon: "success",
						title: "QR Code Generated!",
						text: "You can now download the QR code.",
						confirmButtonText: "OK",
					}).then(() => {
						setRefreshKey((prev) => prev + 1);
					});
				})
				.catch((error) => {
					console.error("Error generating QR code:", error.response?.data || error);
				});
		}
	};

	const handleDownloadQRCode = () => {
		if (qrCode) {
			fetch(qrCode)
				.then((response) => response.blob())
				.then((blob) => {
					const url = window.URL.createObjectURL(blob);
					const a = document.createElement("a");
					a.href = url;
					a.download = "kalag_qr_code.png";
					document.body.appendChild(a);
					a.click();
					a.remove();
					window.URL.revokeObjectURL(url);
				})
				.catch((error) => {
					console.error("Error downloading QR code:", error);
				});
		}
	};

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="py-6 mx-4 flex items-center justify-between">
			<div className="flex items-center">
				{qrCode ? (
					<button
						onClick={handleDownloadQRCode}
						className="text-blue-500 mr-4">
						Download QR Code
					</button>
				) : (
					<p className="ml-2">QR Code Not Available</p>
				)}
			</div>

			{/* Display the QR generation section only if userData exists */}
			{userData && (
				<div className="flex flex-row justify-between items-center">
					{qrCode ? (
						<img
							src={qrCode}
							alt="Kalag QR Code"
							className="w-12 h-12 border rounded-full"
						/>
					) : (
						<div
							className="flex items-center bg-blue-500 text-white py-1 px-2 rounded-lg cursor-pointer"
							onClick={handleGenerateQRCode}>
							<p className="mr-2">Generate</p>
							<QrCode2Icon />
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default GenerateQR;
