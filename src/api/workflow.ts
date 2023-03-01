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
		throw new Error("getCurrentUser - could not get current user");
	}

	return response.json();
};
