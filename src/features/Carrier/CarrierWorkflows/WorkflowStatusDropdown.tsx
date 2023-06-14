import { ChangeEvent } from "react";
import { CarrierWorkflowType } from "./types";

export default function WorkflowStatusDropdown({
	handleStatusChange,
	newStatus,
	previousStatus,
	workflow,
	bidSelectValue
}: {
	handleStatusChange: (event: ChangeEvent<HTMLSelectElement>) => void;
	newStatus: string;
	previousStatus: string;
	workflow?: CarrierWorkflowType;
	bidSelectValue: string;
}) {
	const statusOptions = [
		{ label: "Triage", value: "Triage", disabled: false },
		{
			label: "Allocated",
			value: "Allocated",
			disabled: ["Rejected", "Cancelled"].includes(previousStatus) || bidSelectValue === "counter"
		},
		{
			label: "Counter Price",
			value: "Counter Price",
			disabled: !Boolean(workflow?.workflowPriceData?.price) || bidSelectValue === "accept"
		},
		{
			label: "Cancelled",
			value: "Cancelled",
			disabled: ["Allocated", "Rejected"].includes(previousStatus)
		},
		{
			label: "Rejected",
			value: "Rejected",
			disabled: ["Allocated", "Cancelled"].includes(previousStatus)
		}
	];

	return (
		<div className="flex flex-row gap-2 justify-start items-center">
			<div>Status:</div>
			<select
				className="select select-bordered"
				onChange={handleStatusChange}
				defaultValue={newStatus}
			>
				{statusOptions.map((option, index) => {
					return (
						<option key={index} value={option.value} disabled={option.disabled}>
							{option.label}
						</option>
					);
				})}
			</select>
		</div>
	);
}
