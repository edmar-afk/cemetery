/* eslint-disable react/prop-types */ import * as React from "react";
import { useState } from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import { TextField } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { CircularProgress } from "@mui/material";
import api from "../../assets/api";

export default function BasicModalDialog({ modalIsOpen, handleClose, section }) {
	const [name, setName] = useState("");
	const [dateBorn, setDateBorn] = useState("");
	const [dateDied, setDateDied] = useState("");
	const [address, setAddress] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);

		const kalagData = {
			cemetery_section: section,
			name: name,
			date_born: dateBorn,
			date_died: dateDied,
			address: address,
		};

		try {
			const response = await api.post("/api/kalags/create/", kalagData);
			console.log("Kalag created successfully:", response.data);
			handleClose(); // Close the modal on successful submission
		} catch (error) {
			console.error("Error creating Kalag:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<React.Fragment>
			<Modal
				open={modalIsOpen}
				onClose={handleClose}>
				<ModalDialog>
					<DialogTitle>Add Kalag in {section}</DialogTitle>
					<DialogContent>Fill in the information of the person.</DialogContent>
					<form onSubmit={handleSubmit}>
						<Stack spacing={2}>
							<TextField
								id="name"
								label="Person Name"
								variant="outlined"
								size="small"
								value={name}
								onChange={(e) => setName(e.target.value)}
								sx={{
									margin: "10px auto",
									"& .MuiOutlinedInput-root": {},
								}}
							/>
							<TextField
								id="dob"
								label="Date of Birth"
								variant="outlined"
								size="small"
								type="date"
								value={dateBorn}
								onChange={(e) => setDateBorn(e.target.value)}
								sx={{
									margin: "10px auto",
									"& .MuiOutlinedInput-root": {},
								}}
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								id="dod"
								label="Date Died"
								variant="outlined"
								size="small"
								type="date"
								value={dateDied}
								onChange={(e) => setDateDied(e.target.value)}
								sx={{
									margin: "10px auto",
									"& .MuiOutlinedInput-root": {},
								}}
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								id="address"
								label="Person Address"
								variant="outlined"
								size="small"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								sx={{
									margin: "10px auto",
									"& .MuiOutlinedInput-root": {},
								}}
							/>
							<Button
								type="submit"
								disabled={isLoading}>
								{isLoading ? (
									<div className="flex items-center">
										<CircularProgress
											size={20}
											className="animate-spin mr-2"
										/>
										Adding
									</div>
								) : (
									<>
										<AddCircleOutlinedIcon
											fontSize="small"
											className="mr-1"
										/>{" "}
										Add
									</>
								)}
							</Button>
						</Stack>
					</form>
				</ModalDialog>
			</Modal>
		</React.Fragment>
	);
}
