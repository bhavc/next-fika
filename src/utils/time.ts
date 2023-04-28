import moment from "moment";

export const formatDateStringToDate = (dateString: string) => {
	const parsedDate = Date.parse(dateString);
	const momentData = moment(parsedDate).format("dddd MMMM D Y");
	return momentData;
};

export const formatDateStringToDateCalendar = (dateString: string) => {
	const parsedDate = Date.parse(dateString);
	const momentData = moment(parsedDate).calendar();
	return momentData;
};
