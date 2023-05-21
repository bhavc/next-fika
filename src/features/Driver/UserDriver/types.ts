export type UserDriverStatus = "Pending" | "Activated" | "Banned" | "Deleted";

export type UserDriver = {
	id: number;
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
	driverFileData: any[];
	bucketStorageUrls: any[] | null;
	role: string;
	status: UserDriverStatus | null;
};
