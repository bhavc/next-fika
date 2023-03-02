import ClientLayout from "@/layouts/ClientLayout";
import Link from "next/link";

import { getWorkflowById } from "@/api/workflow";

import Workflow from "@/features/Client/Workflow/Workflow";

import type { WorkflowType } from "@/features/Client/Workflow/types";
import type { GetServerSideProps } from "next";

import IconLeft from "public/svg/arrow-left.svg";

export default function WorkflowId({ workflow }: { workflow: WorkflowType }) {
	console.log("workflow", workflow);

	return (
		<>
			<ClientLayout>
				<main className="items-center justify-center px-4">
					<div className="flex flex-col w-full bg-slate-100 rounded-b-md p-4 mt-4">
						<Link href={"/client/workflows"} className="btn btn-circle bg-primary">
							<IconLeft />
						</Link>
						<h1 className="text-3xl mt-4 text-left">Delivery</h1>
					</div>

					<Workflow workflow={workflow} />
				</main>
			</ClientLayout>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req, params } = context;
	const workflowId = params?.id;
	const { cookies } = req;
	const userToken = cookies.user;
	let workflowData: WorkflowType | null;

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
				destination: "/client/workflows",
				statusCode: 302
			}
		};
	}

	try {
		const response = await getWorkflowById(userToken, workflowId);
		workflowData = response.workflow;
	} catch (err) {
		workflowData = null;
	}

	if (!workflowData) {
		return {
			redirect: {
				destination: "/client/workflows",
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
