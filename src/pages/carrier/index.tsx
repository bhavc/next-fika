import Link from "next/link";

import { getCurrentUser } from "@/api/user";

import { doesUserRequireSettings } from "@/features/Carrier/helpers";

import CarrierLayout from "@/layouts/CarrierLayout";

import type { GetServerSideProps } from "next";
import type { UserCarrier } from "@/features/Carrier/types";

import AlertIcon from "public/svg/alert-circle.svg";

export default function Carrier({ requiresVerify }: { requiresVerify: boolean }) {
	return (
		<>
			<CarrierLayout>
				<main>
					{requiresVerify && (
						<div className="flex align-middle justify-center">
							<div className="alert alert-info shadow-lg absolute top-20 z-10 w-3/4 items-center justify-center">
								<div>
									<AlertIcon />
									<span className="text-white">
										Before you get started, we need some information from you. Head over to the{" "}
										<Link href="/carrier/settings" className="underline">
											settings
										</Link>{" "}
										page.
									</span>
								</div>
							</div>
						</div>
					)}
					<div className="flex items-center justify-center">
						<div className="hero min-h-[calc(100vh_-_65px)] bg-[url('/jpeg/client_main.jpeg')]">
							<div className="hero-overlay bg-opacity-60"></div>
							<div className="hero-content text-center text-neutral-content">
								<div className="max-w-md">
									<h1 className="mb-5 text-5xl font-bold">Hello, User</h1>
									<p className="mb-5">
										Welcome to Fika. Here you will be able to view shipments assigned to your
										company and assign shipments to your drivers
									</p>
								</div>
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

	let userData: UserCarrier = {
		id: null,
		first_name: null,
		last_name: null,
		company_name: "",
		company_address: "",
		phone_number: null,
		emergency_numbers: null,
		gender: null,
		languages_supported: null,
		smartphone_access: null,
		livetracking_available: null,
		dashcam_setup: null,
		areas_serviced: null,
		region_serviced: null,
		bucket_storage_urls: null,
		created_at: "",
		modified_at: "",
		role: ""
	};

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
	// check if the user has verified their info and if not, correct the issue
	const requiresVerify = doesUserRequireSettings(userData);

	return {
		props: {
			userData,
			requiresVerify
		}
	};
};
