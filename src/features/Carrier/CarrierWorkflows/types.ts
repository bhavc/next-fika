import type { UserCarrier } from "@/features/Carrier/UserCarrier/types";

export type CarrierWorkflowStatus =
	| "Draft"
	| "Triage"
	| "Counter Price"
	| "Allocated"
	| "In Progress"
	| "Delivered"
	| "Rejected"
	| "Cancelled"
	| "Deleted";

export type CarrierWorkflowActiveStatus = "Triage" | "Counter Price" | "Allocated" | "In Progress";
export type CarrierWorkflowInactiveStatus = "Delivered" | "Rejected" | "Cancelled" | "Deleted";

export type FileType = {
	name: string;
	type: string;
	url: string;
	blob: string;
};

export type CarrierWorkflowAddressDataType = {
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

export type CarrierWorkflowContainerDataType = {
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

export type CarrierWorkflowAssignedVehicleDataType = {
	vehicleNumber?: string;
};

export type WorkflowPriceDataType = {
	acceptedByCarrier?: boolean;
	acceptedByShipper?: boolean;
	acceptedDate?: null;
	id?: number;
	price?: number;
};

export type AssignedDriverType = {
	id: number;
	firstName?: string;
	lastName?: string;
	username?: string;
};

export type CarrierWorkflowType = {
	id: string;
	userId: string;
	status: CarrierWorkflowStatus;
	selectedCarrier: UserCarrier;
	assignedDriver?: AssignedDriverType;
	workflowAddressData: CarrierWorkflowAddressDataType;
	workflowContainerData: CarrierWorkflowContainerDataType;
	workflowAssignedVehicle: CarrierWorkflowAssignedVehicleDataType;
	workflowPriceData: WorkflowPriceDataType;
	shipperNotes: string;
	carrierNotes: string;
	uploadedFiles: FileType[];
	fileUrls: FileType[];
	createdAt: string;
	modifiedAt: string;
};

export type CarrierWorkflowStatusType = {
	[key: string]: string;
};

export type CarrierWorkflowNotesType = {
	id: number;
	message: string;
	user_from: number;
	user_to: number;
	workflow_id: number;
	modified_at: string;
	created_at: string;
};
