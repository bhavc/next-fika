export type UserCarrier = {
	// todo add company address
	id: number | null;
	first_name: string | null;
	last_name: string | null;
	company_name: string;
	company_address: string | null;
	phone_number: string | null;
	emergency_numbers: string | null;
	gender: string | null;
	languages_supported: string[] | null;
	smartphone_access: boolean | null;
	livetracking_available: boolean | null;
	dashcam_setup: boolean | null;
	areas_serviced: string[] | null;
	region_serviced: string[] | null;
	bucket_storage_urls: any[] | null;
	created_at: string;
	modified_at: string;
	role: string;
};
