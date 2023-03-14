import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { Fetch } from "./fetchWrapper";

export const getCarriers = async (userToken: string | undefined, carrierCountry: string) => {
	const response = await Fetch({
		method: "GET",
		userToken,
		url: `user/getCarrierByRegion/${carrierCountry}`
	});

	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}

	return response.json();
};
