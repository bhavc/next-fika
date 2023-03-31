import { Fetch } from "./fetchWrapper";

export const getDriversByCompany = async ({
	userToken,
	statusList
}: {
	userToken: string;
	statusList?: string[];
}) => {
	let url = `user/getDriversByCompany`;

	if (statusList && statusList.length > 0) {
		const queryParams = new URLSearchParams(
			statusList.map((status) => ["status", status])
		).toString();

		url = `user/getDriversByCompany?${queryParams}`;
	}

	const response = await Fetch({
		method: "GET",
		userToken,
		url
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
	data
}: {
	userToken: string;
	driverId: string;
	data: any;
}) => {
	const response = await Fetch({
		method: "PUT",
		userToken,
		body: data,
		url: `user/${driverId}`
	});

	if (!response.ok) {
		throw new Error("removeDriverFormOrganization - could not get driver");
	}

	return response.json();
};
