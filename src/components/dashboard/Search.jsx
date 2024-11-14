import { Box, IconButton, TextField } from "@mui/material";import SearchIcon from "@mui/icons-material/Search";import { useEffect, useState } from "react";
import api from "../../assets/api";
import { Link } from "react-router-dom";

function Search({ searchToggle }) {
	const [kalags, setKalags] = useState([]); // Stores all Kalag data
	const [filteredKalags, setFilteredKalags] = useState([]); // Stores filtered Kalags based on search
	const [searchQuery, setSearchQuery] = useState(""); // Tracks the search input

	useEffect(() => {
		console.log("Toggle state from search bar:", searchToggle);
		if (searchToggle) {
			// Fetch all Kalags when search bar is active
			api
				.get("/api/kalags/")
				.then((response) => {
					setKalags(response.data);
				})
				.catch((error) => console.error("Error fetching Kalags:", error));
		}
	}, [searchToggle]);

	// Update filtered list based on search query
	useEffect(() => {
		if (searchQuery) {
			const filtered = kalags.filter((kalag) => kalag.name.toLowerCase().includes(searchQuery.toLowerCase()));
			setFilteredKalags(filtered);
		} else {
			setFilteredKalags([]);
		}
	}, [searchQuery, kalags]);

	const handleSubmit = (event) => {
		event.preventDefault();
		// Logic for submit if needed
	};

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	return (
		<div className="relative z-[999]">
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
							value={searchQuery}
							onChange={handleSearchChange}
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
			<div
				id="display all kalag here"
				className={`fixed top-32 bg-white/80 w-full ${searchQuery ? "scale-100" : "scale-0"} px-4 pb-3`}>
				<p className="mt-2">Search Results</p>
				{filteredKalags.length > 0 ? (
					<ul className="mt-2">
						{filteredKalags.map((kalag) => (
							<Link
								to={`/memories/${kalag.id}`}
								key={kalag.id}>
								{kalag.name} - {kalag.cemetery_section}
							</Link>
						))}
					</ul>
				) : (
					searchQuery && <p>No results found</p>
				)}
			</div>
		</div>
	);
}

export default Search;
