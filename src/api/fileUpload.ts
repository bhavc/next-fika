const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL;

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

export const uploadFiles = async (files: File[]) => {
	const formData = new FormData();

	for (const file of files) {
		formData.append("file", file, file.name);
	}

	console.log("BASE_URL", BASE_URL);

	const response = await fetch(`${BASE_URL}/fileUpload/file`, {
		method: "POST",
		body: formData
	});

	if (!response.ok) {
		throw new Error("uploadFiles - could not upload files");
	}

	return response.json();
};
