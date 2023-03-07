type FETCH_METHOD = "GET" | "POST" | "PUT" | "DELETE";

interface FetchProps {
	method: FETCH_METHOD;
	userToken?: string;
	body?: any;
	url: string;
	isAuthRoute?: boolean;
	isFormData?: boolean;
	// headers: { [key: string]: string };
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const Fetch = async ({
	method,
	userToken,
	body,
	url,
	isAuthRoute,
	isFormData
}: FetchProps) => {
	const headers: { [key: string]: string } = {};

	if (isAuthRoute) {
		headers.Authorization = `Bearer ${userToken}`;
	}

	if (!isFormData) {
		headers["Content-Type"] = "application/json";
	}

	const response = await fetch(`${BASE_URL}/${url}`, {
		headers,
		method,
		body: JSON.stringify(body)
	});

	return response;

	// if (!response.ok) {
	// 	throw new Error("");
	// }

	// return response.json();
};
