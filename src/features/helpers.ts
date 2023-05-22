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

export const shouldRedirectUserDueToIncorrectRole = (
	userType: UserType | undefined,
	userRole: string
) => {
	if (!userType || userType !== userRole) {
		return true;
	}
};
