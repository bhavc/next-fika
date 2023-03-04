import DashboardLayout from "@/layouts/DashboardLayout";

import { getCurrentUser } from "@/api/user";

import type { GetServerSideProps } from "next";

export default function Settings() {
	return (
		<>
			<DashboardLayout>
				<main className="items-center justify-center">
					<div className="bg-slate-100 mt-4 p-4 rounded-t-md">
						<h1 className="text-3xl text-left mb-4">Settings</h1>
					</div>
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

	return {
		props: {
			userData
		}
	};
};
