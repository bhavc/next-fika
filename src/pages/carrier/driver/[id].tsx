import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/router";

import { getCurrentUser } from "@/api/user";
import { onboardDriver } from "@/api/registration";

import { doesUserRequireSettings } from "@/features/Carrier/CarrierWorkflows/helpers";

import CarrierLayout from "@/layouts/CarrierLayout";
import GoogleAddressAutocomplete from "@/components/GoogleAddressAutocomplete/GoogleAddressAutocomplete";

import type { GetServerSideProps } from "next";
import type { UserCarrier } from "@/features/Carrier/UserCarrier/types";

import AlertIcon from "public/svg/alert-circle.svg";

export type AreasServiced = "Local" | "Provincial" | "Cross Country" | "Cross Border";

export default function Driver({
	requiresVerify,
	userData
}: {
	requiresVerify: boolean;
	userData: UserCarrier;
}) {
	console.log("userData", userData);
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
						<h1 className="text-3xl text-left my-4 ml-4">Onboard Driver</h1>
						<div className="px-4">
							<div className="card bg-base-100 shadow-2xl mb-2">
								<div className="card-body">
									<h2 className="text-xl mb-4">Driver Page</h2>

									<div className="divider" />

									<div className="flex flex-row flex-wrap gap-4 w-full">
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<div>
												<label className="text-xl">Username</label>
												<p className="text-sm pl-4 text-error">*Required</p>
											</div>
										</div>
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<label className="text-xl">Email</label>
										</div>
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<div>
												<label className="text-xl">Password</label>
												<p className="text-sm pl-4 text-error">*Required</p>
											</div>
										</div>
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<div>
												<label className="text-xl">Confirm Password</label>
												<p className="text-sm pl-4 text-error">*Required</p>
											</div>
										</div>
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<div>
												<label className="text-xl">First Name</label>
											</div>
										</div>
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<div>
												<label className="text-xl">Last Name</label>
											</div>
										</div>
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<div>
												<label className="text-xl">Address</label>
											</div>
										</div>
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<div>
												<label className="text-xl">Phone #</label>
												<p className="text-sm pl-4 text-error">*Required</p>
											</div>
										</div>
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<label className="text-xl">Emergency #</label>
										</div>
									</div>
									<div className="divider" />

									<div className="flex justify-end mt-4">
										<button
											className="btn btn-primary"
											form="carrierOnboardDriversForm"
											type="submit"
										>
											Save All
										</button>
									</div>
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
		companyName: "",
		address: "",
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
		const response = await getCurrentUser(userToken);
		userData = response.data;
	} catch (err) {
		console.info("err", err);
	}

	const requiresVerify = doesUserRequireSettings(userData);

	return {
		props: {
			userData,
			requiresVerify
		}
	};
};
