import type { ShipperWorkflowStatus } from "./types";

export default function ShipperWorkflowPricing({
	workflowPrice,
	workflowStatus
}: {
	workflowPrice?: number;
	workflowStatus: ShipperWorkflowStatus;
}) {
	return workflowPrice ? (
		<div className="flex flex-col md:flex-row justify-between gap-4">
			<div className="stats shadow-2xl border-accent border-2">
				<div className="stat">
					<div className="stat-title">Total Price</div>
					<div className="stat-value text-primary">${workflowPrice} USD</div>
					<div className="stat-desc">to move your shipment</div>
				</div>
			</div>
			{workflowStatus === "Counter Price" && (
				<div className="flex flex-col gap-4 pr-4">
					<button className="btn btn-success hover:opacity-80">Accept Counter</button>
					<button className="btn btn-error hover:opacity-80">Cancel Shipment</button>
				</div>
			)}
		</div>
	) : (
		<p>
			The price has already been agreed to by you and the carrier. The price will be updated once
			the carrier adds the price
		</p>
	);
}
