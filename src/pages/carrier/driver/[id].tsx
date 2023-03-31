import Link from "next/link";
import { useRouter } from "next/router";

import { getCurrentUser } from "@/api/user";
import { getDriverById, removeDriverFormOrganization } from "@/api/drivers";

import { doesUserRequireSettings } from "@/features/Carrier/CarrierWorkflows/helpers";

import CarrierLayout from "@/layouts/CarrierLayout";

import type { GetServerSideProps } from "next";
import type { UserCarrier } from "@/features/Carrier/UserCarrier/types";
import type { UserDriver } from "@/features/Driver/UserDriver/types";

import AlertIcon from "public/svg/alert-circle.svg";
import { toast } from "react-hot-toast";

export type AreasServiced = "Local" | "Provincial" | "Cross Country" | "Cross Border";

export default function Driver({
	requiresVerify,
	userData,
	driverData,
	userToken
}: {
	requiresVerify: boolean;
	userData: UserCarrier;
	driverData: UserDriver;
	userToken: string;
}) {
	const router = useRouter();

	const {
		id,
		username,
		firstName,
		lastName,
		email,
		companyName,
		address,
		phoneNumber,
		emergencyNumbers,
		gender,
		// role, this is going to be driver regardless
		status
	} = driverData;

	const handleRemoveDriverFromOrg = async () => {
		try {
			if (!id) {
				return;
			}

			const removeDriverBody = {
				driverCompanyName: ""
			};

			await removeDriverFormOrganization({
				userToken,
				driverId: id?.toString(),
				data: removeDriverBody
			});

			router.push("/carrier/drivers");
			toast.success("Successfully removed user from organization.");
		} catch (err) {
			toast.error("Could not remove user from organization. Please try again later.");
		}
	};

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
						<h1 className="text-3xl text-left my-4 ml-4">Driver Profile</h1>
						<div className="px-4">
							<div className="card bg-base-100 shadow-2xl mb-2">
								<div className="card-body">
									<h2 className="text-xl">
										{firstName} {lastName}
									</h2>

									<div className="divider" />

									<div className="flex flex-row flex-wrap gap-4 w-full">
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<div>
												<label className="text-xl">Username</label>
												<p className="text-md pl-4">{username}</p>
											</div>
										</div>
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<div>
												<label className="text-xl">Email</label>
												<p className="text-md pl-4">{email}</p>
											</div>
										</div>
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<div>
												<label className="text-xl">Company</label>
												<p className="text-md pl-4">{companyName}</p>
											</div>
										</div>
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<div>
												<label className="text-xl">Address</label>
												<p className="text-md pl-4">{address}</p>
											</div>
										</div>
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<div>
												<label className="text-xl">Phone #</label>
												<p className="text-md pl-4">{phoneNumber}</p>
											</div>
										</div>
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<div>
												<label className="text-xl">Emergency #&apos;s</label>
												{emergencyNumbers?.map((number, index) => {
													return (
														<p key={index} className="text-md pl-4">
															{number}
														</p>
													);
												})}
											</div>
										</div>
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<div>
												<label className="text-xl">Gender</label>
												<p className="text-md pl-4">{gender ? gender : "n/a"}</p>
											</div>
										</div>
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<div>
												<label className="text-xl">Status</label>
												<p className="text-md pl-4">{status}</p>
											</div>
										</div>
									</div>
									<div className="divider" />

									<div className="flex justify-end mt-4">
										<button
											className="btn btn-error"
											type="submit"
											onClick={handleRemoveDriverFromOrg}
										>
											Remove User From Organization
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
	const { req, params } = context;
	const driverId = params?.id;

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
	let driverData: UserDriver = {
		id: -1,
		email: "",
		username: "",
		firstName: "",
		lastName: "",
		companyName: "",
		address: "",
		phoneNumber: null,
		emergencyNumbers: null,
		gender: null,
		bucketStorageUrls: null,
		avatarImageData: null,
		role: "",
		status: ""
	};

	if (!driverId || Array.isArray(driverId)) {
		return {
			redirect: {
				destination: "/carrier/drivers",
				statusCode: 302
			}
		};
	}

	if (!userToken) {
		return {
			redirect: {
				destination: "/",
				statusCode: 302
			}
		};
	}

	try {
		const getCurrentUserResponse = await getCurrentUser(userToken);
		userData = getCurrentUserResponse.data;

		const getDriverDataResponse = await getDriverById({ userToken, driverId });
		driverData = getDriverDataResponse.data;
	} catch (err) {
		console.info("err", err);
	}

	const requiresVerify = doesUserRequireSettings(userData);

	return {
		props: {
			userData,
			driverData,
			requiresVerify,
			userToken
		}
	};
};
