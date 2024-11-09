import { useState } from "react";import { useParams } from "react-router-dom";import { Modal, Box, Button, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import api from "../../assets/api";

function AddImageMemories() {
	const { kalagId } = useParams(); // Get the kalagId from the URL
	const [open, setOpen] = useState(false);
	const [file, setFile] = useState(null);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		if (selectedFile && !selectedFile.type.startsWith("image/")) {
			alert("Only image files can be uploaded");
			event.target.value = null; // Clear the input
			return;
		}
		setFile(selectedFile);
	};

	const handleUpload = async () => {
		if (!file) {
			alert("Please select an image file to upload.");
			return;
		}

		const formData = new FormData();
		formData.append("kalag", kalagId);
		formData.append("background_image", file);

		try {
			await api.post(`/api/kalags/${kalagId}/upload-image-memory/`, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			alert("Image uploaded successfully!");
			setFile(null); // Clear file after upload
			handleClose();

			// Reload the page to fetch the latest data
			window.location.reload();
		} catch (error) {
			console.error("Error uploading image:", error);
			alert("Failed to upload image. Please try again.");
		}
	};


	return (
		<>
			<button
				className="bg-blue-600 text-white p-3 rounded-full shadow-lg"
				onClick={handleOpen}>
				<AddPhotoAlternateIcon />
			</button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="add-image-modal"
				aria-describedby="add-image-description">
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 400,
						bgcolor: "background.paper",
						borderRadius: 2,
						boxShadow: 24,
						p: 4,
					}}>
					<Typography
						id="add-image-modal"
						variant="h6"
						component="h2"
						gutterBottom>
						Upload Image Memory
					</Typography>
					<input
						type="file"
						accept="image/*"
						onChange={handleFileChange}
					/>
					{file && (
						<Typography
							variant="body2"
							color="text.secondary"
							mt={2}>
							Selected file: {file.name}
						</Typography>
					)}
					<Button
						variant="contained"
						color="primary"
						onClick={handleUpload}
						sx={{ mt: 3 }}>
						Upload
					</Button>
				</Box>
			</Modal>
		</>
	);
}

export default AddImageMemories;
