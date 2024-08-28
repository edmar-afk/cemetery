/* eslint-disable react/no-unescaped-entities */
import ImageIcon from "@mui/icons-material/Image";

// eslint-disable-next-line react/prop-types
function Memory({ name }) {
	return (
		<>
			{" "}
			<p className="text-left text-sm ml-4 mt-2 font-bold">Memories of our beloved {name}</p>
			<div className="bg-white rounded-t-3xl shadow-lg p-4">
				<p className="italic text-gray-500">
					"Available in Capstone 2 Available in Capstone 2 Available in Capstone 2 Available in Capstone 2 Available in
					Capstone 2 Available in Capstone 2 Available in Capstone 2 Available in Capstone 2"
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
