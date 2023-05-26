export type DriverWorkflowStatus =
	| "Draft"
	| "Triage"
	| "Counter Price"
	| "Allocated"
	| "In Progress"
	| "Delivered"
	| "Rejected"
	| "Cancelled"
	| "Deleted";

export type UserCarrier = {
	id: number | null;
	companyName: string;
	address: string | null;
	phoneNumber: string | null;
	emergencyNumbers: string | null;
	gender: string | null;
	languagesSupported: string[] | null;
	hasSmartphoneAccess: boolean | null;
	hasLivetrackingAvailable: boolean | null;
	hasDashcamSetup: boolean | null;
	areasServiced: string[] | null;
	regionServiced: string[] | null;
	avatarImageData: any | null;
	insuranceFileData: { name: string; blobName: string; type: string }[] | null;
	bucketStorageUrls: any[] | null;
	role: string;
	status: string;
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

export type FileType = {
	name: string;
	type: string;
	url: string;
	blob: string;
};

export type DriverWorkflowType = {
	id: string;
	// Todo: remove user_for?
	user_for: string;
	status: DriverWorkflowStatus;
	selectedCarrier: UserCarrier;
	workflowAddressData: WorkflowAddressDataType;
	workflowContainerData: WorkflowContainerDataType;
	shipperNotes: string;
	carrierNotes: string;
	uploadedFiles: FileType[];
	fileUrls: FileType[];
	createdAt: string;
	modifiedAt: string;
};
