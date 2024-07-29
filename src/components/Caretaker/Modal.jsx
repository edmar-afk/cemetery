import * as React from "react";import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import {TextField} from "@mui/material";
// eslint-disable-next-line react/prop-types
export default function BasicModalDialog({ modalIsOpen, handleClose }) {
	return (
		<React.Fragment>
			<Modal
				open={modalIsOpen}
				onClose={handleClose}>
				<ModalDialog>
					<DialogTitle>Add Kalag</DialogTitle>
					<DialogContent>Fill in the information of the person.</DialogContent>
					<form
						onSubmit={(event) => {
							event.preventDefault();
							handleClose(); // Close the modal on form submission
						}}>
						<Stack spacing={2}>
							<TextField
								id="name"
								className="text"
								label="Person Name"
								variant="outlined"
								size="small"
								sx={{
									margin: "10px auto",
									"& .MuiOutlinedInput-root": {},
								}}
							/>
							<TextField
								id="dob"
								className="text"
								label="Date of Birth"
								variant="outlined"
								size="small"
								sx={{
									margin: "10px auto",
									"& .MuiOutlinedInput-root": {},
								}}
							/>
							<TextField
								id="dod"
								className="text"
								label="Date Died"
								variant="outlined"
								size="small"
								sx={{
									margin: "10px auto",
									"& .MuiOutlinedInput-root": {},
								}}
							/>
							<TextField
								id="address"
								className="text"
								label="Person Address"
								variant="outlined"
								size="small"
								sx={{
									margin: "10px auto",
									"& .MuiOutlinedInput-root": {},
								}}
							/>
							<Button type="submit">Submit</Button>
						</Stack>
					</form>
				</ModalDialog>
			</Modal>
		</React.Fragment>
	);
}
