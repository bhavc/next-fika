import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import IconRight from "public/icons/svg/arrow-right.svg";
import IconLeft from "public/icons/svg/arrow-left.svg";

// TODO There will be a new workflow form for mobile
// and a new workflow form for desktop

type FormInputs = {
	cargoPrice: number;
	cargoValue: number;
	insuranceRequirement: string;
	notes: string;
};

interface NewWorkflowFormPriceProps {
	handleSubmitWorkflow: () => void;
	handleGoBack: () => void;
}

export default function NewWorkflowFormPrice({
	handleGoBack,
	handleSubmitWorkflow
}: NewWorkflowFormPriceProps) {
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
							<label>Cargo Value</label>
							<div className="mt-1 flex rounded-md shadow-sm">
								<input
									type="text"
									placeholder="$1000 USD"
									className={`input w-full max-w-xs ${
										errors.cargoValue ? "border-error" : "border-inherit"
									}`}
									{...register("cargoValue", { required: "Cargo value required" })}
								/>
							</div>
						</div>

						<div className="mb-2">
							<label>Cargo Price</label>
							<div className="mt-1 flex rounded-md shadow-sm">
								<input
									type="text"
									placeholder="$100 USD"
									className={`input w-full max-w-xs ${
										errors.cargoPrice ? "border-error" : "border-inherit"
									}`}
									{...register("cargoPrice", { required: "Cargo price required" })}
								/>
							</div>
						</div>

						<div className="mb-2">
							<label>Insurace requirement</label>
							<div className="mt-1 flex rounded-md shadow-sm">
								<input
									type="text"
									placeholder="Insurance requirements"
									className={`input w-full max-w-xs ${
										errors.insuranceRequirement ? "border-error" : "border-inherit"
									}`}
									{...register("insuranceRequirement", { required: "Insurance required" })}
								/>
							</div>
						</div>

						<div className="mb-2">
							<label>Notes</label>
							<div className="mt-1 flex rounded-md shadow-sm">
								<textarea
									placeholder="Anything else you'd like to add"
									className={`textarea textarea-lg w-full ${
										errors.notes ? "border-error" : "border-inherit"
									}`}
									{...register("notes")}
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
