import type { GetServerSideProps } from "next";

export default function WorkflowId() {
	return <div>Client settings</div>;
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
