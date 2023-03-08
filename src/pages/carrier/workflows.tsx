import Link from "next/link";

import { getCurrentUser } from "@/api/user";

import { getWorkflowsByUserId } from "@/api/workflow";
import { doesUserRequireSettings } from "@/features/Carrier/helpers";

import CarrierLayout from "@/layouts/CarrierLayout";
import WorkflowTableList from "@/features/Shipper/Workflow/WorkflowTableList";

import type { GetServerSideProps } from "next";
import type { UserCarrier } from "@/features/Carrier/types";

import AlertIcon from "public/svg/alert-circle.svg";

export default function Workflows({
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
							<div className="alert alert-info shadow-lg w-5/6">
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
							<h1 className="text-3xl text-left mb-4">View your past Workflows</h1>
							<WorkflowTableList workflows={workflows} />
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
		first_name: null,
		last_name: null,
		company_name: "",
		phone_number: null,
		emergency_numbers: null,
		gender: null,
		languages_supported: null,
		smartphone_access: null,
		livetracking_available: null,
		dashcam_setup: null,
		areas_serviced: null,
		region_serviced: null,
		bucket_storage_urls: null,
		created_at: "",
		modified_at: "",
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
		workflowData = await getWorkflowsByUserId(userToken);
		const responseData = await getCurrentUser(userToken);
		userData = responseData;
	} catch (err) {
		workflowData = null;
		console.log("err", err);
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
