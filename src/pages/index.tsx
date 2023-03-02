import { getCurrentUser } from "@/api/user";
import { mapUserTypeToAppRoute } from "@/features/User/types";

import MainNavBar from "@/components/Nav/MainNavbar";

import type { GetServerSideProps } from "next";

export default function Home({ isLoggedIn, appRoute }: { isLoggedIn: boolean; appRoute: string }) {
	return (
		<>
			<MainNavBar isLoggedIn={isLoggedIn} appRoute={appRoute} />
			<main className="bg-primary h-screen p-4">
				<h1 className="text-3xl mt-2 mb-2 text-base-100">Fika 2</h1>
				<div>
					<p className="prose lg:prose-xl text-base-100">Fika landing page</p>
				</div>
			</main>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req } = context;
	const { cookies } = req;
	const userToken = cookies?.user;
	const isLoggedIn = Boolean(userToken);
	let userData;

	// need to validate user here
	try {
		userData = await getCurrentUser(userToken);
	} catch (err) {
		userData = null;
	}

	const appRoute = mapUserTypeToAppRoute(userData.client);

	return {
		props: {
			isLoggedIn,
			appRoute
		}
	};
};
