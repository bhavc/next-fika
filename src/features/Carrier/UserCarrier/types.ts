export type UserCarrier = {
	id: number | null;
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
	status: string;
};
