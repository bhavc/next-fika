import { Fetch } from "./fetchWrapper";

export const getDrivers = async ({ userToken }: { userToken: string }) => {
	const response = await Fetch({
		method: "GET",
		userToken,
		url: `user/getDriversByCompany`
	});

	if (!response.ok) {
		throw new Error("getDrivers - could not get drivers");
	}

	return response.json();
};
