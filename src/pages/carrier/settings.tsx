import { useState, useRef, MouseEvent, ChangeEvent } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import Image from "next/image";

import CarrierLayout from "@/layouts/CarrierLayout";
import GoogleAddressAutocomplete from "@/components/GoogleAddressAutocomplete/GoogleAddressAutocomplete";
import FileUploader from "@/components/FileUploader";

import { updateProfileImage } from "@/api/fileUpload";
import { getCurrentUser, editUserData } from "@/api/user";

import { doesUserRequireSettings } from "@/features/Carrier/helpers";

import type { GetServerSideProps } from "next";
import type { UserCarrier } from "@/features/Carrier/types";

import AlertIcon from "public/svg/alert-circle.svg";

const regionsServiced = [
	{ id: 1, label: "North America", value: "northAmerica" },
	{ id: 2, label: "Africa", value: "africa" }
];

export type AreasServiced = "Local" | "Provincial" | "Cross Country" | "Cross Border";

const areasServices = [
	{ id: 1, label: "Local", value: "local" },
	{ id: 2, label: "Provincial", value: "provincial" },
	{ id: 3, label: "Cross Country", value: "crossCountry" },
	{ id: 4, label: "Cross Border", value: "crossBorder" }
];

export type WorkflowFormAddressInputs = {
	clientCompanyName: string;
	clientCompanyAddress: string;
	clientCompanyPhone: string;
	clientCompanyEmergencyPhone: string;
	clientCompanyEmail: string;
	clientCompanyPassword: string;
	clientRegionsServiced: string[];
	clientAreasServiced: string[];
	clientLanguagesSupported: string[];
	clientHasSmartphoneAccess: boolean;
	clientHasLiveTracking: boolean;
	clientHasDashcam: boolean;
};

export default function Settings({
	userData,
	requiresVerify,
	userToken
}: {
	userData: UserCarrier;
	requiresVerify: boolean;
	userToken: string;
}) {
	const clientCompanyName = userData.companyName;
	const clientCompanyAddress = userData.companyAddress || "";
	const clientCompanyPhone = userData.phoneNumber || "";
	const clientCompanyEmergencyPhone = userData.emergencyNumbers || "";
	const clientRegionsServiced = userData.regionServiced || [];
	const clientAreasServiced = userData.areasServiced || [];
	const clientLanguagesSupported = userData.languagesSupported || [];
	const clientHasSmartphoneAccess = Boolean(userData.hasSmartphoneAccess);
	const clientHasLiveTracking = Boolean(userData.hasLivetrackingAvailable);
	const clientHasDashcam = Boolean(userData.hasDashcamSetup);
	const clientAvatar = userData.avatarImageData;
	const clientInsuranceFileData = userData.insuranceFileData || [];

	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<WorkflowFormAddressInputs>({
		defaultValues: {
			clientCompanyName,
			clientCompanyAddress,
			clientCompanyPhone,
			clientCompanyEmergencyPhone,
			clientRegionsServiced,
			clientAreasServiced,
			clientLanguagesSupported,
			clientHasSmartphoneAccess,
			clientHasLiveTracking,
			clientHasDashcam
		}
	});

	const [avatarData, setAvatarData] = useState<{
		url: string;
		name: string;
		type: string;
		blobName: string;
	}>(clientAvatar);
	const [isLoading, setIsLoading] = useState(true);
	const [uploadedFiles, setUploadedFiles] = useState<any[]>(clientInsuranceFileData);

	const hiddenFileInput = useRef<HTMLInputElement>(null);

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		event.preventDefault();
		hiddenFileInput?.current?.click();
	};

	const handleUploadedFiles = (data: any[]) => {
		setUploadedFiles(data);
	};

	const handleUploadedFileRemove = (event: MouseEvent<HTMLElement>, key: number) => {
		event.preventDefault();
		const uploadedFilesCopy = [...uploadedFiles];
		uploadedFilesCopy.splice(key, 1);
		setUploadedFiles(uploadedFilesCopy);
	};

	const handleProfileImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
		setIsLoading(true);
		const file = event.currentTarget.files?.[0];

		if (!file) {
			return;
		}

		const fileType = file.type;
		const splitFileType = fileType.split("/");

		if (!splitFileType || splitFileType.length < 1 || splitFileType[0] !== "image") {
			toast.error("Please choose a different file type");
		}

		const fileList = [file];
		// make a request to the backend
		try {
			const res = await updateProfileImage(userToken, fileList);
			const avatarDataResponse = res.data;

			setAvatarData(avatarDataResponse);
			toast.success(res.message);
		} catch (err) {
			toast.error("Error uploading image. Please try again later");
		} finally {
			setIsLoading(false);
		}
	};

	const onSubmit: SubmitHandler<WorkflowFormAddressInputs> = async (data) => {
		try {
			const profileSubmitData = {
				...data,
				carrierInsuranceFiles: uploadedFiles
			};

			const response = await editUserData(userToken, profileSubmitData);
			// todo: add react query here

			toast.success(response.message);
		} catch (err) {
			console.log("err", err);
			toast.error("Error updating user");
		}
	};

	const mapImageUploadStatusToComponent = () => {
		if (avatarData) {
			return <Image src={avatarData.url} alt="profile" width={24} height={24} />;
		} else if (isLoading) {
			return <progress className="progress progress-white w-24"></progress>;
		}

		return <div className="text-3xl">P</div>;
	};

	return (
		<>
			<CarrierLayout>
				<main className="items-center justify-center">
					{requiresVerify && (
						<div className="flex align-middle justify-center mt-4">
							<div className="alert alert-info align-middle justify-center shadow-lg w-5/6">
								<div>
									<AlertIcon />
									<span className="text-white">
										Before you get started, we need some information from you.
									</span>
								</div>
							</div>
						</div>
					)}
					<h1 className="text-3xl text-left my-4 ml-4">Settings</h1>

					<div className="px-4">
						<div className="card bg-base-100 shadow-2xl mb-2">
							<div className="card-body">
								<form id="carrierSettingsForm" onSubmit={handleSubmit(onSubmit)}>
									<h2 className="text-xl mb-4">Company Logo</h2>
									<div className="flex flex-row gap-10 justify-between">
										<div className="ml-8">
											<input
												type="file"
												className="hidden"
												ref={hiddenFileInput}
												onChange={handleProfileImageChange}
											/>
											<div>
												<button className="avatar placeholder" onClick={handleClick}>
													<div className="bg-neutral-focus text-neutral-content rounded-full w-24">
														{mapImageUploadStatusToComponent()}
													</div>
												</button>
											</div>
										</div>
										<div className="flex justify-center items-end">
											<p className="text-sm pl-4 text-slate-500">
												*Set an avatar for your company so shippers can find you more easily
											</p>
										</div>
									</div>

									<div className="divider" />

									<div className="flex flex-row flex-wrap gap-4 w-full">
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<div>
												<label className="text-xl">Company Name</label>
											</div>
											<input
												type="text"
												placeholder="Fika Ltd."
												className={`input w-full ${
													errors.clientCompanyName ? "border-error" : "border-neutral"
												}`}
												{...register("clientCompanyName")}
											/>
										</div>
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<div>
												<label className="text-xl">Address</label>
												<p className="text-sm pl-4 text-error">*Required</p>
											</div>
											<Controller
												name="clientCompanyAddress"
												// rules={{
												// 	required: true
												// }}
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
												<label className="text-xl">Phone #</label>
											</div>
											<input
												type="text"
												placeholder="+19671111567"
												className={`input w-full ${
													errors.clientCompanyPhone ? "border-error" : "border-neutral"
												}`}
												{...register("clientCompanyPhone")}
											/>
										</div>
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<label className="text-xl">Emergency #</label>
											<input
												type="text"
												placeholder="+19671111567"
												className="input w-full border-neutral"
												{...register("clientCompanyEmergencyPhone")}
											/>
										</div>
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<label className="text-xl">Email</label>
											<p className="text-sm pl-4 text-slate-500">
												*Can not change email at this time. If you would like to change your email,
												please reach out to us
											</p>
											<input
												type="text"
												placeholder="fikafreight@gmail.com"
												className="input w-full border-neutral"
												disabled
												{...register("clientCompanyEmail")}
											/>
										</div>
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<label className="text-xl">Password</label>
											<p className="text-sm pl-4 text-slate-500">
												*Can not change password at this time. If you would like to change your
												password, please reach out to us
											</p>
											<input
												type="text"
												placeholder="********"
												className="input w-full border-neutral"
												disabled
												{...register("clientCompanyPassword")}
											/>
										</div>
									</div>
									<div className="divider" />

									<div>
										<h2 className="text-xl">Upload Files</h2>
										<p className="text-sm pl-4 text-slate-500">
											Add any and all documents relating to your insurance. Once validated, we will
											clear your account so you can manage your deliveries
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
									<div className="divider" />

									<div className="flex flex-row gap-4 w-full mb-4">
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<div>
												<label className="text-xl">
													Specify Regions where you are able to ship to
												</label>
												<p className="text-sm pl-4 text-error">*Required. Select all that apply</p>
											</div>
											<select
												className={`select w-full max-w-s ${
													errors.clientAreasServiced ? "border-error" : "border-neutral"
												}`}
												defaultValue={[]}
												multiple
												{...register("clientAreasServiced")}
											>
												<option value="" disabled>
													Choose a region
												</option>
												{regionsServiced.map((region) => {
													return (
														<option key={region.id} value={region.value}>
															{region.label}
														</option>
													);
												})}
											</select>
										</div>
									</div>
									<div className="flex flex-row gap-4 w-full mb-4">
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<div>
												<label className="text-xl">Specify Areas serviced</label>
												<p className="text-sm pl-4 text-error">*Required. Select all that apply</p>
											</div>
											<select
												className={`select w-full max-w-s ${
													errors.clientAreasServiced ? "border-error" : "border-neutral"
												}`}
												defaultValue={[]}
												multiple
												size={5}
												{...register("clientRegionsServiced")}
											>
												<option value="" disabled>
													Choose an area
												</option>
												{areasServices.map((region) => {
													return (
														<option key={region.id} value={region.value}>
															{region.label}
														</option>
													);
												})}
											</select>
										</div>
									</div>
									<div className="flex flex-row flex-wrap gap-4 w-full">
										<div className="flex flex-col gap-2 w-full sm:w-1/2">
											<label className="text-xl">Languages Supported</label>
											<p className="text-sm pl-4 text-error">*Required</p>
											<textarea
												placeholder="English, French, Swahili"
												className={`input w-full h-20 ${
													errors.clientLanguagesSupported ? "border-error" : "border-neutral"
												} px-4 py-2`}
												{...register("clientLanguagesSupported")}
											/>
										</div>
									</div>
									<div className="flex flex-col flex-wrap gap-4 w-full mt-4">
										<div className="flex flex-row gap-2 w-full sm:w-1/2">
											<label className="9o">Smartphone access available to drivers?</label>
											<input
												type="checkbox"
												className="checkbox border-neutral"
												{...register("clientHasSmartphoneAccess")}
											/>
										</div>
										<div className="flex flex-row gap-2 w-full sm:w-1/2">
											<label className="">Live tracking available to drivers?</label>
											<input
												type="checkbox"
												className="checkbox border-neutral"
												{...register("clientHasLiveTracking")}
											/>
										</div>
										<div className="flex flex-row gap-2 w-full sm:w-1/2">
											<label className="">Dashcam setup available to drivers?</label>
											<input
												type="checkbox"
												className="checkbox border-neutral"
												{...register("clientHasDashcam")}
											/>
										</div>
									</div>
									<div className="flex justify-end mt-4">
										<button className="btn btn-primary" form="carrierSettingsForm">
											Save All
										</button>
									</div>
								</form>
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
		firstName: null,
		lastName: null,
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
		console.log("err", err);
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
