import { WorkflowFormAddressInputs } from "@/features/Client/Workflow/NewWorkflowFormAddress";
import { WorkflowFormContainerDetailsInputs } from "@/features/Client/Workflow/NewWorkflowFormContainerDetails";
import { WorkflowFormNotesInputs } from "@/features/Client/Workflow/NewWorkflowFormNotes";
import IconRight from "public/svg/arrow-right.svg";
import IconLeft from "public/svg/arrow-left.svg";

interface NewWorkflowFormNotesProps {
	workflowFormAddressState: WorkflowFormAddressInputs;
	workflowFormContainerDetailsState: WorkflowFormContainerDetailsInputs;
	workflowFormNotesState: WorkflowFormNotesInputs;
	handleGoBack: () => void;
}

export default function NewWorkflowFormReview({
	workflowFormAddressState,
	workflowFormContainerDetailsState,
	workflowFormNotesState,
	handleGoBack
}: NewWorkflowFormNotesProps) {
	console.log("workflowFormAddressState", workflowFormAddressState);
	console.log("workflowFormContainerDetailsState", workflowFormContainerDetailsState);
	console.log("workflowFormNotesState", workflowFormNotesState);

	const {
		containerNumber,
		dropOffAppointmentNeeded,
		dropoffAddress,
		dropoffCity,
		dropoffCompanyName,
		dropoffContactName,
		dropoffContactPhone,
		dropoffCountry,
		dropoffProvince,
		dropoffWindow,
		pickupAddress,
		pickupAppointmentNeeded,
		pickupCity,
		pickupCompanyName,
		pickupContactName,
		pickupContactPhone,
		pickupCountry,
		pickupProvince,
		pickupWindow,
		shipmentNumber
	} = workflowFormAddressState;

	const {
		useCustomPricing,
		customPrice,
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
		vessellName
	} = workflowFormContainerDetailsState;

	const { notes } = workflowFormNotesState;

	return (
		<div className="w-full bg-slate-100 rounded-b-md p-4 mb-4">
			<h1 className="text-2xl mt-2 text-center rounded-t-md p-4">Review your order</h1>
			<div className="p-4">
				<h2 className="text-xl">Container & Shipment #:</h2>
				<div className="flex flex-col ml-28">
					<div className="flex flex-row gap-4">
						<h3 className="text-lg">Container Number</h3>
						<p className="text-md">{containerNumber}</p>
					</div>
					<div className="flex flex-row gap-4">
						<h3 className="text-lg">Shipping Number:</h3>
						<p className="text-lg">{shipmentNumber}</p>
					</div>
				</div>
			</div>
			<div className="divider" />
			<div className="p-4 grid grid-cols-2">
				<div>
					<h2 className="text-xl">Pickup:</h2>
					<div className="ml-28">
						<p>
							{pickupCompanyName}, {pickupAddress}
						</p>
						<p>
							{pickupCity}, {pickupProvince}, {pickupCountry}
						</p>
						<p>{pickupContactName}</p>
						<p>Phone: {pickupContactPhone}</p>
						<p>Time: {pickupWindow}</p>
						{pickupAppointmentNeeded && <p>A pickup appointment will be needed</p>}
					</div>
				</div>
				<div>
					<h2 className="text-xl">Dropoff: </h2>
					<div className="ml-28">
						<p>
							{dropoffCompanyName}, {dropoffAddress}
						</p>
						<p>
							{dropoffCity}, {dropoffProvince}, {dropoffCountry}
						</p>
						<p>{dropoffContactName}</p>
						<p>Phone: {dropoffContactPhone}</p>
						<p>Time: {dropoffWindow}</p>
						{dropOffAppointmentNeeded && <p>A dropoff appointment will be needed</p>}
					</div>
				</div>
			</div>
			<div className="divider" />

			<div className="p-4">
				<h2 className="text-xl">Pricing</h2>
				<div className="ml-28">
					{useCustomPricing ? (
						<p>Price: {customPrice}</p>
					) : (
						<p>The price has already been determined by your trucking team</p>
					)}
				</div>
			</div>
			<div className="divider" />

			<div className="p-4">
				<h2 className="text-xl">Shipment and Cargo Info:</h2>
				<div className="grid grid-cols-2">
					<div>
						<p>Description:</p>
						<p className="whitespace-pre-wrap">{goodsDescription}</p>
					</div>
					<div>
						<div>
							<p>Cargo Type: {cargoType}</p>
						</div>
						<div>
							<p>
								Dimensions: {length} x {width} x {height}
							</p>
						</div>
						<div>
							<p>Seal Number: {sealNumber}</p>
						</div>
						<div>
							<p># of packages: {numberOfPackages}</p>
						</div>
						<div>
							<p>Gross Weight: {grossWeight}</p>
						</div>
						<div>
							<p>Net Weight: {netWeight}</p>
						</div>
						<div>
							<p>Goods Volume: {goodsVolume}</p>
						</div>
						<div>
							<p>Humidity Control Required: {isHumid ? "True" : "False"}</p>
						</div>
						<div>
							<p>Damaged Items: {damaged ? "True" : "False"}</p>
						</div>
						<div>
							<p>Frozen Items: {frozen ? "True" : "False"}</p>
						</div>
						<div>
							<p>Requires Chiller: {requiresChiller ? "True" : "False"}</p>
						</div>
						<div>
							<p>
								Requires Controlled Atmosphere: {requiresControlledAtmosphere ? "True" : "False"}
							</p>
						</div>
					</div>
				</div>
				<div>
					<div>
						<p>Shipping Line: {shippingLine}</p>
					</div>
					<div>
						<p>Vessell Name: {vessellName}</p>
					</div>
				</div>
			</div>
			<div className="divider" />

			<div className="p-4">
				<h2 className="text-xl">Delivery Notes</h2>
				<div>
					<p>{notes || "n/a"}</p>
				</div>
			</div>

			<div className="flex flex-row justify-between">
				<div className="justify-start">
					<button className="btn btn-circle bg-primary mt-10" onClick={handleGoBack}>
						<IconLeft />
					</button>
				</div>
				<div className="justify-end">
					<button className="btn btn-lg bg-primary mt-10" type="submit">
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}
