import CarrierLayout from "@/layouts/CarrierLayout";

import { getCurrentUser } from "@/api/user";

import type { GetServerSideProps } from "next";

export default function Settings() {
	return (
		<>
			<CarrierLayout>
				<main className="items-center justify-center">
					<h1 className="text-3xl text-left my-4 ml-4">Settings</h1>

					<div className="px-4">
						<div className="card bg-base-100 shadow-xl">
							<div className="card-body">
								<p>If a dog chews shoes whose shoes does he choose?</p>
							</div>
						</div>
					</div>
				</main>
			</CarrierLayout>
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

	return {
		props: {
			userData
		}
	};
};
