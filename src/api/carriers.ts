import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { Fetch } from "./fetchWrapper";

export const getCarriers = async ({
	userToken,
	pickupCountry,
	dropoffCountry
}: {
	userToken: string | undefined;
	pickupCountry: string;
	dropoffCountry: string;
}) => {
	const queryParams = new URLSearchParams({
		pickupCountry,
		dropoffCountry
	});

	const response = await Fetch({
		method: "GET",
		userToken,
		url: `user/getCarrierByRegion/?${queryParams}`
	});

	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}

	return response.json();
};
