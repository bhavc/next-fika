import { useForm, SubmitHandler } from "react-hook-form";
import IconRight from "public/svg/arrow-right.svg";

export type WorkflowFormAddressInputs = {
	containerNumber: string;
	shipmentNumber: string;
	clearance: string;
	pickupCompanyName: string;
	pickupAddress: string;
	pickupCity: string;
	pickupProvince: string;
	pickupCountry: string;
	pickupContactName: string;
	pickupContactPhone: string;
	pickupWindow: string;
	pickupAppointmentNeeded: boolean;
	dropoffCompanyName: string;
	dropoffAddress: string;
	dropoffCity: string;
	dropoffProvince: string;
	dropoffCountry: string;
	dropoffContactName: string;
	dropoffContactPhone: string;
	dropoffWindow: string;
	dropOffAppointmentNeeded: boolean;
};

interface NewWorkflowFormAddressProps {
	handleSubmitWorkflow: (data: WorkflowFormAddressInputs) => void;
	workflowFormAddressState: WorkflowFormAddressInputs;
}

export default function NewWorkflowFormAddress({
	handleSubmitWorkflow,
	workflowFormAddressState
}: NewWorkflowFormAddressProps) {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<WorkflowFormAddressInputs>({
		defaultValues: {
			containerNumber: workflowFormAddressState.containerNumber,
			shipmentNumber: workflowFormAddressState.shipmentNumber,
			clearance: workflowFormAddressState.clearance,
			pickupCompanyName: workflowFormAddressState.pickupCompanyName,
			pickupAddress: workflowFormAddressState.pickupAddress,
			pickupCity: workflowFormAddressState.pickupCity,
			pickupProvince: workflowFormAddressState.pickupProvince,
			pickupCountry: workflowFormAddressState.pickupCountry,
			pickupContactName: workflowFormAddressState.pickupContactName,
			pickupContactPhone: workflowFormAddressState.pickupContactPhone,
			pickupWindow: workflowFormAddressState.pickupWindow,
			pickupAppointmentNeeded: workflowFormAddressState.pickupAppointmentNeeded,
			dropoffCompanyName: workflowFormAddressState.dropoffCompanyName,
			dropoffAddress: workflowFormAddressState.dropoffAddress,
			dropoffCity: workflowFormAddressState.dropoffCity,
			dropoffProvince: workflowFormAddressState.dropoffProvince,
			dropoffCountry: workflowFormAddressState.dropoffCountry,
			dropoffContactName: workflowFormAddressState.dropoffContactName,
			dropoffContactPhone: workflowFormAddressState.dropoffContactPhone,
			dropoffWindow: workflowFormAddressState.dropoffWindow,
			dropOffAppointmentNeeded: workflowFormAddressState.dropOffAppointmentNeeded
		}
	});

	const onSubmit: SubmitHandler<WorkflowFormAddressInputs> = (data) => {
		handleSubmitWorkflow(data);
	};

	return (
		<div className="w-full bg-slate-100 rounded-b-md p-4">
			<form id="newWorkflowFormAddress" onSubmit={handleSubmit(onSubmit)} className="w-full">
				<div className="mb-2 grid grid-cols-2 gap-4">
					<div>
						<label>Container Number*</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="TEMU2151151"
								className={`input w-full ${
									errors.containerNumber ? "border-error" : "border-neutral"
								}`}
								{...register("containerNumber", { required: true })}
							/>
						</div>
					</div>

					<div>
						<label>Shipment Number</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="S104697223"
								className={`input w-full ${
									errors.shipmentNumber ? "border-error" : "border-neutral"
								}`}
								{...register("shipmentNumber", { required: false })}
							/>
						</div>
					</div>
				</div>

				<div className="divider" />

				<h2 className="prose prose-2xl">Pickup</h2>

				<div className="mb-2">
					<div>
						<label>Company Name*</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="Canadian National Railway"
								className={`input w-full ${
									errors.pickupCompanyName ? "border-error" : "border-neutral"
								}`}
								{...register("pickupCompanyName", { required: true })}
							/>
						</div>
					</div>
				</div>
				<div className="mb-2">
					<div>
						<label>Address*</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="76 Intermodal Dr."
								className={`input w-full ${
									errors.pickupAddress ? "border-error" : "border-neutral"
								}`}
								{...register("pickupAddress", { required: true })}
							/>
						</div>
					</div>
				</div>
				<div className="mb-2 grid grid-cols-3 gap-2">
					<div>
						<label>City*</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="Brampton"
								className={`input w-full ${errors.pickupCity ? "border-error" : "border-neutral"}`}
								{...register("pickupCity", { required: true })}
							/>
						</div>
					</div>
					<div>
						<label>Province*</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="Ontario"
								className={`input w-full ${
									errors.pickupProvince ? "border-error" : "border-neutral"
								}`}
								{...register("pickupProvince", { required: true })}
							/>
						</div>
					</div>
					<div>
						<label>Country*</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="Canada"
								className={`input w-full ${
									errors.pickupCountry ? "border-error" : "border-neutral"
								}`}
								{...register("pickupCountry", { required: true })}
							/>
						</div>
					</div>
				</div>

				<h2 className="prose prose-xl">Contact</h2>
				<div className="mb-2 grid grid-cols-2 gap-2">
					<div>
						<label>Name*</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="Gloria Zhuang"
								className={`input w-full ${
									errors.pickupContactName ? "border-error" : "border-neutral"
								}`}
								{...register("pickupContactName", { required: true })}
							/>
						</div>
					</div>

					<div>
						<label>Phone*</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="1234567890"
								className={`input w-full ${
									errors.pickupContactPhone ? "border-error" : "border-neutral"
								}`}
								{...register("pickupContactPhone", { required: true })}
							/>
						</div>
					</div>
				</div>
				<div className="mb-2 grid grid-cols-2 gap-2">
					<div>
						<label>Pickup window*</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="6am - 9pm"
								className={`input w-full ${
									errors.pickupWindow ? "border-error" : "border-neutral"
								}`}
								{...register("pickupWindow", { required: true })}
							/>
						</div>
					</div>
					<div className="flex flex-row gap-4 ml-6 mt-6">
						<label className="label cursor-pointer">Appointment Needed</label>
						<div className="mt-4 flex rounded-md shadow-sm">
							<input
								type="checkbox"
								className="checkbox"
								{...register("pickupAppointmentNeeded", { required: false })}
							/>
						</div>
					</div>
				</div>

				<div className="divider" />

				<h2 className="prose prose-2xl">Dropoff</h2>
				<div className="mb-2">
					<div>
						<label>Company Name*</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="Canadian National Railway"
								className={`input w-full ${
									errors.dropoffCompanyName ? "border-error" : "border-neutral"
								}`}
								{...register("dropoffCompanyName", { required: true })}
							/>
						</div>
					</div>
				</div>
				<div className="mb-2">
					<div>
						<label>Address*</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="76 Intermodal Dr."
								className={`input w-full ${
									errors.dropoffAddress ? "border-error" : "border-neutral"
								}`}
								{...register("dropoffAddress", { required: true })}
							/>
						</div>
					</div>
				</div>
				<div className="mb-2 grid grid-cols-3 gap-2">
					<div>
						<label>City*</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="Brampton"
								className={`input w-full ${errors.dropoffCity ? "border-error" : "border-neutral"}`}
								{...register("dropoffCity", { required: true })}
							/>
						</div>
					</div>
					<div>
						<label>Province*</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="Ontario"
								className={`input w-full ${
									errors.dropoffProvince ? "border-error" : "border-neutral"
								}`}
								{...register("dropoffProvince", { required: true })}
							/>
						</div>
					</div>
					<div>
						<label>Country*</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="Canada"
								className={`input w-full ${
									errors.dropoffCountry ? "border-error" : "border-neutral"
								}`}
								{...register("dropoffCountry", { required: true })}
							/>
						</div>
					</div>
				</div>

				<h2 className="prose prose-xl">Contact</h2>
				<div className="mb-2 grid grid-cols-2 gap-2">
					<div>
						<label>Name*</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="Gloria Zhuang"
								className={`input w-full ${
									errors.dropoffContactName ? "border-error" : "border-neutral"
								}`}
								{...register("dropoffContactName", { required: true })}
							/>
						</div>
					</div>

					<div>
						<label>Phone*</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="1234567890"
								className={`input w-full ${
									errors.dropoffContactPhone ? "border-error" : "border-neutral"
								}`}
								{...register("dropoffContactPhone", { required: true })}
							/>
						</div>
					</div>
				</div>
				<div className="mb-2 grid grid-cols-2 gap-2">
					<div>
						<label>Dropoff Window*</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="7am - 6pm"
								className={`input w-full ${
									errors.dropoffWindow ? "border-error" : "border-neutral"
								}`}
								{...register("dropoffWindow", { required: true })}
							/>
						</div>
					</div>
					<div className="flex flex-row gap-4 ml-6 mt-6">
						<label className="label cursor-pointer">Appointment Needed</label>
						<div className="mt-4 flex rounded-md shadow-sm">
							<input
								type="checkbox"
								className="checkbox"
								{...register("dropOffAppointmentNeeded", { required: false })}
							/>
						</div>
					</div>
				</div>
			</form>
			<div className="flex justify-end">
				<button
					className="btn btn-circle bg-primary mt-10"
					form="newWorkflowFormAddress"
					type="submit"
				>
					{/* <Image src={IconRight} width={24} height={24} alt="arrow-next" color="white" /> */}
					<IconRight />
				</button>
			</div>

			{/* <div className="card w-80 bg-slate-50 shadow-xl">
				<div className="card-body">
					<form id="newWorkflowForm" onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-2">
							<label>Cargo Type</label>
							<div className={"mt-1 flex rounded-md shadow-sm"}>
								<select
									className={`select w-full max-w-s ${
										errors.cargoType ? "border-error" : "border-inherit"
									}`}
									defaultValue=""
									{...register("cargoType", { required: "Cargo Type required" })}
								>
									<option value="" disabled>
										Choose your cargo type
									</option>
									<option value="Container">Container</option>
									<option value="FCL">FCL</option>
									<option value="LCL">LCL</option>
									<option value="Reefer">Reefer</option>
									<option value="Flat bed">Flat bed</option>
									<option value="OOG">OOG</option>
									<option value="Fragile">Fragile</option>
									<option value="Hazardous">Hazardous</option>
									<option value="Bulk">Bulk</option>
								</select>
							</div>
						</div>

						<div className="mb-2">
							<label>Clearance</label>
							<div className={"mt-1 flex rounded-md shadow-sm"}>
								<select
									className={`select w-full max-w-s ${
										errors.clearance ? "border-error" : "border-none"
									}`}
									defaultValue=""
									{...register("clearance", { required: "Clearance required" })}
								>
									<option value="" disabled>
										Choose clearance
									</option>
									<option value="Trucker Bond">Trucker Bond</option>
									<option value="Client Bond">Client Bond</option>
								</select>
							</div>
						</div>

						<div className="mb-2">
							<label>Certifications Required</label>
							<div className={"mt-1 flex rounded-md shadow-sm"}>
								<select
									className={`select w-full max-w-s ${
										errors.certificationRequirements ? "border-error" : "border-none"
									}`}
									defaultValue=""
									{...register("certificationRequirements", {
										required: "Certifications required"
									})}
								>
									<option value="" disabled>
										Choose your Certifications
									</option>
									<option value="Cert1">Certification 1</option>
									<option value="Cert 2">Certification 2</option>
								</select>
							</div>
						</div>

						<div className="flex justify-end">
							<button className="btn btn-circle bg-primary mt-10">
								<Image src={IconRight} width={24} height={24} alt="arrow-next" color="white" />
							</button>
						</div>
					</form>
				</div>
			</div> */}
		</div>
	);
}
