import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserType } from "../User/types";

type FormInputs = {
	email: string;
	password: string;
	company: string;
	phone: string;
};

interface RegisterFormProps {
	selectedAccountType: UserType | null;
	setPreviousStep: () => void;
	handleSubmitRegistration: ({
		email,
		password,
		company,
		phone
	}: {
		email: string;
		password: string;
		company: string;
		phone: string;
	}) => void;
}

export default function RegisterForm({
	selectedAccountType,
	setPreviousStep,
	handleSubmitRegistration
}: RegisterFormProps) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		setValue,
		control
	} = useForm<FormInputs>();
	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		const { email, password, company, phone } = data;

		handleSubmitRegistration({
			email,
			password,
			company,
			phone
		});
	};

	return (
		<div>
			<div className="card w-80 bg-slate-50 shadow-xl">
				<div className="card-body">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-2">
							<label>Email</label>
							<div className="mt-1 flex rounded-md shadow-sm">
								<input
									type="text"
									placeholder="Email"
									className="input w-full max-w-xs"
									{...register("email", { required: "Email required" })}
								/>
							</div>
							{errors.email && <p className="text-error mt-1">Email is required</p>}
						</div>
						<div className="mb-2">
							<label>Password</label>
							<div className="mt-1 flex rounded-md shadow-sm">
								<input
									type="password"
									placeholder="*************"
									className="input w-full max-w-xs"
									{...register("password", { required: "Password required" })}
								/>
							</div>
							{errors.password && <p className="text-error mt-1">{errors.password.message}</p>}
						</div>
						<div className="mb-2">
							<label>Company</label>
							<div className="mt-1 flex rounded-md shadow-sm">
								<input
									type="text"
									placeholder="Fika Ltd."
									className="input w-full max-w-xs"
									{...register("company", {
										required: "Provide your companies name if you are a carrier"
									})}
								/>
							</div>
							{errors.company && <p className="text-error mt-1">{errors.company.message}</p>}
						</div>
						<div className="mb-2">
							<label>Phone Number</label>
							<div className="mt-1 flex rounded-md shadow-sm">
								<input
									type="text"
									placeholder="(911) 911 9111"
									className="input w-full max-w-xs"
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
							{errors.phone && <p className="text-error mt-1">{errors.phone.message}</p>}
						</div>
						<div className="flex justify-center items-center mt-6">
							<button className="btn btn-primary white text-white">Submit</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
