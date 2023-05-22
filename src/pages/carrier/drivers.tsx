import Link from "next/link";

import { getCurrentUser } from "@/api/user";

import { getDriversByCompany } from "@/api/drivers";

import { doesUserRequireSettings } from "@/features/Carrier/CarrierWorkflows/helpers";
import { shouldRedirectUserDueToIncorrectRole } from "@/features/helpers";

import CarrierLayout from "@/layouts/CarrierLayout";
import DriverList from "@/features/Carrier/DriverList/DriverList";

import type { GetServerSideProps } from "next";
import type { UserCarrier } from "@/features/Carrier/UserCarrier/types";

import AlertIcon from "public/svg/alert-circle.svg";

export default function Drivers({
	drivers,
	requiresVerify
}: {
	drivers: any[];
	requiresVerify: boolean;
}) {
	return (
		<>
			<CarrierLayout>
				<main>
					{requiresVerify && (
						<div className="flex align-middle justify-center mt-4">
							<div className="alert alert-info align-middle justify-center shadow-lg w-5/6">
								<div>
									<div className="mr-2">
										<AlertIcon />
									</div>
									<span className="text-white">
										Before you get started, we need some information from you. Head over to the{" "}
										<Link href="/carrier/settings" className="underline">
											settings
										</Link>{" "}
										page and fill out the information. Once validated by our team you&apos;ll be
										ready to go!
									</span>
								</div>
							</div>
						</div>
					)}
					<div className="items-center justify-center">
						<div className="bg-slate-100 mt-4 p-4 rounded-t-md">
							<h1 className="text-3xl text-left mb-4">Manage your Drivers here</h1>
							<DriverList drivers={drivers} isLoading={false} />
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
	let drivers;

	let userData: UserCarrier = {
		id: null,
		companyName: "",
		address: "",
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
		role: "",
		status: ""
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
		const getDriversResponse = await getDriversByCompany({ userToken });
		drivers = getDriversResponse.data;
		const getUserResponse = await getCurrentUser(userToken);
		userData = getUserResponse.data;
	} catch (err) {
		drivers = null;
		console.info("err", err);
	}

	if (shouldRedirectUserDueToIncorrectRole("Carrier", userData.role)) {
		return {
			redirect: {
				destination: "/",
				statusCode: 302
			}
		};
	}

	const requiresVerify = doesUserRequireSettings(userData);

	return {
		props: {
			drivers,
			requiresVerify
		}
	};
};
