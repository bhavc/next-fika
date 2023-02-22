import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import IconRight from "public/svg/arrow-right.svg";
import IconLeft from "public/svg/arrow-left.svg";

// TODO There will be a new workflow form for mobile
// and a new workflow form for desktop

type FormInputs = {
	pickupAddress: string;
	pickupType: string;
	dropOffAddress: string;
	dropoffType: string;
	transitTime: string;
};

interface NewWorkflowFormLocationProps {
	handleSubmitWorkflow: () => void;
	handleGoBack: () => void;
}

export default function NewWorkflowFormLocation({
	handleSubmitWorkflow,
	handleGoBack
}: NewWorkflowFormLocationProps) {
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
							<label>Pickup Address</label>
							<div className="mt-1 flex rounded-md shadow-sm">
								<input
									type="text"
									placeholder="123 fake street"
									className={`input w-full max-w-xs ${
										errors.pickupAddress ? "border-error" : "border-inherit"
									}`}
									{...register("pickupAddress", { required: "Address required" })}
								/>
							</div>
						</div>

						<div className="mb-2">
							<label>Pickup Type</label>
							<div className={"mt-1 flex rounded-md shadow-sm"}>
								<select
									className={`select w-full max-w-s ${
										errors.pickupType ? "border-error" : "border-none"
									}`}
									defaultValue=""
									{...register("pickupType", { required: "Cargo Type required" })}
								>
									<option value="" disabled>
										Choose your pickup type
									</option>
									<option value="Residential">Residential</option>
									<option value="Commercial">Commercial</option>
									<option value="Dock">Dock</option>
									<option value="Lift gate">List Gate</option>
									<option value="Crane">Crane</option>
									<option value="Side offload">Side offload</option>
								</select>
							</div>
						</div>

						<div className="mb-2">
							<label>Dropoff Address</label>
							<div className="mt-1 flex rounded-md shadow-sm">
								<input
									type="text"
									placeholder="123 fake street"
									className={`input w-full max-w-xs ${
										errors.dropOffAddress ? "border-error" : "border-inherit"
									}`}
									{...register("dropOffAddress", { required: "Address required" })}
								/>
							</div>
						</div>

						<div className="mb-2">
							<label>Dropoff Type</label>
							<div className={"mt-1 flex rounded-md shadow-sm"}>
								<select
									className={`select w-full max-w-s ${
										errors.dropoffType ? "border-error" : "border-none"
									}`}
									defaultValue=""
									{...register("dropoffType", { required: "Cargo Type required" })}
								>
									<option value="" disabled>
										Choose your pickup type
									</option>
									<option value="Residential">Residential</option>
									<option value="Commercial">Commercial</option>
									<option value="Dock">Dock</option>
									<option value="Lift gate">List Gate</option>
									<option value="Crane">Crane</option>
									<option value="Side offload">Side offload</option>
								</select>
							</div>
						</div>

						<div className="mb-2">
							<label>Transit time</label>
							<div className="mt-1 flex rounded-md shadow-sm">
								<input
									type="text"
									placeholder="1 - 3 days"
									className={`input w-full max-w-xs ${
										errors.transitTime ? "border-error" : "border-inherit"
									}`}
									{...register("transitTime", { required: "Time required" })}
								/>
							</div>
						</div>

						<div className="flex flex-row justify-between mt-4">
							<button className="btn btn-circle bg-primary" onClick={handleGoBack}>
								<Image src={IconLeft} width={24} height={24} alt="arrow-next" color="white" />
							</button>

							<button className="btn btn-circle bg-primary">
								<Image src={IconRight} width={24} height={24} alt="arrow-next" color="white" />
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
