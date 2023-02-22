import type { GetServerSideProps } from "next";

import ClientLayout from "@/layouts/ClientLayout";
import WorkflowTableList from "@/features/Client/Workflow/WorkflowTableList";

export default function Workflows({ workflows }: { workflows: any[] }) {
	return (
		<>
			<ClientLayout>
				<main className="items-center justify-center px-4">
					<h1 className="text-3xl mt-2 mb-4 text-left">View your past Workflows</h1>
					<WorkflowTableList />
				</main>
			</ClientLayout>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const workflows = [
		{
			id: 1,
			date: "123",
			status: "Triage",
			type: "Delivery"
		},
		{
			id: 2,
			date: "123",
			status: "Progress",
			type: "Delivery"
		}
	];

	return {
		props: {
			workflows
		}
	};
};
