/* eslint-disable react/prop-types */import { useState, useEffect } from "react";
import { Modal, Box, TextField } from "@mui/material";
import api from "../../assets/api";
import PsychologyIcon from "@mui/icons-material/Psychology";

function AddMemories({ kalagId }) {
	const [open, setOpen] = useState(false);
	const [speech, setSpeech] = useState("");
	const [profilePic, setProfilePic] = useState(null); // For profile picture input

	// Fetch the memory speech when the modal opens
	useEffect(() => {
		if (open) {
			const fetchMemoryData = async () => {
				try {
					const response = await api.get(`/api/kalags/${kalagId}/memories-list/`);
					if (response.data.length > 0) {
						// Assuming you want the first memory's speech
						setSpeech(response.data[0].speech);
					}
				} catch (error) {
					console.error("Error fetching memory data:", error);
				}
			};

			fetchMemoryData();
		}
	}, [open, kalagId]);

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setSpeech("");
		setProfilePic(null);
	};

	const handleSave = async () => {
		try {
			const formData = new FormData();
			formData.append("speech", speech);

			// If a new profile picture is selected, append it, otherwise leave it out
			if (profilePic) {
				formData.append("profile_pic", profilePic);
			}

			const response = await api.post(`/api/kalags/${kalagId}/memories/`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			if (response.status === 200) {
				alert(response.data.message);
				handleClose();
				window.location.reload(); // Refresh the page to get the latest data
			}
		} catch (error) {
			console.error("Error saving memory:", error);
			alert("Failed to save memory. Please try again.");
		}
	};


	return (
		<>
			<button
				onClick={handleOpen}
				className="my-2 bg-gray-100 py-2 text-blue-800 px-4 rounded-xl shadow-md flex items-center text-xs">
				<PsychologyIcon fontSize="small"/> Add Memories
			</button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-title"
				aria-describedby="modal-description">
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
					<p
						id="modal-title"
						style={{ fontSize: "18px", fontWeight: "bold" }}>
						Add New Memory
					</p>
					<p
						id="modal-description"
						style={{ marginTop: "8px" }}>
						Enter details for the Memory of this Person.
					</p>
					<TextField
						fullWidth
						label="Story of this Person"
						margin="normal"
						variant="outlined"
						value={speech}
						onChange={(e) => setSpeech(e.target.value)}
					/>
					<label
						htmlFor="profilePic"
						style={{ marginTop: "16px", cursor: "pointer" }}>
						<div
							style={{
								padding: "8px 16px",
								backgroundColor: "#1976d2",
								color: "#fff",
								borderRadius: "4px",
								textAlign: "center",
								width: "100%",
								display: "inline-block",
							}}>
							{profilePic ? profilePic.name : "Choose Profile Picture"}
						</div>
					</label>
					<input
						type="file"
						id="profilePic"
						accept="image/*"
						onChange={(e) => setProfilePic(e.target.files[0])}
						style={{ display: "none" }}
					/>

					<button
						onClick={handleSave}
						style={{
							marginTop: "16px",
							padding: "8px 16px",
							backgroundColor: "#1976d2",
							color: "#fff",
							border: "none",
							borderRadius: "4px",
							cursor: "pointer",
						}}>
						Save Memory
					</button>
				</Box>
			</Modal>
		</>
	);
}

export default AddMemories;
