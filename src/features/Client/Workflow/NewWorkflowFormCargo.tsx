import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import IconRight from "public/svg/arrow-right.svg";

type FormInputs = {
	cargoType: string;
	clearance: string;
	certificationRequirements: string;
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
		<div>
			<div className="card w-80 bg-slate-50 shadow-xl">
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
			</div>
		</div>
	);
}
