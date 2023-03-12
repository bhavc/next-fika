export type UserCarrier = {
	// todo add company address
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
	bucketStorageUrls: any[] | null;
	role: string;
};
