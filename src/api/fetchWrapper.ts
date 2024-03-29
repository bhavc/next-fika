type FETCH_METHOD = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchProps {
	method: FETCH_METHOD;
	userToken?: string;
	body?: any;
	url: string;
	isFormData?: boolean;
	// headers: { [key: string]: string };
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const Fetch = async ({ method, userToken, body, url, isFormData }: FetchProps) => {
	const headers: { [key: string]: string } = {
		Authorization: `Bearer ${userToken}`
	};

	if (!isFormData) {
		headers["Content-Type"] = "application/json";
	}

	const response = await fetch(`${BASE_URL}/${url}`, {
		headers,
		method,
		body: isFormData ? body : JSON.stringify(body)
	});

	return response;
};
