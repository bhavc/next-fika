const favoriteCarriers = [
	{
		id: 1,
		companyName: "Company 1",
		logo: "Logo here",
		isFavorite: false,
		areasServiced: ["Local", "Provincial"]
	},
	{
		id: 2,
		companyName: "Company 2",
		logo: "Logo here",
		isFavorite: true,
		areasServiced: ["Local", "Provincial"]
	},
	{
		id: 3,
		companyName: "Company 3",
		logo: "Logo here",
		isFavorite: false,
		areasServiced: ["Local", "Provincial", "Cross Country", "Cross Border"]
	}
];

const restCarriers = [
	{
		id: 4,
		companyName: "Company 1",
		logo: "Logo here",
		isFavorite: false,
		areasServiced: ["Local", "Provincial"]
	},
	{
		id: 5,
		companyName: "Company 2",
		logo: "Logo here",
		isFavorite: true,
		areasServiced: ["Local", "Provincial"]
	},
	{
		id: 6,
		companyName: "Company 3",
		logo: "Logo here",
		isFavorite: false,
		areasServiced: ["Local", "Provincial", "Cross Country", "Cross Border"]
	},
	{
		id: 7,
		companyName: "Company 1",
		logo: "Logo here",
		isFavorite: false,
		areasServiced: ["Local", "Provincial"]
	},
	{
		id: 8,
		companyName: "Company 2",
		logo: "Logo here",
		isFavorite: true,
		areasServiced: ["Local", "Provincial"]
	},
	{
		id: 9,
		companyName: "Company 3",
		logo: "Logo here",
		isFavorite: false,
		areasServiced: ["Local", "Provincial", "Cross Country", "Cross Border"]
	}
];

export const getCarriers = async (userToken: string | undefined, region: string) => {
	// const response = await fetch(`${BASE_URL}/auth/login`, {
	// 	method: "POST",
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 		Authorization: `Bearer ${userToken}`
	// 	},
	// 	body: JSON.stringify(data)
	// });

	// if (!response.ok) {
	// 	const text = await response.text();
	// 	throw new Error(text);
	// }

	// return response.json();

	const carriers = {
		favoriteCarriers,
		restCarriers
	};

	return carriers;
};
