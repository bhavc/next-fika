import type { GetServerSideProps } from "next";

import { getWorkflowsByUserId } from "@/api/workflow";

import ShipperLayout from "@/layouts/ShipperLayout";
import WorkflowTableList from "@/features/Shipper/Workflow/WorkflowTableList";

export default function Workflows({ workflows }: { workflows: any[] }) {
	return (
		<>
			<ShipperLayout>
				<main className="items-center justify-center">
					<div className="bg-slate-100 mt-4 p-4 rounded-t-md">
						<h1 className="text-3xl text-left mb-4">View your past Workflows</h1>
						<WorkflowTableList workflows={workflows} />
					</div>
				</main>
			</ShipperLayout>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req } = context;
	const { cookies } = req;
	const userToken = cookies.user;
	let workflowData;

	if (!userToken) {
		return {
			redirect: {
				destination: "/",
				statusCode: 302
			}
		};
	}

	try {
		workflowData = await getWorkflowsByUserId(userToken);
	} catch (err) {
		workflowData = null;
	}

	const workflows = workflowData?.workflows || [];

	return {
		props: {
			workflows
		}
	};
};
