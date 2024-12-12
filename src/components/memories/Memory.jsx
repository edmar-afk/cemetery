import { useState, useEffect } from "react";import { useParams } from "react-router-dom";import AddMemories from "./AddMemories";
import AddImageMemories from "./AddImageMemories";
import api from "../../assets/api";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css"; // Import the default CSS for the zoom effect
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function Memory({ name }) {
	const userData = JSON.parse(localStorage.getItem("userData"));
	const { kalagId } = useParams(); // Get the kalagId from the URL

	const [memories, setMemories] = useState([]); // State for storing memories
	const [kalagImages, setKalagImages] = useState([]); // State for storing Kalag images

	// Fetch memories when the component mounts
	useEffect(() => {
		const fetchMemories = async () => {
			try {
				const response = await api.get(`/api/kalags/${kalagId}/memories-list/`);
				setMemories(response.data); // Update state with fetched memories
			} catch (error) {
				console.error("Error fetching memories:", error);
			}
		};
		fetchMemories();
	}, [kalagId]);

	// Fetch Kalag images when the component mounts
	useEffect(() => {
		const fetchKalagImages = async () => {
			try {
				const response = await api.get(`/api/kalags/${kalagId}/images/`);
				setKalagImages(response.data); // Update state with fetched images
			} catch (error) {
				console.error("Error fetching Kalag images:", error);
			}
		};
		fetchKalagImages();
	}, [kalagId]);

	// Handle delete image
	const handleDelete = async (imageId) => {
		try {
			const response = await api.delete(`/api/imagesmemories/${imageId}/delete/`);
			if (response.status === 204) {
				// Successfully deleted, remove the image from state
				setKalagImages(kalagImages.filter((image) => image.id !== imageId));
			}
		} catch (error) {
			console.error("Error deleting image:", error);
		}
	};

	// Function to determine whether the background_image is a video or image
	const getFileType = (filePath) => {
		if (!filePath) {
			return null; // or handle it in another way, e.g., return 'invalid' or throw an error
		}

		const fileExtension = filePath.split(".").pop().toLowerCase();
		const imageExtensions = ["png", "jpeg", "jpg"];
		const videoExtensions = ["mp4", "mov", "mkv", "wmv", "mpeg"];

		if (imageExtensions.includes(fileExtension)) {
			return "image";
		}
		if (videoExtensions.includes(fileExtension)) {
			return "video";
		}
		return null;
	};

	return (
		<>
			<p className="text-left text-sm ml-4 mt-2 font-bold">Memories of our beloved {name}</p>

			<div className="bg-white rounded-t-3xl shadow-lg p-4">
				{userData && <AddMemories kalagId={kalagId} />}

				<div className="italic text-gray-500">
					{memories.length > 0
						? memories.map((memory, index) => <p key={index}>{memory.speech}</p>)
						: "No memories were added to this Kalag."}
				</div>

				<div className="pt-6">
					<div className="flex flex-row items-center justify-between">
						<p className="font-bold">
							Images/Videos of <br /> {name}
						</p>
						{userData && <AddImageMemories />}
					</div>

					<div className="flex flex-row justify-start flex-wrap mt-16">
						{/* Display each Kalag image or video */}
						{kalagImages.length > 0 ? (
							kalagImages.map((image, index) => (
								<div
									key={index}
									className="relative">
									{/* Check the file type and render accordingly */}
									{getFileType(image.background_image) === "image" ? (
										<Zoom>
											<img
												src={`${import.meta.env.VITE_API_URL}${image.background_image}`} // Use VITE_ prefix
												alt={`Memory image ${index + 1}`}
												className="w-[150px] h-[150px] object-cover rounded-lg shadow-lg m-2 cursor-pointer"
											/>
										</Zoom>
									) : getFileType(image.background_image) === "video" ? (
										<video
											className="w-[150px] h-[150px] object-cover rounded-lg shadow-lg m-2 cursor-pointer"
											controls>
											<source
												src={`${import.meta.env.VITE_API_URL}${image.background_image}`}
												type="video/mp4"
											/>
											Your browser does not support the video tag.
										</video>
									) : null}

									<button
										className="absolute top-0 right-0 bg-red-400 text-white p-0.5 px-1 rounded-full shadow-md z-50"
										onClick={() => handleDelete(image.id)}>
										<HighlightOffIcon fontSize="small" />
									</button>
								</div>
							))
						) : (
							<p className="text-gray-500">No images or videos were added to this Kalag.</p>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default Memory;
