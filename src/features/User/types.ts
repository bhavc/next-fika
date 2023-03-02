export type UserType = "Client" | "Dispatcher" | "Driver";

export const mapUserTypeToAppRoute = (userType: UserType | undefined) => {
	if (userType === "Dispatcher") {
		return "/dashboard";
	}

	if (userType === "Driver") {
		return "/driver";
	}

	return "/client";
};
