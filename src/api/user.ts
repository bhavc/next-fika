const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

import { Fetch } from "./fetchWrapper";

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

export const editUserData = async (userToken: string, data: any) => {
	const response = await Fetch({
		method: "PUT",
		userToken,
		body: data,
		url: "user"
	});

	if (!response.ok) {
		const text = await response.text();
		throw new Error(text);
	}

	return response.json();
};
