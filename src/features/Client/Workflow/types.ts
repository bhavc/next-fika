export type WorkflowStatus =
	| "Draft"
	| "Triage"
	| "In Progress"
	| "Shipped"
	| "Cancelled"
	| "Deleted";

export type FileType = {
	name: string;
	type: string;
	url: string;
	blob: string;
};

export type WorkflowAddressDataType = {
	t1Number?: string;
	bolNumber?: string;
	pickupWindow: string;
	dropoffWindow: string;
	pickupAddress: string;
	borderCrossing?: string;
	dropoffAddress: string;
	shipmentNumber: string;
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
	width: string;
	frozen?: boolean;
	height: string;
	length: string;
	damaged?: boolean;
	isHumid?: boolean;
	isReturn?: boolean;
	cargoType: string;
	isDropoff?: boolean;
	netWeight: string;
	sealNumber: string;
	vesselName?: string;
	customPrice?: string;
	goodsVolume: string;
	grossWeight: string;
	shippingLine?: string;
	requiresChiller?: boolean;
	returnDepotName?: string;
	goodsDescription: string;
	numberOfPackages: string;
	useCustomPricing?: boolean;
	dropoffTerminalName?: string;
	requiresControlledAtmosphere?: boolean;
};

export type WorkflowNotesType = {
	notes?: string;
};

export type WorkflowType = {
	id: string;
	user_for: string;
	status: WorkflowStatus;
	workflowAddressData: WorkflowAddressDataType;
	workflowContainerData: WorkflowContainerDataType;
	workflowNotes: WorkflowNotesType;
	uploadedFiles: FileType[];
	file_urls: FileType[];
	created_at: string;
	modified_at: string;
};
