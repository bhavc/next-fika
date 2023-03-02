const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL;

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
	const response = await fetch(`${BASE_URL}/workflow/`, {
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

export const getWorkflowById = async (userToken: string | undefined, workflowId: string) => {
	const response = await fetch(`${BASE_URL}/workflow/${workflowId}`, {
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
