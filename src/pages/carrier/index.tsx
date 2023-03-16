import Link from "next/link";

import { getCurrentUser } from "@/api/user";

import { doesUserRequireSettings } from "@/features/Carrier/CarrierWorkflows/helpers";

import CarrierLayout from "@/layouts/CarrierLayout";

import type { GetServerSideProps } from "next";
import type { UserCarrier } from "@/features/Carrier/UserCarrier/types";

import AlertIcon from "public/svg/alert-circle.svg";

export default function Carrier({
	requiresVerify,
	userData
}: {
	requiresVerify: boolean;
	userData: UserCarrier;
}) {
	return (
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
							<div className="max-w-xl">
								<h1 className="mb-5 text-5xl font-bold">Welcome, {userData.companyName}</h1>
								<p className="mb-5">
									Welcome to Fika. Here you will be able to view shipments assigned to your company
									and assign shipments to your drivers.
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</CarrierLayout>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req } = context;
	const { cookies } = req;
	const userToken = cookies.user;

	let userData: UserCarrier = {
		id: null,
		companyName: "",
		companyAddress: "",
		phoneNumber: null,
		emergencyNumbers: null,
		gender: null,
		languagesSupported: null,
		hasSmartphoneAccess: null,
		hasLivetrackingAvailable: null,
		hasDashcamSetup: null,
		areasServiced: null,
		regionServiced: null,
		bucketStorageUrls: null,
		insuranceFileData: null,
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
		console.info("err", err);
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
