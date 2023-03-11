import { Fetch } from "./fetchWrapper";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const uploadFile = async (file: File) => {
	const formData = new FormData();
	formData.append("file", file, file.name);

	const response = await fetch(`${BASE_URL}/fileUpload/file`, {
		method: "POST",
		body: formData
	});

	if (!response.ok) {
		throw new Error("uploadFile - could not upload file");
	}

	return response.json();
};

export const uploadFiles = async (userToken: string, files: File[]) => {
	const formData = new FormData();

	for (const file of files) {
		formData.append("file", file, file.name);
	}

	const response = await Fetch({
		method: "POST",
		userToken,
		body: formData,
		url: "fileUpload/file",
		isFormData: true
	});

	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}

	return response.json();
};

export const updateProfileImage = async (userToken: string, files: File[]) => {
	const formData = new FormData();

	for (const file of files) {
		formData.append("file", file, file.name);
	}

	const response = await Fetch({
		method: "POST",
		userToken,
		body: formData,
		url: "user/editUserProfileImage",
		isFormData: true
	});

	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}

	return response.json();
};
