/* eslint-disable react/no-unescaped-entities */ import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { motion } from "framer-motion";
function Homepage() {
	return (
		<>
			<div className="relative isolate overflow-hidden bg-gray-200/70 h-screen">
				

				<div
					className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
					aria-hidden="true">
					<div
						className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
						style={{
							clipPath:
								"polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
						}}></div>
				</div>
				<div className="mt-[-50px] flex h-screen items-center justify-center">
					<div className="max-w-full flex-shrink-0 px-4 text-center lg:mx-0 lg:max-w-3xl lg:pt-8">
						<motion.h1
							initial={{ y: -150 }}
							animate={{ y: 1 }}
							transition={{
								type: "spring",
								stiffness: 150,
								damping: 25,
							}}
							className="mt-10 text-4xl font-bold tracking-tight text-gray-800">
							<span>Welcome</span>
							<span className="text-sky-500"> Margosatubig</span>
							<span> Cemetery</span>
							<span className="text-sky-500"> Mapping</span>
						</motion.h1>
						<motion.img
							src={logo}
							className="my-6 mx-auto"
							width={140}
							alt=""
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{
								type: "spring",
								stiffness: 260,
								damping: 20,
							}}
						/>
						<motion.p
							className="mt-6 text-lg leading-8 text-gray-800"
							initial={{ x: "100vw" }}
							animate={{ x: 0 }}
							transition={{
								type: "spring",
								stiffness: 150,
								damping: 25,
							}}>
							Designed to cater to the needs of visitors, this system provides cemetery data.
						</motion.p>
						<motion.div
							initial={{ y: "100vw" }}
							animate={{ y: 0 }}
							transition={{
								type: "spring",
								stiffness: 150,
								damping: 25,
							}}
							className="mt-5 flex items-center justify-center gap-x-6">
							<Link
								to={"/dashboard"}
								className="rounded-md bg-sky-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
								rel="noreferrer">
								Explore →
							</Link>
						</motion.div>
						<motion.p
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{
								type: "spring",
								stiffness: 150,
								damping: 25,
							}}
							className="mt-4 text-gray-800">
							<Link to={"/login"}>Caretaker Login</Link>
						</motion.p>
					</div>
				</div>
			</div>
		</>
	);
}

export default Homepage;
