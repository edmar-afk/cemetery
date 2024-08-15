import React, { useState } from "react";import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import { TextField } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import api from "../../assets/api";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
export default function PlotModal({ modalIsOpen, handleClose, section, sectionAPI, onSuccess }) {
	const [number, setNumber] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		const plotData = {
			cemetery_section: section,
			name: sectionAPI,
			number: parseInt(number, 10),
		};

		try {
			const response = await api.post("/api/plots/", plotData);

			Swal.fire({
				icon: "success",
				title: "Success",
				text: `Plot for ${section} has been ${response.status === 201 ? "created" : "updated"}.`,
			});

			console.log("Plot created/updated:", response.data);

			// Call onSuccess to handle post-submit actions
			if (onSuccess) onSuccess();

			handleClose(); // Close the modal on successful submission
		} catch (error) {
			console.error("Error creating/updating plot:", error);
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "There was an error creating/updating the plot. Please try again.",
			});
		}
	};

	return (
		<React.Fragment>
			<Modal
				open={modalIsOpen}
				onClose={handleClose}>
				<ModalDialog>
					<DialogTitle sx={{ fontSize: "1rem" }}>Available Plots in {section}</DialogTitle>
					<DialogContent>Fill in the number of available plots.</DialogContent>
					<form onSubmit={handleSubmit}>
						<Stack spacing={2}>
							<TextField
								id="number"
								type="number"
								label="Number of Available Plots"
								variant="outlined"
								size="small"
								value={number}
								onChange={(e) => setNumber(e.target.value)}
								sx={{ margin: "10px auto" }}
							/>
							<Button type="submit">
								<AddCircleOutlinedIcon
									fontSize="small"
									className="mr-1"
								/>
								Add
							</Button>
						</Stack>
					</form>
				</ModalDialog>
			</Modal>
		</React.Fragment>
	);
}
