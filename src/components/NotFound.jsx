import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Error() {
	const navigate = useNavigate();
	const userData = JSON.parse(localStorage.getItem("userData"));
	console.log(userData);

	const handleBack = () => {
		navigate('/home'); // Go back to the previous URL
	};
	return (
		<div className="bg-blue-700 px-6">
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					minHeight: "100vh",
				}}>
				<Typography
					variant="h1"
					style={{ color: "white" }}>
					404
				</Typography>
				<Typography
					variant="h6"
					style={{ color: "white", textAlign: "center" }}>
					The page you’re looking for doesn’t exist.
				</Typography>
				<br />
				<Button
					variant="contained"
					onClick={handleBack}>
					Back Home
				</Button>
			</Box>
		</div>
	);
}
