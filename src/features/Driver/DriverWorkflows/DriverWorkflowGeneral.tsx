import { WorkflowAddressDataType } from "./types";

export default function DriverWorflowGeneral({
	workflowAddressData
}: {
	workflowAddressData: WorkflowAddressDataType;
}) {
	const {
		cargoReferenceNumber,
		bolNumber,
		pickupNumber,
		pickupCompanyName,
		pickupAddress,
		pickupWindow,
		pickupAppointmentNeeded,
		pickupContactName,
		pickupContactPhone,
		dropoffCompanyName,
		dropoffAddress,
		dropoffWindow,
		dropOffAppointmentNeeded,
		dropoffContactName,
		dropoffContactPhone
	} = workflowAddressData;

	return (
		<div className="card-body">
			<p className="font-bold">Shipment #: {cargoReferenceNumber}</p>
			<p className="font-bold">BOL #: {bolNumber}</p>
			<p className="font-bold">Pickup #: {pickupNumber}</p>

			<div className="border-2 my-2" />

			<div className="flex flex-col">
				<p className="font-bold">Pickup Company Name</p>
				<p>{pickupCompanyName}</p>
				<p className="font-bold">Pickup Address</p>
				<p>{pickupAddress}</p>
				<p className="font-bold">Pickup Window</p>
				<p>{pickupWindow}</p>
				{pickupAppointmentNeeded && (
					<p className="italic">
						Contact {pickupContactName}, {pickupContactPhone} when you&apos;ve arrived
					</p>
				)}
			</div>
			<div className="border-2 my-2" />

			<div className="flex flex-col">
				<p className="font-bold">Dropoff Company Name</p>
				<p>{dropoffCompanyName}</p>
				<p className="font-bold">Dropoff Address</p>
				<p>{dropoffAddress}</p>
				<p className="font-bold">Dropoff Window</p>
				<p>{dropoffWindow}</p>
				{dropOffAppointmentNeeded && (
					<p className="italic">
						Contact {dropoffContactName}, {dropoffContactPhone} when you&apos;ve arrived
					</p>
				)}
			</div>
		</div>
	);
}
