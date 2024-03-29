import type { ShipperWorkflowStatus } from "./types";

export default function WorkflowStatusBadge({
	workflowStatus,
	children
}: {
	workflowStatus: ShipperWorkflowStatus;
	children: string;
}) {
	switch (workflowStatus) {
		case "Draft":
			return <div className="p-2 bg-slate-200 rounded-lg text-center">{children}</div>;
		case "Triage":
			return <div className="p-2 bg-sky-400 rounded-lg text-center">{children}</div>;
		case "Counter Price":
			return <div className="p-2 bg-warning rounded-lg text-center">{children}</div>;
		case "Allocated":
			return <div className="p-2 bg-secondary-content rounded-lg text-center">{children}</div>;
		case "In Progress":
			return <div className="p-2 bg-indigo-400 rounded-lg text-center">{children}</div>;
		case "Delivered":
			return <div className="p-2 bg-success rounded-lg text-center">{children}</div>;
		case "Cancelled":
			return <div className="p-2 bg-error rounded-lg text-center">{children}</div>;
		case "Rejected":
			return <div className="p-2 bg-error rounded-lg text-center">{children}</div>;
		default:
			return <div className="p-2 bg-slate-200 rounded-lg text-center">{children}</div>;
	}
}
