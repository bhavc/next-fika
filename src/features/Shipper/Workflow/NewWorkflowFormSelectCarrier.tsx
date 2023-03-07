import Image from "next/image";
import { useState } from "react";

import IconRight from "public/svg/arrow-right.svg";
import IconLeft from "public/svg/arrow-left.svg";

// TODO get a list of the users carriers
// if a user uses a carrier, keep these as their favorites/last used

// TODO add pagination

export type AreasServiced = "Local" | "Provincial" | "Cross Country" | "Cross Border";

interface NewWorkflowFormSelectCarrierProps {
	selectedCarrier: number | null;
	carriers: { favoriteCarriers: any[]; restCarriers: any[] };
	handleSelectedCarrier: (carrierId: number) => void;
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
	// TODO have to add countries serviced
	// TODO pass this data in instead of hard coding it
	const [viewCardDetail, setViewCardDetail] = useState(null);

	const { favoriteCarriers, restCarriers } = carriers;

	return (
		<div className="w-full bg-slate-100 rounded-b-md p-4 mb-4">
			<h2 className="prose prose-2xl">Select Your carrier</h2>
			<div className="px-4">
				<h3 className="prose prose-xl">Favorites/Frequently used</h3>
				<div className="flex flex-row flex-wrap gap-4">
					{favoriteCarriers.map((carrier, index) => {
						return (
							<button key={index} onClick={() => handleSelectedCarrier(carrier.id)}>
								<div
									className={`card w-96 ${
										selectedCarrier === carrier.id ? "bg-accent-content" : "bg-base-100"
									} shadow-xl`}
								>
									{/* <figure>
										<Image
											src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
											alt="Company Logo"
											height={"40"}
											width={"40"}
										/>
									</figure> */}
									<div className="card-body">
										<h2 className="card-title">
											{carrier.companyName}
											<div className="badge badge-secondary">Used Before</div>
										</h2>
										{/* <p>If a dog chews shoes whose shoes does he choose?</p> */}

										<div className="card-actions justify-end">
											{carrier.areasServiced.map((areaServiced: string, index: number) => {
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
			</div>
			<div className="divider" />
			<div className="px-4">
				<h3 className="prose prose-xl">Others</h3>
				<div className="flex flex-row flex-wrap gap-4">
					{restCarriers.map((carrier, index) => {
						return (
							<button key={index} onClick={() => handleSelectedCarrier(carrier.id)}>
								<div
									className={`card w-96 ${
										selectedCarrier === carrier.id ? "bg-accent-content" : "bg-base-100"
									} shadow-xl`}
								>
									{/* <figure>
										<Image
											src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
											alt="Company Logo"
											height={"40"}
											width={"40"}
										/>
									</figure> */}
									<div className="card-body">
										<h2 className="card-title">
											{carrier.companyName}
											<div className="badge badge-secondary">Used Before</div>
										</h2>
										{/* <p>If a dog chews shoes whose shoes does he choose?</p> */}

										<div className="card-actions justify-end">
											{carrier.areasServiced.map((areaServiced: string, index: number) => {
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
			</div>
			<div className="divider" />

			{/* TODO: add pagination */}
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
