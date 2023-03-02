import { WorkflowStatus } from "./types";

export const valueToDimensionsMap: { [key: string]: { [innerKey: string]: string } } = {
	"0": {
		value: "0",
		name: "20 ft dry shipping container",
		height: `7' 6 ¼"`,
		width: `7' 8 ⅝"`,
		length: `19' 4 ¼"`
	},
	"1": {
		value: "1",
		name: "40 ft dry shipping container",
		height: `7' 10 ¼"`,
		width: `7' 8 ⅝"`,
		length: `37' 11 ¼"`
	},
	"2": {
		value: "2",
		name: "40 ft high cube standard shipping container",
		height: `8' 10 ⅛"`,
		width: `7' 8 ⅝"`,
		length: `39' 5 ⅝"`
	},
	"3": {
		value: "3",
		name: "45 ft high cube standard shipping container",
		height: `8' 10"`,
		width: `7' 11"`,
		length: `44' 4 ¾"`
	},
	"4": {
		value: "4",
		name: "20 ft ventilated shipping container",
		height: `7' 10 ¼"`,
		width: `7' 8 ⅝"`,
		length: `19' 4 ¼"`
	},
	"5": {
		value: "5",
		name: "20 ft refrigerated shipping container",
		height: `7' 4 ⅞"`,
		width: `7'6"`,
		length: `17' 11 ⅝"`
	},
	"6": {
		value: "6",
		name: "40 ft refrigerated shipping container",
		height: `7' 6 ¼"`,
		width: `7' 8 ⅝"`,
		length: `19' 4 ¼"`
	},
	"7": {
		value: "7",
		name: "20 ft flat rack shipping container",
		height: `7' 3 ⅞"`,
		width: `8'`,
		length: `19' 9 ¾"`
	},
	"8": {
		value: "8",
		name: "40 ft flat rack shipping container",
		height: `7' 5 ⅓"`,
		width: `7' 4"`,
		length: `39' 3 ⅞"`
	},
	"9": {
		value: "9",
		name: "20 ft open top shipping container",
		height: `7' 10 ¼"`,
		width: `7' 8 ⅝"`,
		length: `19' 4 ¼"`
	},
	"10": {
		value: "10",
		name: "20 ft dry shipping container",
		height: `7' 10 ¼"`,
		width: `7' 8 ⅝"`,
		length: `39' 5 ⅝"`
	},
	"11": {
		value: "11",
		name: "20 ft ISO tank shipping container",
		height: `8' 6"`,
		width: `8'`,
		length: `20"`
	}
};

export const mapSelectedCargoValueToDimensions = (selectedNumber: string) => {
	if (selectedNumber in valueToDimensionsMap) {
		return valueToDimensionsMap[selectedNumber];
	}

	return {
		value: null,
		name: "",
		height: "",
		width: "",
		length: ""
	};
};

export const mapWorkflowTableListBadgeColorToStatus = (workflowStatus: WorkflowStatus) => {
	switch (workflowStatus) {
		case "Draft":
			return "slate-200";
		case "Triage":
			return "secondary-content";
		case "In Progress":
			return "warning";
		case "Shipped":
			return "success";
		case "Cancelled":
			return "error";
		default:
			return "slate-200";
	}
};
