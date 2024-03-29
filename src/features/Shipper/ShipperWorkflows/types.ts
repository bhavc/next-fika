import { UserCarrier } from "@/features/Carrier/UserCarrier/types";

export type ShipperWorkflowStatus =
	| "Draft"
	| "Triage"
	| "Counter Price"
	| "Allocated"
	| "In Progress"
	| "Delivered"
	| "Rejected"
	| "Cancelled"
	| "Deleted";

export type FileType = {
	name: string;
	type: string;
	url: string;
	blob: string;
};

export type WorkflowAddressDataType = {
	customsReference?: string;
	bolNumber?: string;
	pickupWindow: string;
	dropoffWindow: string;
	pickupAddress: string;
	borderCrossing?: string;
	dropoffAddress: string;
	cargoReferenceNumber: string;
	pickupNumber: string;
	containerNumber: string;
	pickupCompanyName: string;
	pickupContactName: string;
	dropoffCompanyName: string;
	dropoffContactName: string;
	pickupContactPhone: string;
	dropoffContactPhone: string;
	pickupAppointmentNeeded?: boolean;
	dropOffAppointmentNeeded?: boolean;
};

export type WorkflowContainerDataType = {
	containerWidth: string;
	frozen?: boolean;
	containerHeight: string;
	containerLength: string;
	containerTypeLabel: string;
	damaged?: boolean;
	isHumid?: boolean;
	isReturn?: boolean;
	cargoType: string;
	isDropoff?: boolean;
	netWeight: string;
	sealNumber: string;
	vesselName?: string;
	goodsVolume: string;
	grossWeight: string;
	shippingLine?: string;
	requiresChiller?: boolean;
	returnDepotName?: string;
	goodsDescription: string;
	numberOfPackages: string;
	dropoffTerminalName?: string;
	requiresControlledAtmosphere?: boolean;
};

export type WorkflowPriceDataType = {
	useCustomPricing?: boolean;
	customPrice?: string;
	acceptedByCarrier?: boolean;
	acceptedByShipper?: boolean;
	acceptedDate?: null;
	id?: number;
	price?: number;
};

export type WorkflowNotesType = {
	id: number;
	message: string;
	user_from: number;
	user_to: number;
	workflow_id: number;
	modified_at: string;
	created_at: string;
};

export type ShipperWorkflowType = {
	id: string;
	userId?: string;
	// TODO: remove user_for?
	user_for: string;
	status: ShipperWorkflowStatus;
	selectedCarrier: UserCarrier;
	workflowAddressData: WorkflowAddressDataType;
	workflowContainerData: WorkflowContainerDataType;
	workflowPriceData: WorkflowPriceDataType;
	shipperNotes: string;
	carrierNotes: string;
	uploadedFiles: FileType[];
	fileUrls: FileType[];
	createdAt: string;
	modifiedAt: string;
};
