import type { UserType } from "@/features/types";

export const mapUserTypeToAppRoute = (userType: UserType | undefined) => {
	if (userType === "Carrier") {
		return "/carrier";
	}

	if (userType === "Driver") {
		return "/driver";
	}

	return "/shipper";
};
