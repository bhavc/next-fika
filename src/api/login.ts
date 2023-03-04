const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL;

export const postLogin = async (data: any) => {
	const response = await fetch(`${BASE_URL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	});

	if (!response.ok) {
		const text = await response.text();
		throw new Error(text);
	}

	return response.json();
};
