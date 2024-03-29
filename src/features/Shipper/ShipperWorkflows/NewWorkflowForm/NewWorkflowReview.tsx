import { WorkflowFormAddressInputs } from "@/features/Shipper/ShipperWorkflows/NewWorkflowForm/NewWorkflowFormAddress";
import { WorkflowFormContainerDetailsInputs } from "@/features/Shipper/ShipperWorkflows/NewWorkflowForm/NewWorkflowFormContainerPriceDetails";
import { WorkflowFormNotesInputs } from "@/features/Shipper/ShipperWorkflows/NewWorkflowForm/NewWorkflowFormNotes";

import type { UserCarrier } from "../../../Carrier/UserCarrier/types";
import type { WorkflowFormPriceInputs } from "@/features/Shipper/ShipperWorkflows/NewWorkflowForm/NewWorkflowFormContainerPriceDetails";

import Image from "next/image";
import Link from "next/link";
import IconLeft from "public/svg/arrow-left.svg";
import PDFIcon from "public/svg/PDF_file_icon.svg";
import TextIcon from "public/svg/file-text.svg";

interface NewWorkflowFormNotesProps {
	workflowFormAddressState: WorkflowFormAddressInputs;
	workflowFormContainerDetailsState: WorkflowFormContainerDetailsInputs;
	workflowFormNotesState: WorkflowFormNotesInputs;
	workflowFormPriceState: WorkflowFormPriceInputs;
	selectedCarrier?: UserCarrier;
	handleGoBack: () => void;
	handleSubmit: () => void;
	uploadedFiles: any[];
}

export default function NewWorkflowFormReview({
	workflowFormAddressState,
	workflowFormContainerDetailsState,
	workflowFormNotesState,
	workflowFormPriceState,
	selectedCarrier,
	handleGoBack,
	handleSubmit,
	uploadedFiles
}: NewWorkflowFormNotesProps) {
	const {
		containerNumber,
		dropOffAppointmentNeeded,
		pickupNumber,
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
		bolNumber,
		customsReference,
		borderCrossing
	} = workflowFormAddressState;

	const { useCustomPricing, customPrice } = workflowFormPriceState;

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
	} = workflowFormContainerDetailsState;

	const { shipperNotes } = workflowFormNotesState;

	const imageFileTypes = ["image/png", "image/jpeg", "image/jpg"];
	const imageFiles = uploadedFiles.filter((file) => imageFileTypes.includes(file.type));
	const nonImageFiles = uploadedFiles.filter((file) => !imageFileTypes.includes(file.type));

	return (
		<div className="w-full bg-slate-100 rounded-b-md p-4 mb-4">
			<h1 className="text-2xl text-left rounded-t-md mb-4 underline">Review your order</h1>

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
						{cargoReferenceNumber && (
							<div className="flex flex-col gap-2 w-fit">
								<h3 className="text-md">Cargo Reference Number</h3>
								<div className="bg-accent-content py-2 px-4 rounded-md border-accent border-2 ml-2">
									<p className="text-md text-accent">{cargoReferenceNumber}</p>
								</div>
							</div>
						)}

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
					<div className="ml-2">
						{useCustomPricing ? (
							<div className="stats shadow-2xl border-accent border-2">
								<div className="stat">
									<div className="stat-title">Total Price</div>
									<div className="stat-value text-primary">${customPrice} USD</div>
									<div className="stat-desc">to move your shipment</div>
								</div>
							</div>
						) : (
							<p>
								The price has already been agreed to by you and the carrier. The price will be
								updated once the carrier adds the price
							</p>
						)}
					</div>
				</div>
				<div className="mt-6 mb-6 border-b-2 border-slate-300" />

				{/* TODO: add details about the carrier */}
				<h2 className="text-xl mb-2">Selected Carrier</h2>
				<div className="flex flex-col ml-2 justify-center">
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
					<div className="ml-2">
						<p className="whitespace-pre-wrap">{goodsDescription}</p>
					</div>
				</div>
				<div className="mt-6 mb-6 border-b-2 border-slate-300" />

				<div>
					<h2 className="text-xl mb-2">Shipment and Cargo Details:</h2>
					<div className="flex flex-col gap-2 ml-2">
						<div className="flex gap-2 align-middle items-center">
							<p className="bg-accent text-slate-100 p-2 rounded-md">Cargo Type: </p>
							<p>{containerTypeLabel}</p>
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
					<div className="ml-2">
						<p>{shipperNotes || "n/a"}</p>
					</div>
				</div>
				<div className="mt-6 mb-6 border-b-2 border-slate-300" />

				{uploadedFiles && uploadedFiles.length > 0 && (
					<div>
						<h2 className="text-xl mb-4">Your uploaded files: </h2>
						<div className="flex flex-col gap-4">
							{imageFiles?.map((file, key) => {
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
						<div className="flex flex-col gap-4">
							{nonImageFiles?.map((file, key) => {
								return (
									<Link href={file.url} key={key} target="_blank">
										<div className="flex flex-row border-b-2 p-4 border-slate-300 gap-4">
											{file.type === "application/pdf" ? (
												<PDFIcon height={48} width={48} />
											) : (
												<TextIcon height={48} width={48} />
											)}

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

			<div className="flex flex-row justify-between">
				<div className="justify-start">
					<button className="btn btn-circle bg-primary mt-10" onClick={handleGoBack}>
						<IconLeft />
					</button>
				</div>
				<div className="justify-end">
					<button className="btn btn-lg bg-primary mt-10" onClick={handleSubmit}>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}
