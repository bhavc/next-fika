export const postRegister = async (data: any) => {
	const response = await fetch(`http://localhost:3000/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	});

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json();
};
