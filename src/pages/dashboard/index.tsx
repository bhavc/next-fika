import { GetServerSideProps } from "next";

import DashboardLayout from "@/layouts/DashboardLayout";

import { getCurrentUser } from "@/api/user";

export default function Dashboard({ userData }: { userData: any }) {
	return (
		<>
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

	let userData = {};

	if (!userToken) {
		return {
			redirect: {
				destination: "/",
				statusCode: 302
			}
		};
	}

	try {
		const responseData = await getCurrentUser(userToken);
		userData = responseData;
	} catch (err) {
		console.log("err", err);
	}

	// TODO check the users role and redirect in that case

	return {
		props: {
			userData
		}
	};
};
