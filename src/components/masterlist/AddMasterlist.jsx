import { useState, useEffect } from "react";import Modal from "@mui/material/Modal";import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Box from "@mui/material/Box";
import { TextField, CircularProgress, Select, MenuItem, InputLabel } from "@mui/material";
import api from "../../assets/api";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import Button from "@mui/joy/Button";

function AddMasterlist() {
	const [open, setOpen] = useState(false);
	const [deceasedList, setDeceasedList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedDeceased, setSelectedDeceased] = useState("");
	const [graveLevel, setGraveLevel] = useState(""); // New state for grave level
	const [amount, setAmount] = useState();
	const [years, setYears] = useState();
	const [total, setTotal] = useState(0);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		const fetchDeceasedList = async () => {
			try {
				const response = await api.get("/api/kalag-list/");
				setDeceasedList(response.data);
			} catch (error) {
				console.error("Error fetching data: ", error);
			} finally {
				setLoading(false);
			}
		};

		fetchDeceasedList();
	}, []);

	const handleChange = (event) => {
		setSelectedDeceased(event.target.value);
	};

	const handleGraveLevelChange = (event) => {
		setGraveLevel(event.target.value);
	};

	const handleAmountChange = (event) => {
		const newAmount = parseFloat(event.target.value) || 0;
		setAmount(newAmount);
		setTotal(newAmount * years);
	};

	const handleYearsChange = (event) => {
		const newYears = parseInt(event.target.value, 10) || 0;
		setYears(newYears);
		setTotal(amount * newYears);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!selectedDeceased || !graveLevel || !amount || !years) {
			alert("Please fill out all fields.");
			return;
		}

		try {
			const response = await api.post("/api/masterlist-create/", {
				kalag: selectedDeceased,
				grave_level: graveLevel,
				amount: amount,
				year: years,
				status: "Not Complete", // Adjust the status as needed
			});
			console.log("Record added:", response.data);
			handleClose(); // Close the modal after successful submission
			window.location.reload(); // Reload the page to reflect the new data
		} catch (error) {
			if (error.response && error.response.status === 400) {
				// Extract validation errors from the response
				const errors = error.response.data.error || "An error occurred.";
				alert(`Error: ${errors}`);
			} else {
				console.error("Error adding record:", error);
				alert("An unexpected error occurred. Please try again later.");
			}
		}
	};

	return (
		<>
			<div
				className="flex flex-row items-center bg-blue-700 w-fit text-white py-2 px-4 rounded-lg cursor-pointer"
				onClick={handleOpen}>
				<AddCircleOutlineOutlinedIcon fontSize="small" />
				<p className="text-xs ml-1">Add Record</p>
			</div>

			<Modal
				open={open}
				onClose={handleClose}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 350,
						bgcolor: "background.paper",
						border: "2px solid #000",
						boxShadow: 24,
						p: 4,
					}}>
					<h2 className="text-xl font-bold mb-8">Create Deceased Record</h2>
					<form onSubmit={handleSubmit}>
						<InputLabel id="deceased-select-label">Select Deceased Person</InputLabel>
						<Select
							labelId="deceased-select-label"
							id="deceased-select"
							value={selectedDeceased}
							onChange={handleChange}
							displayEmpty
							sx={{ width: 270 }}
							renderValue={(selected) => {
								if (selected.length === 0) {
									return <em>Select Deceased Person</em>;
								}
								return deceasedList.find((deceased) => deceased.id === selected)?.name || "";
							}}>
							{loading ? (
								<CircularProgress size={24} />
							) : (
								Array.isArray(deceasedList) &&
								deceasedList.map((deceased) => (
									<MenuItem
										key={deceased.id}
										value={deceased.id}>
										{deceased.name}
									</MenuItem>
								))
							)}
						</Select>

						<TextField
							type="text"
							id="grave-level"
							label="Grave Level"
							variant="outlined"
							size="small"
							sx={{ width: 270, marginTop: 6, height: "50px" }}
							value={graveLevel}
							onChange={handleGraveLevelChange} // Capture grave level input
						/>
						<TextField
							type="number"
							id="amount"
							label="Amount"
							variant="outlined"
							size="small"
							sx={{ width: 270, marginTop: 2, height: "50px" }}
							value={amount}
							onChange={handleAmountChange}
						/>
						<TextField
							type="number"
							id="years"
							label="Years"
							variant="outlined"
							size="small"
							sx={{ width: 270, marginTop: 2, height: "50px" }}
							value={years}
							onChange={handleYearsChange}
						/>
						<p className="text-xs text-blue-600 font-semibold">
							₱{amount} of amount in {years} years total of ₱{total} of payment
						</p>

						<div className="flex flex-row justify-evenly mt-4">
							<Button
								type="submit"
								disabled={loading}>
								{loading ? (
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
					</form>
				</Box>
			</Modal>
		</>
	);
}

export default AddMasterlist;
