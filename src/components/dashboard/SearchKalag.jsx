function SearchKalag() {
	return (
		<>
			<div className="flex justify-center items-center">
				<div className="relative">
					<input
						id="searchInput"
						type="text"
						className="bg-gray-300 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none transition-all duration-300 ease-in-out w-12 focus:w-64 border-2"
						placeholder="Search..."
						onFocus={(e) => {
							e.target.classList.remove("w-12");
							e.target.classList.add("w-64");
						}}
						onBlur={(e) => {
							if (e.target.value === "") {
								e.target.classList.remove("w-64");
								e.target.classList.add("w-12");
							}
						}}
					/>
					<button
						type="button"
						className="absolute right-0 top-0 mt-3 mr-4"
						onClick={() => {
							const inputField = document.getElementById("searchInput");
							if (inputField) {
								inputField.classList.remove("w-12");
								inputField.classList.add("w-64");
								inputField.focus();
							}
						}}>
						<svg
							className="h-4 w-4 fill-current"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20">
							<path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
						</svg>
					</button>
				</div>
			</div>
		</>
	);
}

export default SearchKalag;
