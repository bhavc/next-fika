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

export const postWorkflowNotesByWorkflowId = async ({
	userToken,
	workflowId,
	userTo,
	message
}: {
	userToken: string;
	workflowId: string;
	userTo: number | null;
	message: string;
}) => {
	const url = `workflow/${workflowId}/notes/${userTo}`;

	const response = await Fetch({
		method: "POST",
		userToken,
		url,
		body: {
			message
		}
	});

	if (!response.ok) {
		throw new Error("postWorkflowNotesByWorkflowId - could not get workflow notes");
	}

	return response.json();
};
