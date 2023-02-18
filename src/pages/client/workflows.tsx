import type { GetServerSideProps } from "next";
import Router from "next/router";

import ClientNavBar from "@/components/Nav/ClientNavbar";
import WorkflowCards from "@/features/Client/Workflow/WorkflowCards";

export default function Workflows({ workflows }: { workflows: any[] }) {
	const leftSideItems = [
		<button key="goback" onClick={() => Router.back()} className="btn btn-primary text-white">
			Back
		</button>
	];

	return (
		<>
			<ClientNavBar leftSideItems={leftSideItems} />
			<main className="items-center justify-center px-4">
				<h1 className="text-3xl mt-2 mb-4 text-left">View your past Workflows</h1>
				<WorkflowCards workflows={workflows} />
			</main>
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
