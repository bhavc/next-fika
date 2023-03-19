import { Fetch } from "./fetchWrapper";

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
