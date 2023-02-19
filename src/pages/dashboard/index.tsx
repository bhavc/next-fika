import { GetServerSideProps } from "next";

import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardNavbar from "@/components/Nav/DashboardNavbar";

import { getCurrentUser } from "@/api/user";

export default function Dashboard({ hello, userToken }: { hello: string; userToken: string }) {
	return (
		<>
			<DashboardNavbar />

			<DashboardLayout>
				<main className="items-center justify-center px-4">
					<h1 className="text-3xl mt-2 mb-4 ml-4 text-left">Welcome, username</h1>
				</main>
			</DashboardLayout>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req } = context;
	const { cookies } = req;
	const userToken = cookies.user;

	let userData;

	if (!userToken) {
		console.log("theres not token");

		return {
			redirect: {
				destination: "/",
				statusCode: 302
			}
		};
	}

	// need to validate user here

	try {
		const responseData = await getCurrentUser(userToken);
		userData = responseData.user;
	} catch (err) {
		console.log("err", err);
	}

	console.log("userData", userData);

	return {
		props: {
			hello: "hello",
			userToken
		}
	};
};
