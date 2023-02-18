import Router from "next/router";

import ClientNavBar from "@/components/Nav/ClientNavbar";

import type { GetServerSideProps } from "next";

export default function WorkflowId() {
	const leftSideItems = [
		<button key="goback" onClick={() => Router.back()} className="btn btn-primary text-white">
			Back
		</button>
	];

	return (
		<>
			<ClientNavBar leftSideItems={leftSideItems} />
			<main className="items-center justify-center px-4">
				<h1 className="text-3xl mt-2 mb-4 text-left">Workflow: </h1>
			</main>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	console.log(context.query);
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
