import type { CarrierWorkflowStatus } from "./types";
import type { UserCarrier } from "../UserCarrier/types";

export const doesUserRequireSettings = (user: UserCarrier) => {
	// if user hasnt set areas serviced, regions serviced or languages supported
	// or if the users status is "Pending"

	if (
		!user.areasServiced ||
		!user.regionServiced ||
		!user.languagesSupported ||
		user.status === "Pending"
	)
		if (user.areasServiced && user.regionServiced && user.languagesSupported && user.status) {
			return false;
		}

	return true;
};

export const getCarrierWorkflowModalStatusChangeCopy = (workflowStatus: CarrierWorkflowStatus) => {
	switch (workflowStatus) {
		case "Allocated":
			return {
				titleText: "Allocate Shipment?",
				bodyText:
					"By setting the shipment to Allocated, you are agreeing to being the carrier for the delivery. This means you agree with the price, pickup, delivery and other requests of the shipment"
			};
		case "Counter Price":
			return {
				titleText: "Counter Price",
				bodyText:
					"By countering the price on this shipment, you do not agree to taking on the delivery at the current price. The shipper has the option to renegotiate the price."
			};
		case "Rejected":
			return {
				titleText: "Reject Shipment?",
				bodyText:
					"By Rejecting the shipment, you do not agree to taking on the delivery. This can not be undone."
			};
		default:
			return {
				titleText: "Are you sure?",
				bodyText: "Please confirm the details of the delivery"
			};
	}
};
