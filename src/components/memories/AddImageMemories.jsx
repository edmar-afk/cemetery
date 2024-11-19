import { useState } from "react";import { useParams } from "react-router-dom";import { Modal, Box, Button, Typography, CircularProgress } from "@mui/material";import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";import api from "../../assets/api";

function AddImageMemories() {
	const { kalagId } = useParams(); // Get the kalagId from the URL
	const [open, setOpen] = useState(false);
	const [file, setFile] = useState(null);
	const [isUploading, setIsUploading] = useState(false); // Track upload state

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		if (selectedFile) {
			// Check if the file is an image or video
			const fileType = selectedFile.type;
			if (!fileType.startsWith("image/") && !fileType.startsWith("video/")) {
				alert("Only image or video files can be uploaded");
				event.target.value = null; // Clear the input
				return;
			}
			setFile(selectedFile);
		}
	};

	const handleUpload = async () => {
		if (!file) {
			alert("Please select an image or video file to upload.");
			return;
		}

		const formData = new FormData();
		formData.append("kalag", kalagId);
		formData.append("background_image", file); // Change 'media' to 'background_image'

		try {
			setIsUploading(true); // Set uploading state to true
			await api.post(`/api/upload-background-image/${kalagId}/`, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			alert("File uploaded successfully!");
			setFile(null); // Clear file after upload
			handleClose();
			setIsUploading(false); // Reset uploading state

			// Reload the page to fetch the latest data
			window.location.reload();
		} catch (error) {
			console.error("Error uploading file:", error);
			alert("Failed to upload file. Please try again.");
			setIsUploading(false); // Reset uploading state
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
				aria-labelledby="add-media-modal"
				aria-describedby="add-media-description">
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
						id="add-media-modal"
						variant="h6"
						component="h2"
						gutterBottom>
						Upload Image/Video Memory
					</Typography>
					<input
						type="file"
						accept="image/*, video/*"
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
						sx={{ mt: 3 }}
						disabled={isUploading} // Disable button during upload
					>
						{isUploading ? (
							<>
								<CircularProgress
									size={24}
									sx={{ marginRight: 2 }}
								/>{" "}
								Uploading...
							</>
						) : (
							"Upload"
						)}
					</Button>
				</Box>
			</Modal>
		</>
	);
}

export default AddImageMemories;
