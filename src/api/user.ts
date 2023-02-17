export const getCurrentUser = async (userToken: string | undefined) => {
	const response = await fetch("http://localhost:3000/user/current", {
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
