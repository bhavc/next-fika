export const formatDateStringToDate = (dateString: string) => {
	console.log("date string", dateString);
	const parsedDate = Date.parse(dateString);
	console.log("parsed date", parsedDate);
};
