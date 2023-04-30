import { Fetch } from "./fetchWrapper";

export const getWorkflowNotesByWorkflowId = async ({
	userToken,
	workflowId,
	userTo
}: {
	userToken: string;
	workflowId: string;
	userTo?: string;
}) => {
	// might need query params in here sometime
	const url = `workflow/${workflowId}/notes/${userTo}`;

	const response = await Fetch({
		method: "GET",
		userToken,
		url
	});

	if (!response.ok) {
		throw new Error("getWorkflowNotesByWorkflowId - could not get workflow notes");
	}

	return response.json();
};
