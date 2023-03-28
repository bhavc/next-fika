import DriverLayout from "@/layouts/DriverLayout";

import type { GetServerSideProps } from "next";

import AlertIcon from "public/svg/alert-circle.svg";

export default function DriverSettings({ requiresVerify }: { requiresVerify: boolean }) {
	return (
		<DriverLayout>
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

				{/* <div className="px-4">
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
											*Set an profile picture for yourself
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
											{areasServicedOptions.map((area) => {
												return (
													<option key={area.id} value={area.value}>
														{area.label}
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
				</div> */}
			</main>
		</DriverLayout>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	// const { req } = context;
	// const { cookies } = req;
	// const userToken = cookies.user;

	// let userData: UserDriver = {
	// 	id: -99,
	// 	username: "",
	// 	email: "",
	// 	firstName: "",
	// 	lastName: "",
	// 	companyName: "",
	// 	address: "",
	// 	phoneNumber: null,
	// 	emergencyNumbers: null,
	// 	gender: null,
	// 	avatarImageData: null,
	// 	bucketStorageUrls: [],
	// 	role: "",
	// 	status: ""
	// };

	// let workflowsData = [];

	// if (!userToken) {
	// 	return {
	// 		redirect: {
	// 			destination: "/",
	// 			statusCode: 302
	// 		}
	// 	};
	// }

	// try {
	// 	const getCurrentUserResponse = await getCurrentUser(userToken);
	// 	userData = getCurrentUserResponse.data;

	// 	const getDriverAssignedWorkflows = await getWorkflowsForDriver({ userToken });
	// 	workflowsData = getDriverAssignedWorkflows.data;
	// } catch (err) {
	// 	console.info("err", err);
	// }

	return {
		props: {
			requiresVerify: true
		}
	};
};
