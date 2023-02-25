const BASE_URL = process.env.API_BASE_URL_LOCAL;

export const getCurrentUser = async (userToken: string | undefined) => {
	const response = await fetch(`${BASE_URL}/user/current`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userToken}`
		}
	});

	if (!response.ok) {
		throw new Error("getCurrentUser - could not get current user");
	}

	return response.json();
};
