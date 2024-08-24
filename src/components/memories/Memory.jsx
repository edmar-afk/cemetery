import ImageIcon from "@mui/icons-material/Image";

// eslint-disable-next-line react/prop-types
function Memory({ name }) {
	return (
		<>
			{" "}
			<p className="text-left text-sm ml-4 mt-2 font-bold">Memories of our beloved {name}</p>
			<div className="bg-white rounded-t-3xl shadow-lg p-4">
				<p>
					text text text text text text text texttext text text texttext text text texttext text text text
					text text text text text text text text text text text text text text text text text text text text
				</p>

				<div className="pt-6">
					<p className="font-bold">Images and Videos of {name}</p>
					available in capstone 2
					<ImageIcon
						style={{ fontSize: "350px" }}
						className="text-gray-400"
					/>
					<ImageIcon
						style={{ fontSize: "350px" }}
						className="text-gray-400"
					/>
					<ImageIcon
						style={{ fontSize: "350px" }}
						className="text-gray-400"
					/>
				</div>
			</div>
		</>
	);
}

export default Memory;
