const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

import { Fetch } from "./fetchWrapper";

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

export const onboardDriver = async ({
	userToken,
	body
}: {
	userToken: string | undefined;
	body: any;
}) => {
	const response = await Fetch({
		method: "POST",
		userToken,
		body,
		url: `auth/onboardDriver`
	});

	if (!response.ok) {
		throw new Error("onboardDriver - could not onboard new driver");
	}

	return response.json();
};
