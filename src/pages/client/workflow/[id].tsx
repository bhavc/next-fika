import Router from "next/router";

import ClientLayout from "@/layouts/ClientLayout";

import type { GetServerSideProps } from "next";

export default function WorkflowId() {
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
	const queryParams = context.query;
	const workflowId = queryParams.id;

	// get the workflow here with all data
	// render the data however

	return {
		props: {
			workflows: 123
		}
	};
};
