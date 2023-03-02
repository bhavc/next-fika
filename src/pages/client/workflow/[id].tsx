import ClientLayout from "@/layouts/ClientLayout";

import { getWorkflowById } from "@/api/workflow";

import type { Workflow } from "@/features/Client/Workflow/types";

import type { GetServerSideProps } from "next";

export default function WorkflowId({ workflow }: { workflow: null }) {
	console.log("workflow", workflow);

	return (
		<>
			<ClientLayout>
				<main className="items-center justify-center px-4">
					<h1 className="text-3xl mt-2 mb-4 text-left">Workflow: </h1>
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
	let workflowData: Workflow | null;

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
