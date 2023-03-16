import CarrierLayout from "@/layouts/CarrierLayout";
import Link from "next/link";

import { getWorkflowByWorkflowId } from "@/api/workflow";

import CarrierWorkflow from "@/features/Carrier/CarrierWorkflows/CarrierWorkflow";

import type { CarrierWorkflowType } from "@/features/Carrier/CarrierWorkflows/types";
import type { GetServerSideProps } from "next";

import IconLeft from "public/svg/arrow-left.svg";

export default function WorkflowId({ workflow }: { workflow: CarrierWorkflowType }) {
	return (
		<>
			<CarrierLayout>
				<main className="items-center justify-center px-4">
					<div className="flex flex-col w-full bg-slate-100 rounded-b-md p-4 mt-4">
						<Link href={"/carrier/workflows"} className="btn btn-circle bg-primary">
							<IconLeft />
						</Link>
						<h1 className="text-3xl mt-4 text-left">Delivery</h1>
					</div>

					<CarrierWorkflow workflow={workflow} />
				</main>
			</CarrierLayout>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req, params } = context;
	const workflowId = params?.id;

	const { cookies } = req;
	const userToken = cookies.user;
	let workflowData: CarrierWorkflowType | null;

	if (!userToken) {
		return {
			redirect: {
				destination: "/",
				statusCode: 302
			}
		};
	}

	if (!workflowId || Array.isArray(workflowId)) {
		return {
			redirect: {
				destination: "/carrier/workflows",
				statusCode: 302
			}
		};
	}

	console.log("workflowId", workflowId);

	try {
		const response = await getWorkflowByWorkflowId(userToken, workflowId);
		console.log("do we get here 2");
		workflowData = response.workflow;
	} catch (err) {
		workflowData = null;
	}

	if (!workflowData) {
		return {
			redirect: {
				destination: "/carrier/workflows",
				statusCode: 302
			}
		};
	}

	return {
		props: {
			workflow: workflowData
		}
	};
};
