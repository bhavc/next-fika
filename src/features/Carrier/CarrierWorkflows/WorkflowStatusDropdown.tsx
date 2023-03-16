import { ChangeEvent } from "react";

export default function WorkflowStatusDropdown({
	handleStatusChange,
	status
}: {
	handleStatusChange: (event: ChangeEvent<HTMLSelectElement>) => void;
	status: string;
}) {
	const statusOptions = [
		{ label: "Triage", value: "Triage" },
		{ label: "Allocated", value: "Allocated" },
		{ label: "Rejected", value: "Rejected" }
	];

	return (
		<select className="select select-bordered w-full max-w-xs" onChange={handleStatusChange}>
			{statusOptions.map((option, index) => {
				return (
					<option key={index} value={option.value}>
						{option.label}
					</option>
				);
			})}
		</select>
	);
}
