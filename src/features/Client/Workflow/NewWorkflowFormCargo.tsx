import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import IconRight from "public/svg/arrow-right.svg";

type FormInputs = {
	containerNumber: string;
	shipmentNumber: string;
	clearance: string;
	pickupAddress: string;
	pickupCity: string;
	pickupProvinceCountry: string;
	pickupContactName: string;
	pickupContactPhone: string;
	deliveryAddress: string;
	deliveryCity: string;
	deliveryProvinceCountry: string;
	deliveryContactName: string;
	deliveryContactPhone: string;
};

interface NewWorkflowFormCargoProps {
	handleSubmitWorkflow: () => void;
}

export default function NewWorkflowFormCargo({ handleSubmitWorkflow }: NewWorkflowFormCargoProps) {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormInputs>();

	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		handleSubmitWorkflow();

		// TODO
		// make a request to the backend, register the user
	};

	return (
		<div className="flex flex-row w-full bg-slate-100 rounded-md p-4">
			<form id="newWorkflowForm" onSubmit={handleSubmit(onSubmit)} className="w-full">
				<div className="mb-2 grid grid-cols-2 gap-4">
					<div>
						<label>Container Number</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="TEMU2151151"
								className={`input w-full ${
									errors.containerNumber ? "border-error" : "border-neutral"
								}`}
								{...register("containerNumber", { required: "Container Number required." })}
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
						<label>Address</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="Canadian National Railway, 76 Intermodal Dr."
								className={`input w-full ${
									errors.pickupAddress ? "border-error" : "border-neutral"
								}`}
								{...register("pickupAddress", { required: "Address required" })}
							/>
						</div>
					</div>
				</div>
				<div className="mb-2 grid grid-cols-2 gap-2">
					<div>
						<label>City</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="Brampton"
								className={`input w-full ${errors.pickupCity ? "border-error" : "border-neutral"}`}
								{...register("pickupCity", { required: "City required" })}
							/>
						</div>
					</div>
					<div>
						<label>Province & Country</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="Ontario, Canada"
								className={`input w-full ${
									errors.pickupProvinceCountry ? "border-error" : "border-neutral"
								}`}
								{...register("pickupProvinceCountry", { required: "Province/Country required." })}
							/>
						</div>
					</div>
				</div>

				<h2 className="prose prose-xl">Contact</h2>
				<div className="mb-2 grid grid-cols-2 gap-2">
					<div>
						<label>Name</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="Gloria Zhuang"
								className={`input w-full ${
									errors.pickupContactName ? "border-error" : "border-neutral"
								}`}
								{...register("pickupContactName", { required: "Contact name required." })}
							/>
						</div>
					</div>

					<div>
						<label>Phone</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="6479993989"
								className={`input w-full ${
									errors.pickupContactPhone ? "border-error" : "border-neutral"
								}`}
								{...register("pickupContactPhone", { required: "Phone required." })}
							/>
						</div>
					</div>
				</div>

				<div className="divider" />

				<h2 className="prose prose-2xl">Delivery</h2>
				<div className="mb-2">
					<div>
						<label>Address</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="Canadian National Railway, 76 Intermodal Dr."
								className={`input w-full ${
									errors.deliveryAddress ? "border-error" : "border-neutral"
								}`}
								{...register("deliveryAddress", { required: "Address required" })}
							/>
						</div>
					</div>
				</div>
				<div className="mb-2 grid grid-cols-2 gap-2">
					<div>
						<label>City</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="Brampton"
								className={`input w-full ${
									errors.deliveryCity ? "border-error" : "border-neutral"
								}`}
								{...register("deliveryCity", { required: "City required." })}
							/>
						</div>
					</div>
					<div>
						<label>Province & Country</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="Ontario, Canada"
								className={`input w-full ${
									errors.deliveryProvinceCountry ? "border-error" : "border-neutral"
								}`}
								{...register("deliveryProvinceCountry", { required: "Province/Country required." })}
							/>
						</div>
					</div>
				</div>

				<h2 className="prose prose-xl">Contact</h2>
				<div className="mb-2 grid grid-cols-2 gap-2">
					<div>
						<label>Name</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="Gloria Zhuang"
								className={`input w-full ${
									errors.deliveryContactName ? "border-error" : "border-neutral"
								}`}
								{...register("deliveryContactName", { required: "Name required." })}
							/>
						</div>
					</div>

					<div>
						<label>Phone</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="6479993989"
								className={`input w-full ${
									errors.deliveryContactPhone ? "border-error" : "border-neutral"
								}`}
								{...register("deliveryContactPhone", { required: "Phone required." })}
							/>
						</div>
					</div>
				</div>

				<div className="flex justify-end">
					<button className="btn btn-circle bg-primary mt-10">
						{/* <Image src={IconRight} width={24} height={24} alt="arrow-next" color="white" /> */}
						<IconRight />
					</button>
				</div>
			</form>

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
