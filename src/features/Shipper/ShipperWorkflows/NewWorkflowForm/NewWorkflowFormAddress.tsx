import { useForm, SubmitHandler, Controller } from "react-hook-form";

import GoogleAddressAutocomplete from "@/components/GoogleAddressAutocomplete/GoogleAddressAutocomplete";

import IconRight from "public/svg/arrow-right.svg";

export type WorkflowFormAddressInputs = {
	containerNumber: string;
	cargoReferenceNumber: string;
	pickupCompanyName: string;
	pickupAddress: string;
	pickupContactName: string;
	pickupContactPhone: string;
	pickupWindow: string;
	pickupAppointmentNeeded: boolean;
	dropoffCompanyName: string;
	dropoffAddress: string;
	dropoffContactName: string;
	dropoffContactPhone: string;
	dropoffWindow: string;
	dropOffAppointmentNeeded: boolean;
	bolNumber: string;
	t1Number: string;
	borderCrossing: string;
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
		control,
		formState: { errors }
	} = useForm<WorkflowFormAddressInputs>({
		defaultValues: {
			containerNumber: workflowFormAddressState.containerNumber,
			cargoReferenceNumber: workflowFormAddressState.cargoReferenceNumber,
			pickupCompanyName: workflowFormAddressState.pickupCompanyName,
			pickupAddress: workflowFormAddressState.pickupAddress,
			pickupContactName: workflowFormAddressState.pickupContactName,
			pickupContactPhone: workflowFormAddressState.pickupContactPhone,
			pickupWindow: workflowFormAddressState.pickupWindow,
			pickupAppointmentNeeded: workflowFormAddressState.pickupAppointmentNeeded,
			dropoffCompanyName: workflowFormAddressState.dropoffCompanyName,
			dropoffAddress: workflowFormAddressState.dropoffAddress,
			dropoffContactName: workflowFormAddressState.dropoffContactName,
			dropoffContactPhone: workflowFormAddressState.dropoffContactPhone,
			dropoffWindow: workflowFormAddressState.dropoffWindow,
			dropOffAppointmentNeeded: workflowFormAddressState.dropOffAppointmentNeeded,
			bolNumber: workflowFormAddressState.bolNumber,
			t1Number: workflowFormAddressState.t1Number,
			borderCrossing: workflowFormAddressState.borderCrossing
		}
	});

	const onSubmit: SubmitHandler<WorkflowFormAddressInputs> = (data) => {
		handleSubmitWorkflow(data);
	};

	return (
		<div className="w-full bg-slate-100 rounded-b-md p-4 mb-4">
			<form id="newWorkflowFormAddress" onSubmit={handleSubmit(onSubmit)} className="w-full">
				<div className="mb-2 grid grid-cols-2 gap-4">
					<div>
						<label>Container Number / Shipment Reference*</label>
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
						{/* TODO: This will be generated if not provided */}
						<div className="flex flex-row">
							<label>Cargo Reference Number</label>
							<p className="text-sm pl-4 text-slate-500">*This will be generated if not provided</p>
						</div>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="S104697223"
								className={`input w-full ${
									errors.cargoReferenceNumber ? "border-error" : "border-neutral"
								}`}
								{...register("cargoReferenceNumber", { required: false })}
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
				<Controller
					name="pickupAddress"
					rules={{
						required: true
					}}
					control={control}
					render={({ field: { onChange, value, name }, fieldState: { error } }) => (
						<GoogleAddressAutocomplete
							onChange={onChange}
							value={value}
							name={name}
							error={error}
							label={"Address*"}
						/>
					)}
				/>

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
					<Controller
						name="dropoffAddress"
						rules={{
							required: true
						}}
						control={control}
						render={({ field: { onChange, value, name }, fieldState: { error } }) => (
							<GoogleAddressAutocomplete
								onChange={onChange}
								value={value}
								name={name}
								error={error}
								label={"Address*"}
							/>
						)}
					/>
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
				<div className="divider" />
				<div className="mb-2 grid grid-cols-2 gap-2">
					<div>
						<label>BOL #</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="XXXX123456789"
								className={`input w-full ${errors.bolNumber ? "border-error" : "border-neutral"}`}
								{...register("bolNumber")}
							/>
						</div>
					</div>
					<div>
						<label>T1 Reference #</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="GS2269XMBS005M2"
								className={`input w-full ${errors.t1Number ? "border-error" : "border-neutral"}`}
								{...register("t1Number")}
							/>
						</div>
					</div>
					<div>
						<label>Border Crossing</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="Detroit, Malaba, Busia"
								className={`input w-full ${
									errors.borderCrossing ? "border-error" : "border-neutral"
								}`}
								{...register("borderCrossing")}
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
					<IconRight />
				</button>
			</div>
		</div>
	);
}
