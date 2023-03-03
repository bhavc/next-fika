import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";

type FormInputs = {
	email: string;
	password: string;
};

interface RegisterFormProps {
	handleSubmitLogin: ({ email, password }: { email: string; password: string }) => void;
}

export default function RegisterForm({ handleSubmitLogin }: RegisterFormProps) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		setValue,
		control
	} = useForm<FormInputs>();
	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		const { email, password } = data;

		handleSubmitLogin({
			email,
			password
		});

		// TODO
		// make a request to the backend, register the user
	};

	return (
		<div className="card w-80 bg-slate-50 shadow-xl mt-8">
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
					<div className="flex justify-center items-center mt-6">
						<button className="btn btn-primary white text-white">Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
}
