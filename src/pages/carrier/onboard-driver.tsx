import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, MouseEvent } from "react";

import { getCurrentUser } from "@/api/user";
import { onboardDriver } from "@/api/registration";

import { doesUserRequireSettings } from "@/features/Carrier/CarrierWorkflows/helpers";

import CarrierLayout from "@/layouts/CarrierLayout";
import GoogleAddressAutocomplete from "@/components/GoogleAddressAutocomplete/GoogleAddressAutocomplete";
import FileUploader from "@/components/FileUploader";

import type { GetServerSideProps } from "next";
import type { UserCarrier } from "@/features/Carrier/UserCarrier/types";

import AlertIcon from "public/svg/alert-circle.svg";

export type AreasServiced = "Local" | "Provincial" | "Cross Country" | "Cross Border";

export type WorkflowFormAddressInputs = {
	driverUsername: string;
	driverPassword: string;
	driverConfirmPassword: string;
	driverEmail: string;
	driverFirstName: string;
	driverLastName: string;
	driverAddress: string;
	driverPhone: string;
	driverEmergencyPhone: string;
};

export default function OnboardDriver({
	requiresVerify,
	userData,
	userToken
}: {
	userToken: string;
	requiresVerify: boolean;
	userData: UserCarrier;
}) {
	const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

	const handleUploadedFiles = (data: any[]) => {
		setUploadedFiles(data);
	};

	const handleUploadedFileRemove = (event: MouseEvent<HTMLElement>, key: number) => {
		event.preventDefault();
		const uploadedFilesCopy = [...uploadedFiles];
		uploadedFilesCopy.splice(key, 1);
		setUploadedFiles(uploadedFilesCopy);
	};

	const router = useRouter();
	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { errors }
	} = useForm<WorkflowFormAddressInputs>();

	const onSubmit: SubmitHandler<WorkflowFormAddressInputs> = async (data) => {
		try {
			const companyName = userData.companyName;

			const onboardDriverSubmitData = {
				data: { ...data, driverFiles: uploadedFiles },
				companyName
			};

			const response = await onboardDriver({ userToken, body: onboardDriverSubmitData });

			toast.success(response.message);
			router.push("/carrier/drivers");
		} catch (err) {
			console.info("err", err);
			toast.error("Error creating drive user");
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
						<h1 className="text-3xl text-left my-4 ml-4">Onboard Driver</h1>
						<div className="px-4">
							<div className="card bg-base-100 shadow-2xl mb-2">
								<div className="card-body">
									<form id="carrierOnboardDriversForm" onSubmit={handleSubmit(onSubmit)} noValidate>
										<h2 className="text-xl mb-4">Invite drivers to your organization here.</h2>
										<div className="divider" />
										<h2 className="text-xl">Driver Profile</h2>
										<p className="text-md mb-4 pl-8">
											Add personal information about your driver here
										</p>
										<div className="flex flex-row flex-wrap gap-4 w-full pl-8">
											<div className="flex flex-col gap-2 w-full sm:w-1/2">
												<div>
													<label className="text-md">Username</label>
													<p className="text-sm pl-4 text-error">*Required</p>
												</div>
												<input
													type="text"
													placeholder="fikauser23"
													className={`input w-full ${
														errors.driverUsername ? "border-error" : "border-neutral"
													}`}
													{...register("driverUsername", { required: true })}
												/>
											</div>
											<div className="flex flex-col gap-2 w-full sm:w-1/2">
												<label className="text-md">Email</label>
												<input
													type="text"
													placeholder="fikafreight@gmail.com"
													className="input w-full border-neutral"
													{...register("driverEmail")}
												/>
											</div>
											<div className="flex flex-col gap-2 w-full sm:w-1/2">
												<div>
													<label className="text-md">Password</label>
													<p className="text-sm pl-4 text-error">*Required</p>
												</div>
												<input
													type="text"
													placeholder="********"
													className={`input w-full ${
														errors.driverPassword ? "border-error" : "border-neutral"
													}`}
													{...register("driverPassword", { required: true })}
												/>
											</div>
											<div className="flex flex-col gap-2 w-full sm:w-1/2">
												<div>
													<label className="text-md">Confirm Password</label>
													<p className="text-sm pl-4 text-error">*Required</p>
												</div>
												<input
													type="text"
													placeholder="********"
													className={`input w-full ${
														errors.driverConfirmPassword ? "border-error" : "border-neutral"
													}`}
													{...register("driverConfirmPassword", {
														required: true,
														validate: (val: string) => {
															if (watch("driverPassword") != val) {
																return "Your passwords must match";
															}
														}
													})}
												/>
												{errors.driverConfirmPassword && (
													<p className="text-sm pl-4 text-error">
														{errors.driverConfirmPassword.message}
													</p>
												)}
											</div>
											<div className="flex flex-col gap-2 w-full sm:w-1/2">
												<div>
													<label className="text-md">First Name</label>
												</div>
												<input
													type="text"
													placeholder="John"
													className={`input w-full ${
														errors.driverFirstName ? "border-error" : "border-neutral"
													}`}
													{...register("driverFirstName")}
												/>
											</div>
											<div className="flex flex-col gap-2 w-full sm:w-1/2">
												<div>
													<label className="text-md">Last Name</label>
												</div>
												<input
													type="text"
													placeholder="Doe"
													className={`input w-full ${
														errors.driverLastName ? "border-error" : "border-neutral"
													}`}
													{...register("driverLastName")}
												/>
											</div>
											<div className="flex flex-col gap-2 w-full sm:w-1/2">
												<div>
													<label className="text-md">Address</label>
												</div>
												<Controller
													name="driverAddress"
													control={control}
													render={({ field: { onChange, value, name }, fieldState: { error } }) => (
														<GoogleAddressAutocomplete
															onChange={onChange}
															value={value}
															name={name}
															error={error}
														/>
													)}
												/>
											</div>
											<div className="flex flex-col gap-2 w-full sm:w-1/2">
												<div>
													<label className="text-md">Phone #</label>
													<p className="text-sm pl-4 text-error">*Required</p>
												</div>
												<input
													type="text"
													placeholder="+19671111567"
													className={`input w-full ${
														errors.driverPhone ? "border-error" : "border-neutral"
													}`}
													{...register("driverPhone", { required: true })}
												/>
											</div>
											<div className="flex flex-col gap-2 w-full sm:w-1/2">
												<label className="text-md">Emergency #</label>
												<input
													type="text"
													placeholder="+19671111567"
													className="input w-full border-neutral"
													{...register("driverEmergencyPhone")}
												/>
											</div>
										</div>
										<div className="divider" />
										<h2 className="text-xl">Driver Files</h2>
										<p className="text-md mb-4 pl-8">
											Add information about the driver such as licenses, certifications etc.
										</p>
										<div>
											<h2 className="text-md">Upload Files</h2>
											<p className="text-sm pl-4 text-slate-500">
												Add any and all documents relating to your insurance. Once validated, we
												will clear your account so you can manage your deliveries
											</p>
											<p className="text-sm pl-4 text-slate-500">
												*Max of 10 files allowed (JPG, JPEG, PDF, PNG supported)
											</p>
											<div className="my-2 w-full sm:w-1/2">
												<div className="mt-1 flex">
													<FileUploader
														uploadedFiles={uploadedFiles}
														handleUploadedFiles={handleUploadedFiles}
														userToken={userToken}
														handleUploadedFileRemove={handleUploadedFileRemove}
													/>
												</div>
											</div>
										</div>

										<div className="flex justify-end mt-4">
											<button
												className="btn btn-primary"
												form="carrierOnboardDriversForm"
												type="submit"
											>
												Save All
											</button>
										</div>
									</form>
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
			userToken,
			userData,
			requiresVerify
		}
	};
};
