import Image from "next/image";
import Link from "next/link";

import type { CarrierWorkflowType } from "@/features/Carrier/CarrierWorkflows/types";

interface CarrierWorkflowProps {
	workflow: CarrierWorkflowType;
	children: JSX.Element;
}

export default function CarrierWorkflow({ workflow, children }: CarrierWorkflowProps) {
	const workflowAddressData = workflow?.workflowAddressData;
	const workflowContainerData = workflow?.workflowContainerData;

	const shipperNotes = workflow?.shipperNotes;
	const carrierNotes = workflow?.carrierNotes;
	const uploadedFiles = workflow?.fileUrls;

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

	const {
		goodsDescription,
		cargoType,
		containerTypeLabel,
		containerLength,
		containerWidth,
		containerHeight,
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
							<h3 className="text-md">Cargo Reference Number</h3>
							<div className="bg-accent-content py-2 px-4 rounded-md border-accent border-2 ml-2">
								<p className="text-md text-accent">{cargoReferenceNumber}</p>
							</div>
						</div>
						<div className="flex flex-col gap-2 w-fit">
							<h3 className="text-md">Pickup Number</h3>
							<div className="bg-accent-content py-2 px-4 rounded-md border-accent border-2 ml-2">
								<p className="text-md text-accent">{pickupNumber}</p>
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
					<h2 className="text-xl mb-2">Border Crossing:</h2>
					<div className="ml-28">
						<p>{borderCrossing}</p>
					</div>
				</div>
				<div className="mt-4 mb-4 border-b-2 border-slate-300" />

				<div>
					<h2 className="text-xl mb-2">Pricing</h2>
					{children}
				</div>

				<div className="mt-6 mb-6 border-b-2 border-slate-300" />

				<div>
					<h2 className="text-xl mb-2">Goods Description:</h2>
					<div className="ml-2 border-4 rounded-md p-4">
						<p className="whitespace-pre-wrap">{goodsDescription}</p>
					</div>
				</div>
				<div className="mt-6 mb-6 border-b-2 border-slate-300" />

				<div>
					<h2 className="text-xl mb-2">Shipment and Cargo Details:</h2>
					<div className="flex flex-col gap-2 ml-2">
						<div className="flex gap-2 align-middle items-center">
							<p className="bg-accent text-slate-100 p-2 rounded-md">Cargo Type: </p>
							<p className="text-primary">{containerTypeLabel}</p>
						</div>
						<div className="flex gap-2 align-middle items-center">
							<p className="bg-accent text-slate-100 p-2 rounded-md">Dimensions: </p>
							<p>
								{containerLength} L x {containerWidth} W x {containerHeight} H
							</p>
						</div>
						<div className="flex gap-2 align-middle items-center">
							<p className="bg-accent text-slate-100 p-2 rounded-md">Seal #: </p>
							<p>{sealNumber}</p>
						</div>
						<div className="flex gap-2 align-middle items-center">
							<p className="bg-accent text-slate-100 p-2 rounded-md"># of packages: </p>
							<p>{numberOfPackages}</p>
						</div>
						<div className="flex gap-2 align-middle items-center">
							<p className="bg-accent text-slate-100 p-2 rounded-md">Gross Weight: </p>
							<p>{grossWeight}</p>
						</div>
						<div className="flex gap-2 align-middle items-center">
							<p className="bg-accent text-slate-100 p-2 rounded-md">Net Weight: </p>
							<p>{netWeight}</p>
						</div>
						<div className="flex gap-2 align-middle items-center">
							<p className="bg-accent text-slate-100 p-2 rounded-md">Goods Volume: </p>
							<p>{goodsVolume || "--"}</p>
						</div>
						<div className="flex gap-2 align-middle items-center">
							<p className="bg-accent text-slate-100 p-2 rounded-md">Humidity Control Required?</p>
							<p>{isHumid ? "True" : "False"}</p>
						</div>

						<div className="flex gap-2 align-middle items-center">
							<p className="bg-accent text-slate-100 p-2 rounded-md">Carrying Damanaged Items?</p>
							<p>{damaged ? "True" : "False"}</p>
						</div>
						<div className="flex gap-2 align-middle items-center">
							<p className="bg-accent text-slate-100 p-2 rounded-md">Carrying Frozen Items?</p>
							<p>{frozen ? "True" : "False"}</p>
						</div>
						<div className="flex gap-2 align-middle items-center">
							<p className="bg-accent text-slate-100 p-2 rounded-md">Requires Chiller?</p>
							<p>{requiresChiller ? "True" : "False"}</p>
						</div>
						<div className="flex gap-2 align-middle items-center">
							<p className="bg-accent text-slate-100 p-2 rounded-md">
								Requires Controlled Atmosphere?
							</p>
							<p>{requiresControlledAtmosphere ? "True" : "False"}</p>
						</div>

						{shippingLine && vesselName && (
							<>
								<div className="flex gap-2 align-middle items-center">
									<p className="bg-accent text-slate-100 p-2 rounded-md">Shipping Line: </p>
									<p>{shippingLine}</p>
								</div>
								<div className="flex gap-2 align-middle items-center">
									<p className="bg-accent text-slate-100 p-2 rounded-md">Vessel Name: </p>
									<p>{vesselName}</p>
								</div>
							</>
						)}
						{isDropoff && (
							<div className="flex gap-2 align-middle items-center">
								<p className="bg-accent text-slate-100 p-2 rounded-md">Dropoff Terminal Name: </p>
								<p>{dropoffTerminalName}</p>
							</div>
						)}
						{isReturn && (
							<div className="flex gap-2 align-middle items-center">
								<p className="bg-accent text-slate-100 p-2 rounded-md">Return Depot Name: </p>
								<p>{returnDepotName}</p>
							</div>
						)}
					</div>
				</div>
				<div className="mt-6 mb-6 border-b-2 border-slate-300" />

				<div>
					<h2 className="text-xl">Delivery Notes</h2>
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
					<div className="bg-slate-100">
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
