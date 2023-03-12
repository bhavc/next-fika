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
		firstName: null,
		lastName: null,
		companyName: "",
		companyAddress: "",
		phoneNumber: null,
		emergencyNumbers: null,
		gender: null,
		languagesSupported: null,
		smartphoneAccess: null,
		livetrackingAvailable: null,
		dashcamSetup: null,
		areasServiced: null,
		regionServiced: null,
		bucketStorageUrls: null,
		avatarImageData: null,
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
		const response = await getCurrentUser(userToken);
		userData = response.data;
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
