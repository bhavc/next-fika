import { useRouter } from "next/router";
import { setCookie } from "cookies-next";

import { toast } from "react-hot-toast";

import { postLogin } from "@/api/login";
import { getCurrentUser } from "@/api/user";
import { mapUserTypeToAppRoute } from "@/features/helpers";

import LoginForm from "@/features/Login/LoginForm";
import MainNavBar from "@/components/Nav/MainNavbar";

import type { GetServerSideProps } from "next";

export default function Login() {
	const router = useRouter();

	const handleSubmitLogin = async ({
		emailUsername,
		password
	}: {
		emailUsername: string;
		password: string;
	}) => {
		const data = {
			emailUsername,
			password
		};

		try {
			const response = await postLogin(data);

			const token = response.token;
			const user = response.user;

			setCookie("user", token);
			toast.success("Successfully logged in");

			switch (user.role) {
				case "Shipper":
					return router.push("/shipper");
				case "Carrier":
					return router.push("/carrier");
				case "Driver":
					return router.push("/driver");
				default:
					return router.push("/shipper");
			}
		} catch (err) {
			toast.error("Error logging in. Recheck your email/pass or try again later");
		}
	};

	return (
		<main>
			<MainNavBar />
			<div className="flex flex-col justify-between items-center h-[calc(100vh_-_65px)]">
				<div className="bg-primary min-w-full pt-4 h-full">
					<h1 className="text-3xl mt-2 mb-2 text-slate-100 text-center">Log In</h1>
					<LoginForm handleSubmitLogin={handleSubmitLogin} />
				</div>
			</div>
		</main>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req } = context;
	const { cookies } = req;
	const userToken = cookies?.user;
	const isLoggedIn = Boolean(userToken);
	let userData;

	try {
		const response = await getCurrentUser(userToken);
		userData = response.data;
	} catch (err) {
		userData = null;
	}

	const appRoute = mapUserTypeToAppRoute(userData?.role);

	if (isLoggedIn && appRoute) {
		return {
			redirect: {
				destination: appRoute,
				statusCode: 302
			}
		};
	}

	return {
		props: {}
	};
};
