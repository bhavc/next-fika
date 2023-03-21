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
		{ label: "Triage", value: "Triage", disabled: previousStatus !== "Triage" },
		{
			label: "Allocated",
			value: "Allocated",
			disabled: previousStatus === "Rejected" || bidSelectValue === "counter"
		},
		{
			label: "Counter Price",
			value: "Counter Price",
			disabled: !Boolean(workflow?.workflowPriceData?.price) || bidSelectValue === "accept"
		},
		{ label: "Rejected", value: "Rejected", disabled: previousStatus === "Allocated" }
	];

	return (
		<select
			className="select select-bordered w-full max-w-xs"
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
	);
}
