import { Fetch } from "./fetchWrapper";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createWorkflow = async (userToken: string | undefined, workflowData: any) => {
	const response = await fetch(`${BASE_URL}/workflow/`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userToken}`
		},
		method: "POST",
		body: JSON.stringify(workflowData)
	});

	if (!response.ok) {
		throw new Error("createWorkflow - could not create workflow");
	}

	return response.json();
};

export const getWorkflowsByUserId = async (userToken: string | undefined) => {
	const response = await fetch(`${BASE_URL}/workflow`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userToken}`
		},
		method: "GET"
	});

	if (!response.ok) {
		throw new Error("getWorkflowsByUserId - could not get workflows for user");
	}

	return response.json();
};

export const getWorkflowsForCarrier = async (userToken: string | undefined) => {
	const response = await Fetch({
		method: "GET",
		userToken,
		url: "workflow/carrierFor"
	});

	if (!response.ok) {
		throw new Error("getWorkflowsForCarrier - could not get workflows for user");
	}

	return response.json();
};

export const getWorkflowsForDriver = async ({ userToken }: { userToken?: string }) => {
	const response = await fetch(`${BASE_URL}/workflow/driverFor`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userToken}`
		},
		method: "GET"
	});

	if (!response.ok) {
		throw new Error("getWorkflowsForDriver - could not get workflows for user");
	}

	return response.json();
};

export const getLatestWorkflowsForDriver = async ({ userToken }: { userToken?: string }) => {
	const response = await Fetch({
		method: "GET",
		userToken,
		url: `workflow/driverForLatest`
	});

	if (!response.ok) {
		throw new Error("editWorkflowByWorkflowId - could not edit workflow");
	}

	return response.json();
};

export const getWorkflowByWorkflowId = async (
	userToken: string | undefined,
	workflowId: string
) => {
	const response = await fetch(`${BASE_URL}/workflow/${workflowId}`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userToken}`
		},
		method: "GET"
	});

	if (!response.ok) {
		throw new Error("getWorkflowByWorkflowId - could not get workflows for user");
	}

	return response.json();
};

export const editWorkflowByWorkflowId = async ({
	userToken,
	workflowId,
	body
}: {
	userToken: string | undefined;
	workflowId: string;
	body: any;
}) => {
	const response = await Fetch({
		method: "PATCH",
		userToken,
		body,
		url: `workflow/${workflowId}`
	});

	if (!response.ok) {
		throw new Error("editWorkflowByWorkflowId - could not edit workflow");
	}

	return response.json();
};
