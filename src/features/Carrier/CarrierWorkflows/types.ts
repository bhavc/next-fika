export type UserCarrier = {
	id: number | null;
	firstName: string | null;
	lastName: string | null;
	companyName: string;
	companyAddress: string | null;
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
};

export type CarrierWorkflowStatus =
	| "Draft"
	| "Triage"
	| "Allocated"
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

export type CarrierWorkflowAddressDataType = {
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

export type CarrierWorkflowContainerDataType = {
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

export type CarrierWorkflowNotesType = {
	notes?: string;
};

export type CarrierWorkflowType = {
	id: string;
	user_for: string;
	status: CarrierWorkflowStatus;
	selectedCarrier: UserCarrier;
	workflowAddressData: CarrierWorkflowAddressDataType;
	workflowContainerData: CarrierWorkflowContainerDataType;
	workflowNotes: CarrierWorkflowNotesType;
	uploadedFiles: FileType[];
	fileUrls: FileType[];
	createdAt: string;
	modifiedAt: string;
};