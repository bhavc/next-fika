import { GetServerSideProps } from "next";

import CarrierLayout from "@/layouts/CarrierLayout";

import { getCurrentUser } from "@/api/user";

export default function Carrier({ userData }: { userData: any }) {
	return (
		<>
			<CarrierLayout>
				<main className="flex items-center justify-center">
					<div className="hero min-h-screen bg-[url('/jpeg/client_main.jpeg')]">
						<div className="hero-overlay bg-opacity-60"></div>
						<div className="hero-content text-center text-neutral-content">
							<div className="max-w-md">
								<h1 className="mb-5 text-5xl font-bold">Hello, User</h1>
								<p className="mb-5">
									Welcome to Fika. Here you will be able to view shipments assigned to your company
									and assign shipments to your drivers
								</p>
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

	// TODO check the users role and redirect in that case

	return {
		props: {
			userData
		}
	};
};
