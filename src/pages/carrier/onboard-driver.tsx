import Link from "next/link";

import { getCurrentUser } from "@/api/user";

import { doesUserRequireSettings } from "@/features/Carrier/helpers";

import CarrierLayout from "@/layouts/CarrierLayout";

import type { GetServerSideProps } from "next";
import type { UserCarrier } from "@/features/Carrier/types";

import AlertIcon from "public/svg/alert-circle.svg";

export default function OnboardDriver({ requiresVerify }: { requiresVerify: boolean }) {
	return (
		<>
			<CarrierLayout>
				<main>
					{requiresVerify && (
						<div className="flex align-middle justify-center mt-4">
							<div className="alert alert-info align-middle justify-center shadow-lg w-5/6">
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
					<div className="items-center justify-center">
						<div className="bg-slate-100 mt-4 p-4 rounded-t-md">
							<h1 className="text-3xl text-left mb-4">Onboard Driver</h1>
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

	const requiresVerify = doesUserRequireSettings(userData);

	return {
		props: {
			userData,
			requiresVerify
		}
	};
};
