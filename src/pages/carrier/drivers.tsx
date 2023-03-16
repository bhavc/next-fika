import Link from "next/link";

import { getCurrentUser } from "@/api/user";

import { getWorkflowsForCarrier } from "@/api/workflow";
import { doesUserRequireSettings } from "@/features/Carrier/CarrierWorkflows/helpers";

import CarrierLayout from "@/layouts/CarrierLayout";
import WorkflowTableList from "@/features/Carrier/CarrierWorkflows/AssignedWorkflows";

import type { GetServerSideProps } from "next";
import type { UserCarrier } from "@/features/Carrier/UserCarrier/types";

import AlertIcon from "public/svg/alert-circle.svg";

export default function Drivers({
	workflows,
	requiresVerify
}: {
	workflows: any[];
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
							<h1 className="text-3xl text-left mb-4">Manage your Drivers here</h1>
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
	let workflowData;

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
		// TODO here you want to get the assigned to user workflows
		workflowData = await getWorkflowsForCarrier(userToken);
		console.log("workflowData", workflowData);
		const response = await getCurrentUser(userToken);
		userData = response.data;
	} catch (err) {
		workflowData = null;
		console.info("err", err);
	}

	const requiresVerify = doesUserRequireSettings(userData);
	const workflows = workflowData?.workflows || [];

	return {
		props: {
			workflows,
			requiresVerify
		}
	};
};
