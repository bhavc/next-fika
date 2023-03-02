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
};

export type WorkflowAddressData = {
	t1Number?: string;
	bolNumber?: string;
	pickupCity: string;
	dropoffCity: string;
	pickupWindow: string;
	dropoffWindow: string;
	pickupAddress: string;
	pickupCountry: string;
	borderCrossing?: string;
	dropoffAddress: string;
	dropoffCountry: string;
	pickupProvince: string;
	shipmentNumber: string;
	containerNumber: string;
	dropoffProvince: string;
	pickupCompanyName: string;
	pickupContactName: string;
	dropoffCompanyName: string;
	dropoffContactName: string;
	pickupContactPhone: string;
	dropoffContactPhone: string;
	pickupAppointmentNeeded?: boolean;
	dropOffAppointmentNeeded?: boolean;
};

export type WorkflowContainerData = {
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

export type WorkflowNotes = {
	notes?: string;
};

export type Workflow = {
	id: string;
	user_for: string;
	status: WorkflowStatus;
	workflowAddressData: WorkflowAddressData;
	workflowContainerData: WorkflowContainerData;
	workflowNotes: WorkflowNotes;
	file_urls: FileType[];
	created_at: string;
	modified_at: string;
};
