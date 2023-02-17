import { useState } from "react";
import { postRegister } from "@/api/registration";
import LoginForm from "@/features/Login/LoginForm";
import MainNavBar from "@/components/Nav/MainNavbar";

export default function Login() {
	const handleSubmitLogin = async ({ email, password }: { email: string; password: string }) => {
		const data = {
			email,
			password
		};

		try {
			const response = await postRegister(data);
		} catch (err) {}
	};

	return (
		<main>
			<MainNavBar />
			<div className="flex flex-col justify-center items-center">
				<h1 className="text-3xl mt-2 mb-2">Login</h1>
				<LoginForm handleSubmitLogin={handleSubmitLogin} />
			</div>
		</main>
	);
}
