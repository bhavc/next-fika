import Image from "next/image";
import { useState, useRef, MouseEvent, ChangeEvent } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";

import DriverLayout from "@/layouts/DriverLayout";
import GoogleAddressAutocomplete from "@/components/GoogleAddressAutocomplete/GoogleAddressAutocomplete";

import { updateProfileImage } from "@/api/fileUpload";
import { getCurrentUser, editUserData } from "@/api/user";
import { shouldRedirectUserDueToIncorrectRole } from "@/features/helpers";

import type { GetServerSideProps } from "next";
import type { UserDriver } from "@/features/Driver/UserDriver/types";

import AlertIcon from "public/svg/alert-circle.svg";

export type DriverProfileFormInputs = {
	driverUserName: string;
	driverAddress: string;
	driverCompanyName: string;
	driverEmergencyNumbers: string[];
	driverFirstName: string;
	driverLastName: string;
	driverEmail: string;
	driverPhoneNumber: string | null;
};

export default function DriverSettings({
	requiresVerify,
	userData,
	userToken
}: {
	requiresVerify: boolean;
	userData: UserDriver;
	userToken: string;
}) {
	const driverAvatar = userData.avatarImageData;
	const driverUserName = userData.username;
	const driverEmail = userData.email;
	const driverFirstName = userData.firstName;
	const driverLastName = userData.lastName;
	const driverAddress = userData.address || "";
	const driverCompanyName = userData.companyName || "";
	const driverEmergencyNumbers = userData.emergencyNumbers || [];
	const driverPhoneNumber = userData.phoneNumber;

	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<DriverProfileFormInputs>({
		defaultValues: {
			driverUserName,
			driverEmail,
			driverAddress,
			driverFirstName,
			driverLastName,
			driverCompanyName,
			driverEmergencyNumbers,
			driverPhoneNumber
		}
	});

	const [avatarData, setAvatarData] = useState<{
		url: string;
		name: string;
		type: string;
		blobName: string;
	}>(driverAvatar);
	const [isLoading, setIsLoading] = useState(true);

	const hiddenFileInput = useRef<HTMLInputElement>(null);

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		event.preventDefault();
		hiddenFileInput?.current?.click();
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

	const onSubmit: SubmitHandler<DriverProfileFormInputs> = async (data) => {
		try {
			const profileSubmitData = {
				...data
			};

			const response = await editUserData(userToken, profileSubmitData);
			toast.success(response.message);
		} catch (err) {
			console.info("err", err);
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
		<DriverLayout>
			<main className="items-center justify-center">
				{requiresVerify && (
					<div className="flex align-middle justify-center mt-4">
						<div className="alert alert-info align-middle justify-center shadow-lg w-5/6">
							<div>
								<div className="mr-2">
									<AlertIcon />
								</div>
								<span className="text-white">
									Please fill in the information below. Once validated by our team you&apos;ll be
									ready to go!
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
								<h2 className="text-xl mb-4">Avatar</h2>
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
											*Set an profile picture for yourself
										</p>
									</div>
								</div>

								<div className="divider" />

								<div className="flex flex-row flex-wrap gap-4 w-full">
									<div className="flex flex-col gap-2 w-full sm:w-1/2">
										<label className="text-xl">User Name</label>
										<p className="text-sm pl-4 text-slate-500">
											*Can not change password at this time. If you would like to change your
											password, please reach out to us
										</p>
										<input
											type="text"
											placeholder={`${driverUserName ? driverUserName : "*******k"}`}
											className={`input w-full ${
												errors.driverUserName ? "border-error" : "border-neutral"
											}`}
											{...register("driverUserName")}
											disabled
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
											{...register("driverEmail")}
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
										/>
									</div>
									<div className="flex flex-col gap-2 w-full sm:w-1/2">
										<div>
											<label className="text-xl">Address</label>
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
											<label className="text-xl">First Name</label>
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
											<label className="text-xl">Last Name</label>
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
										<label className="text-xl">Phone #</label>
										<input
											type="text"
											placeholder="+19671111567"
											className={`input w-full ${
												errors.driverPhoneNumber ? "border-error" : "border-neutral"
											}`}
											{...register("driverPhoneNumber")}
										/>
									</div>
								</div>
								<div className="divider" />

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
		</DriverLayout>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req } = context;
	const { cookies } = req;
	const userToken = cookies.user;

	let userData: UserDriver = {
		id: -99,
		username: "",
		email: "",
		firstName: "",
		lastName: "",
		companyName: "",
		address: "",
		phoneNumber: null,
		emergencyNumbers: null,
		gender: null,
		avatarImageData: null,
		bucketStorageUrls: [],
		role: "",
		status: null,
		driverFileData: []
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
		const getCurrentUserResponse = await getCurrentUser(userToken);
		userData = getCurrentUserResponse.data;
	} catch (err) {
		console.info("err", err);
	}

	if (shouldRedirectUserDueToIncorrectRole("Driver", userData.role)) {
		return {
			redirect: {
				destination: "/",
				statusCode: 302
			}
		};
	}

	return {
		props: {
			requiresVerify: false,
			userData,
			userToken
		}
	};
};
