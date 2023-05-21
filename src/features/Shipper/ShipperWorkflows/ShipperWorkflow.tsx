import ShipperWorkflowPricing from "./ShipperWorkflowPricing";

import type { WorkflowType } from "@/features/Shipper/ShipperWorkflows/types";

interface WorkflowProps {
	workflow: WorkflowType;
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

	console.log("selectedCarrier", selectedCarrier);

	// maybe i should get workflow notes here because i want up to date messages

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
					<h2 className="text-xl mb-2">Shipment and Cargo Info:</h2>
					<div>
						<table className="table-auto md:table ml-auto mr-auto">
							<thead>
								<tr>
									<th className="text-accent bg-accent-content md:text-accent md:bg-accent-content">
										Field
									</th>
									<th className="text-accent bg-accent-content md:text-accent md:bg-accent-content">
										Value
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Cargo Type</td>
									<td>{containerTypeLabel}</td>
								</tr>
								<tr>
									<td>Dimensions</td>
									<td>
										{containerLength} x {containerWidth} x {containerHeight}
									</td>
								</tr>
								<tr>
									<td>Seal Number</td>
									<td>{sealNumber}</td>
								</tr>
								<tr>
									<td># of packages</td>
									<td>{numberOfPackages}</td>
								</tr>
								<tr>
									<td>Gross Weight</td>
									<td>{grossWeight}</td>
								</tr>
								<tr>
									<td>Net Weight</td>
									<td>{netWeight}</td>
								</tr>
								<tr>
									<td>Goods Volume</td>
									<td>{goodsVolume || "--"}</td>
								</tr>
								<tr>
									<td>Humidity Control Required</td>
									<td>{isHumid ? "True" : "False"}</td>
								</tr>
								<tr>
									<td>Damaged Items</td>
									<td>{damaged ? "True" : "False"}</td>
								</tr>
								<tr>
									<td>Frozen Items</td>
									<td>{frozen ? "True" : "False"}</td>
								</tr>
								<tr>
									<td>Requires Chiller</td>
									<td>{requiresChiller ? "True" : "False"}</td>
								</tr>
								<tr>
									<td>Requires Controlled Atmosphere</td>
									<td>{requiresControlledAtmosphere ? "True" : "False"}</td>
								</tr>
								{shippingLine && vesselName && (
									<>
										<tr>
											<td>Shipping Line</td>
											<td>{shippingLine}</td>
										</tr>
										<tr>
											<td>Vessel Name</td>
											<td>{vesselName}</td>
										</tr>
									</>
								)}
								{isDropoff && (
									<tr>
										<td>Dropoff Terminal Name</td>
										<td>{dropoffTerminalName}</td>
									</tr>
								)}
								{isReturn && (
									<tr>
										<td>Return Depot Name</td>
										<td>{returnDepotName}</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
					<div></div>
				</div>
				<div className="mt-6 mb-6 border-b-2 border-slate-300" />
			</div>
		</div>
	);
}
