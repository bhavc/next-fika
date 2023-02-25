const BASE_URL = process.env.API_BASE_URL_LOCAL;

export const postRegister = async (data: any) => {
	const response = await fetch(`${BASE_URL}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	});

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json();
};
