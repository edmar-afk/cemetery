import * as React from "react";import { useState, useEffect, useRef } from "react";import Button from "@mui/joy/Button";import Modal from "@mui/joy/Modal";import ModalDialog from "@mui/joy/ModalDialog";import DialogTitle from "@mui/joy/DialogTitle";import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import { TextField, CircularProgress, Select, MenuItem } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import api from "../../assets/api";


// eslint-disable-next-line react/prop-types
export default function EditKalagModal({ modalIsOpen, handleClose, section, kalagid, kalagname }) {
	const [name, setName] = useState("");
	const [dateBorn, setDateBorn] = useState("");
	const [dateDied, setDateDied] = useState("");
	const [address, setAddress] = useState("");
	const [graveNumber, setGraveNumber] = useState(0);
	const [relativeName, setRelativeName] = useState("");
	const [relativeNumber, setRelativeNumber] = useState("");
	const [relativeAddress, setRelativeAddress] = useState("");
	const [relativeRelation, setRelativeRelation] = useState("Parent");
	const [isLoading, setIsLoading] = useState(false);

	const lastFetchedId = useRef(null); // Track last fetched ID to prevent re-fetching

	// Fetch data when the modal opens with a new kalagid
	useEffect(() => {
		if (modalIsOpen && kalagid && lastFetchedId.current !== kalagid) {
			setIsLoading(true);
			lastFetchedId.current = kalagid; // Update last fetched ID

			api
				.get(`/api/kalags/${kalagid}/`)
				.then((response) => {
					const kalag = response.data;
					setName(kalag.name);
					setDateBorn(kalag.date_born);
					setDateDied(kalag.date_died);
					setAddress(kalag.address);
					setGraveNumber(kalag.grave_number);
					setRelativeName(kalag.relative_name);
					setRelativeNumber(kalag.relative_number);
					setRelativeAddress(kalag.relative_address);
					setRelativeRelation(kalag.relative_relation);
				})
				.catch((error) => console.error("Error fetching Kalag data:", error))
				.finally(() => setIsLoading(false));
		}
	}, [modalIsOpen, kalagid]);

	// Reset form data and lastFetchedId when the modal closes
	useEffect(() => {
		if (!modalIsOpen) {
			lastFetchedId.current = null;
		}
	}, [modalIsOpen]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);

		const kalagData = {
			cemetery_section: section,
			name: name,
			date_born: dateBorn,
			date_died: dateDied,
			address: address,
			grave_number: graveNumber,
			relative_name: relativeName,
			relative_number: relativeNumber,
			relative_address: relativeAddress,
			relative_relation: relativeRelation,
		};

		try {
			const response = await api.put(`/api/kalag/${kalagid}/update/`, kalagData);
			console.log("Kalag updated successfully:", response.data);
			handleClose(); // Close modal on success
		} catch (error) {
			console.error("Error updating Kalag:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<React.Fragment>
			<Modal
				open={modalIsOpen}
				onClose={handleClose}>
				<ModalDialog
					sx={{
						maxHeight: "90vh", // Limit height to allow scrolling
						overflowY: "auto", // Enable scrolling within the modal
						p: 2,
					}}>
					<DialogTitle>Edit Kalag of {kalagname}</DialogTitle>
					<DialogContent>Update the information of the Deceased person.</DialogContent>
					<form onSubmit={handleSubmit}>
						<p className="font-bold text-sm mb-2 mt-4">Deceased Person info</p>
						<Stack spacing={2}>
							<TextField
								id="name"
								label="Deceased Person Name"
								variant="outlined"
								size="small"
								value={name}
								onChange={(e) => setName(e.target.value)}
								sx={{ margin: "10px auto" }}
							/>
							<TextField
								id="dob"
								label="Date of Birth"
								variant="outlined"
								size="small"
								type="date"
								value={dateBorn}
								onChange={(e) => setDateBorn(e.target.value)}
								sx={{ margin: "10px auto" }}
								InputLabelProps={{ shrink: true }}
							/>
							<TextField
								id="dod"
								label="Date Died"
								variant="outlined"
								size="small"
								type="date"
								value={dateDied}
								onChange={(e) => setDateDied(e.target.value)}
								sx={{ margin: "10px auto" }}
								InputLabelProps={{ shrink: true }}
							/>
							<TextField
								id="address"
								label="Deceased Person Address"
								variant="outlined"
								size="small"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								sx={{ margin: "10px auto" }}
							/>
							<TextField
								type="number"
								id="graveNumber"
								label="Grave Number"
								variant="outlined"
								size="small"
								value={graveNumber}
								onChange={(e) => setGraveNumber(e.target.value)}
								sx={{ margin: "10px auto" }}
							/>
							<br />
							<p className="font-bold text-sm mb-0 mt-6">Contact Person Info</p>
							<TextField
								id="relativeName"
								label="Relative Name"
								variant="outlined"
								size="small"
								value={relativeName}
								onChange={(e) => setRelativeName(e.target.value)}
								sx={{ margin: "10px auto" }}
							/>
							<TextField
								type="number"
								id="relativeNumber"
								label="Relative Phone Number"
								variant="outlined"
								size="small"
								value={relativeNumber}
								onChange={(e) => setRelativeNumber(e.target.value)}
								sx={{ margin: "10px auto" }}
							/>
							<TextField
								id="relativeAddress"
								label="Relative Address"
								variant="outlined"
								size="small"
								value={relativeAddress}
								onChange={(e) => setRelativeAddress(e.target.value)}
								sx={{ margin: "10px auto" }}
							/>

							<p className="font-bold text-sm mb-0 mt-6">Relative Relationship</p>
							<Select
								labelId="relativeRelation-label"
								id="relativeRelation"
								value={relativeRelation}
								onChange={(e) => setRelativeRelation(e.target.value)}
								label="Relative Relation">
								<MenuItem value="Parent">Parent</MenuItem>
								<MenuItem value="Sibling">Sibling</MenuItem>
								<MenuItem value="Child">Child</MenuItem>
								<MenuItem value="Spouse">Spouse</MenuItem>
								<MenuItem value="Other">Other</MenuItem>
							</Select>
							<div className="flex flex-row justify-evenly">
								<Button
									type="submit"
									disabled={isLoading}>
									{isLoading ? (
										<div className="flex items-center">
											<CircularProgress
												size={20}
												className="animate-spin mr-2"
											/>
											Updating
										</div>
									) : (
										<>
											<AddCircleOutlinedIcon
												fontSize="small"
												className="mr-1"
											/>{" "}
											Update
										</>
									)}
								</Button>

								<Button
									onClick={handleClose}
									sx={{
										backgroundColor: "red",
										"&:hover": {
											backgroundColor: "darkred", // Optional: Darker red on hover
										},
									}}>
									<div className="flex items-center">
										<CancelTwoToneIcon
											fontSize="small"
											className="mr-2"
										/>
										Close
									</div>
								</Button>
							</div>
						</Stack>
					</form>
				</ModalDialog>
			</Modal>
		</React.Fragment>
	);
}
