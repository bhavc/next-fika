import { UserCarrier } from "./types";

export const doesUserRequireSettings = (user: UserCarrier) => {
	return !user.areas_serviced || !user.region_serviced || !user.languages_supported;
};
