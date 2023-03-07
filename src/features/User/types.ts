export type UserType = "Shipper" | "Carrier" | "Driver";

export const mapUserTypeToAppRoute = (userType: UserType | undefined) => {
	if (userType === "Carrier") {
		return "/carrier";
	}

	if (userType === "Driver") {
		return "/driver";
	}

	return "/shipper";
};
