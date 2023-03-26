export type UserDriver = {
	id: number | null;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	companyName: string;
	address: string | null;
	phoneNumber: string | null;
	emergencyNumbers: string[] | null;
	gender: string | null;
	avatarImageData: any | null;
	bucketStorageUrls: any[] | null;
	role: string;
	status: string;
};
