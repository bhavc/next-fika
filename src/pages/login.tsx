import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";

import { postLogin } from "@/api/login";
import { getCurrentUser } from "@/api/user";
import { mapUserTypeToAppRoute } from "@/features/User/types";

import LoginForm from "@/features/Login/LoginForm";
import MainNavBar from "@/components/Nav/MainNavbar";

import type { GetServerSideProps } from "next";

export default function Login() {
	const [cookie, setCookie] = useCookies(["user"]);
	const router = useRouter();

	const handleSubmitLogin = async ({ email, password }: { email: string; password: string }) => {
		const data = {
			email,
			password
		};

		try {
			const response = await postLogin(data);
			const token = response.token;
			const user = response.user;

			setCookie("user", token);
			toast.success("Successfully registered");

			switch (user.role) {
				case "Client":
					return router.push("/client");
				case "Dispatcher":
					return router.push("/dashboard");
				case "Driver":
					return router.push("/driver");
				default:
					return router.push("/client");
			}
		} catch (err) {
			toast.error("Error logging in. Recheck your email/pass or try again later");
		}
	};

	return (
		<main>
			<MainNavBar />
			<div className="flex flex-col justify-between items-center h-[calc(100vh_-_65px)]">
				<div className="bg-primary p-4 min-w-3/5 h-5/6 rounded-xl">
					<h1 className="text-3xl mt-2 mb-2 text-slate-100 text-center">Login</h1>
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
		userData = await getCurrentUser(userToken);
	} catch (err) {
		userData = null;
	}

	const appRoute = mapUserTypeToAppRoute(userData?.client);

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
