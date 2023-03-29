import { DriverWorkflowStatus } from "./types";

export default function DriverWorflowButton({
	workflowStatus,
	handleStatusChange
}: {
	workflowStatus: DriverWorkflowStatus;
	handleStatusChange: (newStatus: DriverWorkflowStatus) => void;
}) {
	if (workflowStatus === "Allocated") {
		return (
			<div className="flex flex-row gap-4 mt-4">
				<button className="btn btn-error" onClick={() => handleStatusChange("Rejected")}>
					Reject
				</button>
				<button className="btn btn-success" onClick={() => handleStatusChange("In Progress")}>
					Start
				</button>
			</div>
		);
	} else if (workflowStatus === "In Progress") {
		return (
			<div className="flex flex-row gap-4 mt-4">
				<button className="btn btn-error" onClick={() => handleStatusChange("Cancelled")}>
					Cancel
				</button>
				<button className="btn btn-success" onClick={() => handleStatusChange("Delivered")}>
					Finish
				</button>
			</div>
		);
	}

	return <div />;
}
