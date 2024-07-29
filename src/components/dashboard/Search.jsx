import { Box, IconButton, TextField } from "@mui/material";import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
function Search({ searchToggle }) {
	useEffect(() => {
		console.log("Toggle state from search bar:", searchToggle);
	}, [searchToggle]);
	const handleSubmit = (event) => {
		event.preventDefault();
		// Add your search logic here
	};
	return (
		<div className="relative p">
			<div
				className={`fixed top-14 bg-white ${
					searchToggle ? "scale-100" : "scale-0"
				} w-screen h-[60px] rounded-full flex justify-center transition-all duration-300`}>
				<Box
					className="App"
					sx={{
						width: 350,
						height: 0,
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-evenly",
					}}>
					<form
						onSubmit={handleSubmit}
						style={{ display: "flex", alignItems: "center" }}>
						<TextField
							id="search-bar"
							className="text rounded-full"
							label="Search Kalag"
							variant="outlined"
							placeholder="Search..."
							size="small"
							sx={{
								width: 350,
								margin: "10px auto",
								"& .MuiOutlinedInput-root": {
									borderRadius: "50px",
								},
							}}
						/>
						<IconButton
							type="submit"
							aria-label="search">
							<SearchIcon style={{ fill: "blue" }} />
						</IconButton>
					</form>
				</Box>
			</div>
		</div>
	);
}

export default Search;
