import { useState, useRef, MouseEvent, ChangeEvent, use } from "react";
import CarrierLayout from "@/layouts/CarrierLayout";

import { getCurrentUser } from "@/api/user";

import type { GetServerSideProps } from "next";

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

export default function Settings() {
	const hiddenFileInput = useRef<HTMLInputElement>(null);

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		hiddenFileInput?.current?.click();
	};

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.currentTarget.files?.[0];

		// make a request to the backend
	};

	return (
		<>
			<CarrierLayout>
				<main className="items-center justify-center">
					<h1 className="text-3xl text-left my-4 ml-4">Settings</h1>

					<div className="px-4">
						<div className="card bg-base-100 shadow-2xl mb-2">
							<div className="card-body">
								<div className="flex flex-row gap-10 justify-between">
									<div>
										<h2 className="text-xl mb-4">Company Logo</h2>
										<input
											type="file"
											id="imgupload"
											className="hidden"
											ref={hiddenFileInput}
											onChange={handleFileChange}
										/>
										<div>
											<button className="avatar placeholder" onClick={handleClick}>
												<div className="bg-neutral-focus text-neutral-content rounded-full w-24">
													<div className="text-3xl">K</div>
												</div>
											</button>
										</div>
									</div>
								</div>

								<div className="divider" />

								<div className="flex flex-row gap-4 w-full">
									<div className="flex flex-col gap-2 w-5/12">
										<label className="text-xl">Company Name</label>
										<input
											type="text"
											placeholder="Fika Ltd."
											className="input w-full border-neutral"
										/>
									</div>
									<div className="flex flex-col gap-2 w-5/12">
										<label className="text-xl">Address</label>
										<input
											type="text"
											placeholder="123 Some street"
											className="input w-full border-neutral"
										/>
									</div>
								</div>
								<div className="flex flex-row flex-wrap gap-4 w-full">
									<div className="flex flex-col gap-2 w-5/12">
										<label className="text-xl">Phone #</label>
										<input
											type="text"
											placeholder="+19671111567"
											className="input w-full border-neutral"
										/>
									</div>
									<div className="flex flex-col gap-2 w-5/12">
										<label className="text-xl">Emergency #</label>
										<input
											type="text"
											placeholder="+19671111567"
											className="input w-full border-neutral"
										/>
									</div>
									<div className="flex flex-col gap-2 w-5/12">
										<label className="text-xl">Email</label>
										<input
											type="text"
											placeholder="fikafreight@gmail.com"
											className="input w-full border-neutral"
										/>
									</div>
								</div>

								<div className="divider" />
								<div className="flex flex-row gap-4 w-full">
									<div className="flex flex-col gap-2 w-full">
										<label className="text-xl">Specify Regions where you are able to ship to</label>
										<p className="pl-2">*Multiple select is allowed</p>
										<select
											className={`select w-full max-w-s border-neutral`}
											defaultValue={[]}
											multiple
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
								<div className="flex flex-row gap-4 w-full">
									<div className="flex flex-col gap-2 w-full">
										<label className="text-xl">Specify Areas serviced</label>
										<p className="pl-2">*Multiple select is allowed</p>
										<select
											className={`select w-full max-w-s border-neutral`}
											defaultValue={[]}
											multiple
											size={5}
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
									<div className="flex flex-col gap-2 w-full">
										<label className="text-xl">Languages Supported</label>
										<textarea
											placeholder="English, French, Swahili"
											className="input w-full h-20 border-neutral px-4 py-2"
										/>
									</div>
								</div>
								<div className="flex flex-col flex-wrap gap-4 w-full">
									<div className="flex flex-row gap-2 w-5/12">
										<label className="">Smartphone access available to drivers?</label>
										<input type="checkbox" className="checkbox border-neutral" />
									</div>
									<div className="flex flex-row gap-2 w-5/12">
										<label className="">Live tracking available to drivers?</label>
										<input type="checkbox" className="checkbox border-neutral" />
									</div>
									<div className="flex flex-row gap-2 w-5/12">
										<label className="">Dashcam setup available to drivers?</label>
										<input type="checkbox" className="checkbox border-neutral" />
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

	let userData = {};

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

	console.log("userData", userData);

	return {
		props: {
			userData
		}
	};
};
