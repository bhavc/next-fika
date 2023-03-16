import type { CarrierWorkflowStatus } from "./types";
import type { UserCarrier } from "../UserCarrier/types";

export const mapWorkflowTableListBadgeColorToStatus = (workflowStatus: CarrierWorkflowStatus) => {
	switch (workflowStatus) {
		case "Draft":
			return "slate-200";
		case "Triage":
			return "sky-400";
		case "Allocated":
			return "secondary-content";
		case "In Progress":
			return "warning";
		case "Shipped":
			return "success";
		case "Cancelled":
			return "error";
		case "Rejected":
			return "error";
		default:
			return "slate-200";
	}
};

export const doesUserRequireSettings = (user: UserCarrier) => {
	if (user.areasServiced && user.regionServiced && user.languagesSupported) {
		return false;
	}

	return true;
};
