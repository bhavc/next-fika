import Image from "next/image";
import { useState } from "react";

import { UserCarrier } from "../../../Carrier/UserCarrier/types";

import IconRight from "public/svg/arrow-right.svg";
import IconLeft from "public/svg/arrow-left.svg";

// TODO get a list of the users carriers
// if a user uses a carrier, keep these as their favorites/last used

interface NewWorkflowFormSelectCarrierProps {
	selectedCarrier?: UserCarrier;
	carriers: UserCarrier[];
	handleSelectedCarrier: (carrierId: number | null) => void;
	handleNextStep: () => void;
	handleGoBack: () => void;
}

export default function NewWorkflowFormSelectCarrier({
	selectedCarrier,
	carriers,
	handleSelectedCarrier,
	handleNextStep,
	handleGoBack
}: NewWorkflowFormSelectCarrierProps) {
	return (
		<div className="w-full bg-slate-100 rounded-b-md py-4 mb-4">
			<h2 className="prose prose-2xl">Select Your carrier</h2>
			<div className="divider" />
			<div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-4">
				{carriers?.map((carrier, index) => {
					const avatarImageData = carrier.avatarImageData;
					return (
						<button
							className="w-full"
							key={index}
							onClick={() => handleSelectedCarrier(carrier.id)}
						>
							<div
								className={`card md:w-96 ${
									selectedCarrier?.id === carrier.id ? "bg-accent-content" : "bg-base-100"
								} shadow-xl`}
							>
								{avatarImageData && avatarImageData.url && (
									<figure className="mt-4">
										<Image
											src={avatarImageData.url}
											alt="Company Logo"
											height={"160"}
											width={"200"}
										/>
									</figure>
								)}
								<div className="card-body">
									<h2 className="card-title">{carrier.companyName}</h2>
									{/* <div className="badge badge-secondary">Used Before</div> */}
									<div className="flex justify-between">
										<p className="font-bold">Company Address: </p>
										<p>{carrier.companyAddress}</p>
									</div>

									<div className="card-actions justify-end">
										{carrier?.areasServiced?.map((areaServiced: string, index: number) => {
											return (
												<div key={index} className="badge badge-outline">
													{areaServiced}
												</div>
											);
										})}
									</div>
								</div>
							</div>
						</button>
					);
				})}
			</div>

			<div className="divider" />

			{/* <div className="flex items-center justify-center">
				<div className="btn-group">
					<button className="btn btn-lg">1</button>
					<button className="btn btn-lg btn-active">2</button>
					<button className="btn btn-lg">3</button>
					<button className="btn btn-lg">4</button>
				</div>
			</div> */}

			<div className="flex flex-row justify-between">
				<div className="justify-start">
					<button className="btn btn-circle bg-primary mt-10" onClick={handleGoBack}>
						<IconLeft />
					</button>
				</div>
				<div className="flex justify-end">
					<button
						className="btn btn-circle bg-primary mt-10"
						disabled={!selectedCarrier}
						onClick={handleNextStep}
					>
						<IconRight />
					</button>
				</div>
			</div>
		</div>
	);
}
