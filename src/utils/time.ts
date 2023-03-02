import moment from "moment";

export const formatDateStringToDate = (dateString: string) => {
	const parsedDate = Date.parse(dateString);
	const momentData = moment(parsedDate).format("dddd MMMM D Y");
	return momentData;
};
