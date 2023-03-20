import Image from "next/image";
import Link from "next/link";

import type { WorkflowType } from "@/features/Shipper/ShipperWorkflows/types";

interface WorkflowProps {
	workflow: WorkflowType;
}

export default function ShipperWorkflow({ workflow }: WorkflowProps) {
	const workflowAddressData = workflow?.workflowAddressData;
	const workflowContainerData = workflow?.workflowContainerData;
	const workflowPriceData = workflow?.workflowPriceData;
	const shipperNotes = workflow?.shipperNotes;
	const carrierNotes = workflow?.carrierNotes;
	const uploadedFiles = workflow?.fileUrls;
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
		shipmentNumber,
		bolNumber,
		t1Number,
		borderCrossing
	} = workflowAddressData;

	const workflowPrice = workflowPriceData?.price;

	// if in triage and no price, means workflow was just created "Waiting for price from carrier"
	// if in "Counter Price" that means either "its my turn to counter" or its this users time to counter

	const {
		goodsDescription,
		cargoType,
		length,
		width,
		height,
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

	const imageFileTypes = ["image/png", "image/jpeg", "image/jpg"];
	// const imageFiles = uploadedFiles?.filter((file) => imageFileTypes.includes(file.type));
	// const nonImageFiles = uploadedFiles?.filter((file) => !imageFileTypes.includes(file.type));

	return (
		<div className="w-full bg-slate-100 rounded-b-md p-4 mb-4">
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
							<h3 className="text-md">Shipping Number</h3>
							<div className="bg-accent-content py-2 px-4 rounded-md border-accent border-2 ml-2">
								<p className="text-md text-accent">{shipmentNumber}</p>
							</div>
						</div>
						<div className="flex flex-col gap-2 w-fit">
							<h3 className="text-md">BOL Number</h3>
							<div className="bg-accent-content py-2 px-4 rounded-md border-accent border-2 ml-2">
								<p className="text-md text-accent">{bolNumber}</p>
							</div>
						</div>
						<div className="flex flex-col gap-2 w-fit">
							<h3 className="text-md">T1 Reference Number</h3>
							<div className="bg-accent-content py-2 px-4 rounded-md border-accent border-2 ml-2">
								<p className="text-md text-accent">{t1Number}</p>
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
					<div className="ml-28">
						{useCustomPricing ? (
							<p>Price: {customPrice}</p>
						) : (
							<p>The price has already been determined by your team</p>
						)}
					</div>
				</div>
				<div className="mt-6 mb-6 border-b-2 border-slate-300" />

				{/* TODO: add details about the carrier */}
				<h2 className="text-xl mb-2">Selected Carrier</h2>
				<div className="flex flex-col items-center justify-center">
					<div className="card w-96 bg-base-100 shadow-xl">
						<div className="card-body">
							<h2 className="card-title">
								{selectedCarrier?.companyName}
								<div className="badge badge-secondary">Used Before</div>
							</h2>
							<p>We serve this best in the North American and African regions!</p>

							{/* TODO change this to a better label value */}
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
				<div className="mt-6 mb-6 border-b-2 border-slate-300" />

				<div>
					<h2 className="text-xl mb-2">Goods Description:</h2>
					<div className="ml-28">
						<p className="whitespace-pre-wrap">{goodsDescription}</p>
					</div>
				</div>
				<div className="mt-6 mb-6 border-b-2 border-slate-300" />

				{/* TODO make this responsive */}
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
									<td>{cargoType}</td>
								</tr>
								<tr>
									<td>Dimensions</td>
									<td>
										{length} x {width} x {height}
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
									<td>{goodsVolume}</td>
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

				<div>
					<h2 className="text-xl">Shipper Notes</h2>
					<div className="ml-28">
						<p>{shipperNotes || "n/a"}</p>
					</div>
				</div>
				<div className="mt-6 mb-6 border-b-2 border-slate-300" />

				<div>
					<h2 className="text-xl">Carrier Notes</h2>
					<div className="ml-28">
						<p>{carrierNotes || "n/a"}</p>
					</div>
				</div>
				<div className="mt-6 mb-6 border-b-2 border-slate-300" />

				{uploadedFiles && uploadedFiles.length > 0 && (
					<div>
						<h2 className="text-xl mb-4">Your uploaded files: </h2>
						<div className="flex flex-col gap-4">
							{uploadedFiles?.map((file, key) => {
								return (
									<Link href={file.url} key={key} target="_blank">
										<div className="flex flex-row border-b-2 p-4 border-slate-300 gap-4">
											<Image src={file.url} width={48} height={48} alt={`image: ${key}`} />
											<div className="flex justify-center items-center">
												<h2>{file.name}</h2>
											</div>
										</div>
									</Link>
								);
							})}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}