import { useForm, SubmitHandler } from "react-hook-form";

type FormInputs = {
	company: string;
	phone: string;
};

interface RegisterDetailsProps {
	setPreviousStep: () => void;
	setSelectedDetails: ({ company, phone }: { company: string; phone: string }) => void;
}

export default function RegisterDetails({ setSelectedDetails }: RegisterDetailsProps) {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormInputs>();
	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		const { company, phone } = data;

		setSelectedDetails({
			company,
			phone
		});
	};

	return (
		<div className="flex justify-center">
			<div className="card w-80 bg-slate-50 shadow-xl mt-4">
				<div className="card-body">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-2">
							<label>Company</label>
							<div className="mt-1 flex rounded-md shadow-sm">
								<input
									type="text"
									placeholder="Fika Ltd."
									className={`input w-full max-w-xs ${
										errors.company ? "border-error" : "border-neutral"
									}`}
									{...register("company", {
										required: "Please provide a phone number"
									})}
								/>
							</div>
						</div>
						<div className="mb-2">
							<label>Phone Number</label>
							<div className="mt-1 flex rounded-md shadow-sm">
								<input
									type="text"
									placeholder="(911) 911 9111"
									className={`input w-full max-w-xs ${
										errors.phone ? "border-error" : "border-neutral"
									}`}
									{...register("phone", {
										required: "Please provide a phone number",
										setValueAs(value) {
											return `(${value.substring(0, 3)}) ${value.substring(3, 6)} ${value.substring(
												6,
												value.length
											)}`;
										}
									})}
								/>
							</div>
						</div>
						{errors && Object.keys(errors).length > 0 && (
							<p className="text-error mt-1">Please ensure the required fields are filled in</p>
						)}
						<div className="flex justify-center items-center mt-6">
							<button className="btn btn-secondary white text-white">Register</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
