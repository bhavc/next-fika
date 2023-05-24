import { useForm, SubmitHandler } from "react-hook-form";
import { UserType } from "../types";

type FormInputs = {
	email: string;
	password: string;
	confirmPassword: string;
};

interface RegisterMainProps {
	selectedAccountType: UserType | null;
	setPreviousStep: () => void;
	setSelectedCredentials: ({ email, password }: { email: string; password: string }) => void;
}

export default function RegisterMain({ setSelectedCredentials }: RegisterMainProps) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<FormInputs>();
	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		const { email, password } = data;

		setSelectedCredentials({
			email: email.toLocaleLowerCase(),
			password
		});
	};

	return (
		<div className="flex justify-center">
			<div className="card w-80 bg-slate-50 shadow-xl mt-4">
				<div className="card-body">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-2">
							<label>Email</label>
							<div className="mt-1 flex rounded-md shadow-sm">
								<input
									type="text"
									placeholder="Email"
									className={`input w-full max-w-xs ${
										errors.email ? "border-error" : "border-neutral"
									}`}
									{...register("email", { required: "Email required" })}
								/>
							</div>
						</div>
						<div className="mb-2">
							<label>Password</label>
							<div className="mt-1 flex rounded-md shadow-sm">
								<input
									type="password"
									placeholder="*************"
									className={`input w-full max-w-xs ${
										errors.password ? "border-error" : "border-neutral"
									}`}
									{...register("password", { required: "Password required" })}
								/>
							</div>
						</div>
						<div className="mb-2">
							<label>Confirm Password</label>
							<div className="mt-1 flex rounded-md shadow-sm">
								<input
									type="password"
									placeholder="*************"
									className={`input w-full max-w-xs ${
										errors.confirmPassword ? "border-error" : "border-neutral"
									}`}
									{...register("confirmPassword", {
										required: true,
										validate: (val: string) => {
											if (watch("password") != val) {
												return "Your passwords must match";
											}
										}
									})}
								/>
							</div>
						</div>
						{errors && Object.keys(errors).length > 0 && (
							<p className="text-error mt-1">Please ensure the required fields are filled in</p>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}
