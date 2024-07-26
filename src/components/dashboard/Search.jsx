import { Box, IconButton, TextField } from "@mui/material";import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
function Search({ searchToggle }) {
    
	useEffect(() => {
		console.log("Toggle state from search bar:", searchToggle);
	}, [searchToggle]);

	return (
		<div className="relative">
			<div
				className={`fixed bg-white ${
					searchToggle ? "top-0" : "-top-20"
				} w-screen h-[60px] rounded-b-2xl flex justify-center transition-all duration-300`}>
				<Box
					className="App"
					sx={{
						width: 330,
						height: 0,
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-evenly",
					}}>
					<form style={{ display: "flex", alignItems: "center" }}>
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
