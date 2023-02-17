import Image from "next/image";

import ClientNavBar from "@/components/Nav/ClientNavbar";
import HomeCards from "@/features/Client/Home/HomeCards";

import AlertCircle from "public/icons/svg/alert-circle.svg";

export default function Client() {
	return (
		<>
			<ClientNavBar />
			<main className="items-center justify-center px-4">
				<button className="w-full">
					<div className="alert alert-info shadow-lg mt-4">
						<Image src={AlertCircle} height={24} width={24} alt="alert" />
						<span>You have one shipment in progress.</span>

						{/* <button className="btn btn-sm">Click me</button> */}
					</div>
				</button>

				<h1 className="text-3xl mt-2 mb-4 ml-4 text-left">Welcome, username</h1>
				<HomeCards />
			</main>
		</>
	);
}

// anytime i get to one of these pages, check if i have
