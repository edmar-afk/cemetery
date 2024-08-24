/* eslint-disable react/no-unescaped-entities */import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";

// eslint-disable-next-line react/prop-types
export default function ViewKalagModal({ modalIsOpen, handleClose, section }) {
	return (
		<React.Fragment>
			<Modal
				open={modalIsOpen}
				onClose={handleClose}>
				<ModalDialog
					sx={{
						maxHeight: "90vh", // Limit height to allow scrolling
						overflowY: "auto", // Enable scrolling within the modal
						p: 2,
					}}>
					<DialogTitle>You're viewing {section} info</DialogTitle>
					<DialogContent>Fill in the information of the Deceased person.</DialogContent>

					<div className="mx-auto my-8 flex w-full flex-col items-center gap-3 rounded-xl border border-gray-100 pt-8 text-gray-900 shadow-lg">
						<img
							className="block h-12 w-12 max-w-full rounded-full align-middle"
							src="https://www.uifaces.co/wp-content/themes/uifaces-theme/src/img/home-animation/avatar-2.svg"
							alt="Profile picture"
						/>
						<div className="flex flex-col items-center text-center mb-2">
							<h4 className="text-lg font-medium sm:m-0">Marc Silvester</h4>
							<p className="font-sans text-sm tracking-normal text-gray-500">Lorem, ipsum dolor.</p>
						</div>
						
						<div className="mt-4 flex w-full justify-evenly px-2 space-x-2">
							<button className="flex items-center rounded-lg bg-blue-500 px-4 py-1 text-sm font-medium text-white outline-none transition focus:ring active:bg-blue-500 active:text-white">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="mr-2 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
									/>
								</svg>
								Memories
							</button>

							<button className="flex items-center rounded-lg px-4 py-1 text-sm font-medium text-gray-400 outline-none transition focus:ring active:bg-blue-500 active:text-white">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="mr-2 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								info
							</button>
						</div>
						<div className="h-96 w-full bg-gray-100 px-2">
							<div className="mt-3 flex h-20 w-full flex-col rounded-lg bg-white px-2 shadow">
								<div className="mt-2 h-4 w-1/4 rounded-lg bg-gray-200"></div>
								<div className="mt-2 h-4 w-full rounded-lg bg-gray-200"></div>
								<div className="mt-2 h-4 w-full rounded-lg bg-gray-200"></div>
							</div>
							<div className="mt-3 flex h-20 w-full flex-col rounded-lg bg-white px-2 shadow">
								<div className="mt-2 h-4 w-1/4 rounded-lg bg-gray-200"></div>
								<div className="mt-2 h-4 w-full rounded-lg bg-gray-200"></div>
								<div className="mt-2 h-4 w-full rounded-lg bg-gray-200"></div>
							</div>
							<div className="mt-3 flex h-20 w-full flex-col rounded-lg bg-white px-2 shadow">
								<div className="mt-2 h-4 w-1/4 rounded-lg bg-gray-200"></div>
								<div className="mt-2 h-4 w-full rounded-lg bg-gray-200"></div>
								<div className="mt-2 h-4 w-full rounded-lg bg-gray-200"></div>
							</div>
						</div>
					</div>
				</ModalDialog>
			</Modal>
		</React.Fragment>
	);
}
