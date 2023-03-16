import { ChangeEvent } from "react";

export default function WorkflowStatusDropdown({
	handleStatusChange,
	newStatus,
	previousStatus
}: {
	handleStatusChange: (event: ChangeEvent<HTMLSelectElement>) => void;
	newStatus: string;
	previousStatus: string;
}) {
	const statusOptions = [
		{ label: "Triage", value: "Triage", disabled: previousStatus !== "Triage" },
		{ label: "Allocated", value: "Allocated", disabled: previousStatus === "Rejected" },
		{ label: "Rejected", value: "Rejected", disabled: previousStatus === "Allocated" },
		{ label: "Triage dummy", value: "Triage1" }
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
