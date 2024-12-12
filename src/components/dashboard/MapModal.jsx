/* eslint-disable react/prop-types */import { Modal, Box, Typography, Button } from "@mui/material";import { useState } from "react";
import upperMap from "../../assets/img/upper.jpg";
import lowerMap from "../../assets/img/lower.jpg";
import centerMap from "../../assets/img/center.jpg"; // Make sure the path is correct

function MapModal({ open, onClose, cemetery_section, graveNum, name }) {
	// Zoom level state
	const [zoom, setZoom] = useState(1);

	// Choose image based on cemetery_section
	let mapImage;

	if (cemetery_section === "Upper Portion") {
		mapImage = upperMap;
	} else if (cemetery_section === "Lower Portion") {
		mapImage = lowerMap;
	} else if (cemetery_section === "Center Portion") {
		mapImage = centerMap;
	}

	// Handle zoom in and zoom out
	const zoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 0.2, 3)); // Max zoom level 3
	const zoomOut = () => setZoom((prevZoom) => Math.max(prevZoom - 0.2, 1)); // Min zoom level 1

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="map-modal-title"
			aria-describedby="map-modal-description">
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: 400,
					bgcolor: "background.paper",
					boxShadow: 24,
					p: 4,
					borderRadius: 2,
				}}>
				<Typography
					id="map-modal-title"
					variant="h6"
					component="h2">
					Map of {cemetery_section}
				</Typography>
				<Typography
					id="map-modal-description"
					sx={{ mt: 2 }}>
                    {name} is located at {cemetery_section} - Grave number {graveNum}
				</Typography>

				{/* Scrollable container for image */}
				<Box
					sx={{
						mt: 2,
						maxHeight: 400, // Fixed height of the div
						overflow: "auto", // Enable scroll when image overflows
					}}>
					{/* Regular <img> tag with zoom */}
					{mapImage && (
						<img
							src={mapImage}
							alt={`Map of ${cemetery_section}`}
							style={{
								transform: `scale(${zoom})`, // Apply zoom level here
								transition: "transform 0.3s ease", // Smooth transition for zoom
								maxWidth: "100%", // Ensure image doesn't overflow horizontally
								transformOrigin: "top left", // Ensure zoom starts from the top-center
							}}
						/>
					)}
				</Box>

				<div className="flex items-center justify-between mt-2">
					<Button
						variant="outlined"
						onClick={onClose}>
						Close
					</Button>
					<div className="flex">
						<button
							className="bg-blue-400 mx-1 px-2 text-white font-bold text-xl"
							onClick={zoomIn}>
							+
						</button>
						<button
							className="bg-blue-400 mx-1 px-2 text-white font-bold text-xl"
							onClick={zoomOut}>
							-
						</button>
					</div>
				</div>
			</Box>
		</Modal>
	);
}

export default MapModal;
