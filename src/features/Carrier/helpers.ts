import { UserCarrier } from "./types";

export const doesUserRequireSettings = (user: UserCarrier) => {
	if (user.areasServiced && user.regionServiced && user.languagesSupported) {
		return false;
	}

	return true;
};
