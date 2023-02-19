import { useState } from "react";
import { postRegister } from "@/api/registration";
import LoginForm from "@/features/Login/LoginForm";
import MainNavBar from "@/components/Nav/MainNavbar";
import { useCookies } from "react-cookie";

export default function Login() {
	const [cookie, setCookie] = useCookies(["user"]);

	const handleSubmitLogin = async ({ email, password }: { email: string; password: string }) => {
		const data = {
			email,
			password
		};

		try {
			// const response = await postRegister(data);
			const token =
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjc2ODMwODE2LCJleHAiOjE2NzY5MTcyMTZ9.HhSnJqaVK7IaIpyR25xhZgSwixCVC6KXe8NBX9B9oME";

			setCookie("user", token);
			return;
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
