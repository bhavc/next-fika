import { useForm, SubmitHandler } from "react-hook-form";

type FormInputs = {
	emailUsername: string;
	password: string;
};

interface RegisterFormProps {
	handleSubmitLogin: ({
		emailUsername,
		password
	}: {
		emailUsername: string;
		password: string;
	}) => void;
}

export default function LoginForm({ handleSubmitLogin }: RegisterFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormInputs>();
	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		const { emailUsername, password } = data;

		handleSubmitLogin({
			emailUsername: emailUsername.toLocaleLowerCase(),
			password
		});
	};

	return (
		<div className="flex justify-center items-center">
			<div className="card w-80 bg-slate-50 shadow-xl mt-8">
				<div className="card-body">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-2">
							<label>Email/Username</label>
							<div className="mt-1 flex rounded-md shadow-sm">
								<input
									type="text"
									placeholder="Email"
									className={`input w-full max-w-xs ${
										errors.emailUsername ? "border-error" : "border-neutral"
									}`}
									{...register("emailUsername", { required: "true" })}
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
						{errors && Object.keys(errors).length > 0 && (
							<p className="text-error mt-1">Please ensure the required fields are filled in</p>
						)}
						<div className="flex justify-center items-center mt-6">
							<button className="btn btn-secondary text-white">Log In</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
