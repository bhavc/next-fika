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

export const getDriverById = async ({
	userToken,
	driverId
}: {
	userToken: string;
	driverId: string;
}) => {
	const response = await Fetch({
		method: "GET",
		userToken,
		url: `user/${driverId}`
	});

	if (!response.ok) {
		throw new Error("getDriverById - could not get driver");
	}

	return response.json();
};

export const removeDriverFormOrganization = async ({
	userToken,
	driverId,
	organizationName
}: {
	userToken: string;
	driverId: string;
	organizationName: string;
}) => {
	const response = await Fetch({
		method: "PUT",
		userToken,
		url: `user/${driverId}`
	});

	if (!response.ok) {
		throw new Error("removeDriverFormOrganization - could not get driver");
	}

	return response.json();
};
