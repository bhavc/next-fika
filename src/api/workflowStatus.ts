import { Fetch } from "./fetchWrapper";

export const getWorkflowStatusByStatuses = async ({
	userToken,
	workflowId,
	statusList
}: {
	userToken: string;
	workflowId: string;
	statusList?: string[];
}) => {
	// might need query params in here sometime
	const url = `workflow/status/${workflowId}`;

	const response = await Fetch({
		method: "GET",
		userToken,
		url
	});

	if (!response.ok) {
		throw new Error("getWorkflowStatusByStatuses - could not get workflow status");
	}

	return response.json();
};
