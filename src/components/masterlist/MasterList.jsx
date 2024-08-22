import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterList from "./FilterList";
import AddMasterlist from "./AddMasterlist";
import KalagList from "./KalagList";

function MasterList() {
	return (
		<>
			<div className="bg-white w-full h-screen">
				<div className="flex items-center p-4">
					<Link to={"/upper"}>
						<ArrowBackIcon className="pt-1" />
					</Link>
					<p className="text-xl font-bold ml-8">Deceased Master List</p>
				</div>

				<div className="pb-14 pt-4 mx-4">
					<label
						className="mx-auto relative bg-white min-w-sm flex flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
						htmlFor="search-bar">
						<input
							id="search-bar"
							placeholder="Search Deceased Person"
							className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
						/>
						<button className="w-auto px-4 py-4 bg-blue-400 border-blue-400 text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">
							<div className="relative">
								<div className="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
									<SearchOutlinedIcon />
								</div>
							</div>
						</button>
					</label>
				</div>

				<div className="p-4">
					<AddMasterlist />
				</div>
				<div className="p-4">
					<FilterList />
				</div>
				<ul className="p-4">
					<KalagList />
				</ul>
			</div>
		</>
	);
}

export default MasterList;
