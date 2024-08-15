import * as React from "react";import Button from "@mui/joy/Button";import Modal from "@mui/joy/Modal";import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import { TextField } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
// eslint-disable-next-line react/prop-types
export default function PlotModal({ modalIsOpen, handleClose, section }) {
	return (
		<React.Fragment>
			<Modal
				open={modalIsOpen}
				onClose={handleClose}>
				<ModalDialog>
					<DialogTitle sx={{ fontSize: "1rem" }}>Available Plots in {section}</DialogTitle>
					<DialogContent>Fill in the number of available Plots.</DialogContent>
					<form
						onSubmit={(event) => {
							event.preventDefault();
							handleClose(); // Close the modal on form submission
						}}>
						<Stack spacing={2}>
							<TextField
								id="number"
								className="number"
								label="Number of Available Plots"
								variant="outlined"
								size="small"
								sx={{
									margin: "10px auto",
									"& .MuiOutlinedInput-root": {},
								}}
							/>

							<Button type="submit">
								<AddCircleOutlinedIcon
									fontSize="small"
									className="mr-1"
								/>{" "}
								Add
							</Button>
						</Stack>
					</form>
				</ModalDialog>
			</Modal>
		</React.Fragment>
	);
}
