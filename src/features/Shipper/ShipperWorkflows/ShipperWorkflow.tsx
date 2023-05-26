import ShipperWorkflowPricing from "./ShipperWorkflowPricing";

import type { ShipperWorkflowType } from "@/features/Shipper/ShipperWorkflows/types";

interface WorkflowProps {
	workflow: ShipperWorkflowType;
	handleAcceptPrice: () => void;
	handleDeclinePrice: () => void;
}

export default function ShipperWorkflow({
	workflow,
	handleAcceptPrice,
	handleDeclinePrice
}: WorkflowProps) {
	const workflowStatus = workflow?.status;
	const workflowAddressData = workflow?.workflowAddressData;
	const workflowContainerData = workflow?.workflowContainerData;
	const workflowPriceData = workflow?.workflowPriceData;
	const selectedCarrier = workflow.selectedCarrier;

	const {
		containerNumber,
		dropOffAppointmentNeeded,
		dropoffAddress,
		dropoffCompanyName,
		dropoffContactName,
		dropoffContactPhone,
		dropoffWindow,
		pickupAddress,
		pickupAppointmentNeeded,
		pickupCompanyName,
		pickupContactName,
		pickupContactPhone,
		pickupWindow,
		cargoReferenceNumber,
		pickupNumber,
		bolNumber,
		customsReference,
		borderCrossing
	} = workflowAddressData;

	const workflowPrice = workflowPriceData?.price;

	const {
		goodsDescription,
		cargoType,
		containerLength,
		containerWidth,
		containerHeight,
		containerTypeLabel,
		sealNumber,
		numberOfPackages,
		grossWeight,
		netWeight,
		goodsVolume,
		isHumid,
		damaged,
		frozen,
		requiresChiller,
		requiresControlledAtmosphere,
		shippingLine,
		vesselName,
		isDropoff,
		dropoffTerminalName,
		isReturn,
		returnDepotName
	} = workflowContainerData;

	return (
		<div className="w-full bg-slate-100 rounded-b-md p-4">
			<div className="border-2 border-slate-300 p-4">
				<div>
					<h2 className="text-xl mb-2">Container & Shipment #:</h2>
					<div className="flex flex-col lg:flex-row gap-4">
						<div className="flex flex-col gap-2 w-fit">
							<h3 className="text-md">Container Number</h3>
							<div className="bg-accent-content py-2 px-4 rounded-md border-accent border-2 ml-2">
								<p className="text-md text-accent">{containerNumber}</p>
							</div>
						</div>
						<div className="flex flex-col gap-2 w-fit">
							<h3 className="text-md">Cargo Reference Number</h3>
							<div className="bg-accent-content py-2 px-4 rounded-md border-accent border-2 ml-2">
								<p className="text-md text-accent">{cargoReferenceNumber}</p>
							</div>
						</div>
						<div className="flex flex-col gap-2 w-fit">
							<h3 className="text-md">Pickup Number</h3>
							<div className="bg-accent-content py-2 px-4 rounded-md border-accent border-2 ml-2">
								<p className="text-md text-accent"> {pickupNumber}</p>
							</div>
						</div>
						<div className="flex flex-col gap-2 w-fit">
							<h3 className="text-md">BOL Number</h3>
							<div className="bg-accent-content py-2 px-4 rounded-md border-accent border-2 ml-2">
								<p className="text-md text-accent">{bolNumber}</p>
							</div>
						</div>
						<div className="flex flex-col gap-2 w-fit">
							<h3 className="text-md">Customs Reference Number</h3>
							<div className="bg-accent-content py-2 px-4 rounded-md border-accent border-2 ml-2">
								<p className="text-md text-accent">{customsReference}</p>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-6 mb-6 border-b-2 border-slate-300" />
				<div className="flex flex-col lg:flex-row">
					<div>
						<h2 className="text-xl mb-2">Pickup address:</h2>
						<div className="ml-28">
							<p>{pickupCompanyName},</p>
							<p>{pickupAddress}</p>
							<p>{pickupContactName}</p>
							<p>Phone: {pickupContactPhone}</p>
							<p>Time: {pickupWindow}</p>
							{pickupAppointmentNeeded && <p>A pickup appointment will be needed</p>}
						</div>
					</div>
					<div>
						<h2 className="text-xl mb-2">Dropoff address:</h2>
						<div className="ml-28">
							<p>{dropoffCompanyName},</p>
							<p>{dropoffAddress}</p>
							<p>{dropoffContactName}</p>
							<p>Phone: {dropoffContactPhone}</p>
							<p>Time: {dropoffWindow}</p>
							{dropOffAppointmentNeeded && <p>A dropoff appointment will be needed</p>}
						</div>
					</div>
				</div>
				<div className="mt-2">
					<h2 className="text-md mb-2">Border Crossing:</h2>
					<div className="ml-28">
						<p>{borderCrossing}</p>
					</div>
				</div>
				<div className="mt-4 mb-4 border-b-2 border-slate-300" />
				<div>
					<h2 className="text-xl mb-2">Pricing</h2>
					<div className="md:ml-28">
						<ShipperWorkflowPricing
							workflowPrice={workflowPrice}
							workflowStatus={workflowStatus}
							handleAcceptPrice={handleAcceptPrice}
							handleDeclinePrice={handleDeclinePrice}
						/>
					</div>
				</div>
				<div className="mt-6 mb-6 border-b-2 border-slate-300" />
				<div>
					<h2 className="text-xl mb-2">Selected Carrier</h2>
					<div className="md:ml-28">
						<div className="card md:w-96 bg-base-100 shadow-2xl border-accent border-2">
							<div className="card-body">
								<h2 className="card-title">
									{selectedCarrier?.companyName}
									<div className="badge badge-secondary">Used Before</div>
								</h2>
								<p>We serve this best in the North American and African regions!</p>

								<div className="card-actions justify-end">
									{selectedCarrier?.areasServiced?.map((areaServiced: string, index: number) => {
										return (
											<div key={index} className="badge badge-outline">
												{areaServiced}
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-6 mb-6 border-b-2 border-slate-300" />
				<div>
					<h2 className="text-xl mb-2">Goods Description:</h2>
					<div className="ml-28">
						<p className="whitespace-pre-wrap">{goodsDescription}</p>
					</div>
				</div>
				<div className="mt-6 mb-6 border-b-2 border-slate-300" />
				<div>
					<h2 className="text-xl mb-2">Shipment and Cargo Details:</h2>
					<div className="flex flex-col gap-2 ml-2">
						<div className="flex gap-2">
							<p>Cargo Type: </p>
							<p>{containerTypeLabel}</p>
						</div>
						<div className="flex gap-2">
							<p>Dimensions: </p>
							<p>
								{containerLength} L x {containerWidth} W x {containerHeight} H
							</p>
						</div>
						<div className="flex gap-2">
							<p>Seal #: </p>
							<p>{sealNumber}</p>
						</div>
						<div className="flex gap-2">
							<p># of packages: </p>
							<p>{numberOfPackages}</p>
						</div>
						<div className="flex gap-2">
							<p>Gross Weight: </p>
							<p>{grossWeight}</p>
						</div>
						<div className="flex gap-2">
							<p>Net Weight: </p>
							<p>{netWeight}</p>
						</div>
						<div className="flex gap-2">
							<p>Goods Volume: </p>
							<p>{goodsVolume || "--"}</p>
						</div>
						<div className="flex gap-2">
							<p>Humidity Control Required?</p>
							<p>{isHumid ? "True" : "False"}</p>
						</div>

						<div className="flex gap-2">
							<p>Carrying Damanaged Items?</p>
							<p>{damaged ? "True" : "False"}</p>
						</div>
						<div className="flex gap-2">
							<p>Carrying Frozen Items?</p>
							<p>{frozen ? "True" : "False"}</p>
						</div>
						<div className="flex gap-2">
							<p>Requires Chiller?</p>
							<p>{requiresChiller ? "True" : "False"}</p>
						</div>
						<div className="flex gap-2">
							<p>Requires Controlled Atmosphere?</p>
							<p>{requiresControlledAtmosphere ? "True" : "False"}</p>
						</div>

						{shippingLine && vesselName && (
							<>
								<div className="flex gap-2 pl-4">
									<p>Shipping Line: </p>
									<p>{shippingLine}</p>
								</div>
								<div className="flex gap-2 pl-4">
									<p>Vessel Name: </p>
									<p>{vesselName}</p>
								</div>
							</>
						)}
						{isDropoff && (
							<div className="flex gap-2 pl-4">
								<p>Dropoff Terminal Name: </p>
								<p>{dropoffTerminalName}</p>
							</div>
						)}
						{isReturn && (
							<div className="flex gap-2 pl-4">
								<p>Return Depot Name: </p>
								<p>{returnDepotName}</p>
							</div>
						)}
					</div>
				</div>
				<div className="mt-6 mb-6 border-b-2 border-slate-300" />
			</div>
		</div>
	);
}
