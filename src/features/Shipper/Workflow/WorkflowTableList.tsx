import Link from "next/link";
import TruckIcon from "public/svg/truck-loading.svg";
import IconRight from "public/svg/arrow-right.svg";

import Badge from "@/components/Badge";

import { formatDateStringToDate } from "@/utils/time";
import { mapWorkflowTableListBadgeColorToStatus } from "./helpers";

import type { WorkflowType } from "./types";

export default function WorkflowTableList({
	workflows,
	isLoading
}: {
	workflows?: WorkflowType[];
	isLoading: boolean;
}) {
	if (isLoading) {
		return (
			<div className="flex justify-center items-center align-middle h-[calc(100vh_-_30vh)]">
				<progress className="progress progress-accent w-56" />
			</div>
		);
	}

	const rows = workflows?.map((workflow, index) => {
		const { selectedCarrier, workflowAddressData, status, createdAt, id } = workflow;
		const pickupAddress = workflowAddressData.pickupAddress;
		const dropoffAddress = workflowAddressData.dropoffAddress;

		const formattedDate = formatDateStringToDate(createdAt);
		const badgeColor = mapWorkflowTableListBadgeColorToStatus(status);
		return (
			<tr key={index}>
				<td className="w-8">
					<div className="avatar">
						<div className="mask mask-squircle w-12 h-12">
							<TruckIcon />
						</div>
					</div>
				</td>
				<td>
					<div className="flex items-center space-x-3">
						<div>
							<div>{selectedCarrier.companyName}</div>
						</div>
					</div>
				</td>
				<td>
					<div className="flex items-center space-x-3">
						<div>
							<div>{pickupAddress}</div>
						</div>
					</div>
				</td>
				<td>
					<div className="flex items-center space-x-3">
						<div>
							<div>{dropoffAddress}</div>
						</div>
					</div>
				</td>
				<td>
					<Badge color={badgeColor}>{status}</Badge>
				</td>
				<td>{formattedDate}</td>
				<th>
					<Link href={`/shipper/workflow/${id}`} className="btn btn-circle bg-primary">
						<IconRight />
					</Link>
				</th>
			</tr>
		);
	});

	return (
		<div className="overflow-x-auto w-full">
			<table className="table w-full">
				<thead>
					<tr>
						<th className="text-accent bg-accent-content" />
						<th className="text-accent bg-accent-content">Carrier</th>
						<th className="text-accent bg-accent-content">Pickup Address</th>
						<th className="text-accent bg-accent-content">Dropoff Address</th>
						<th className="text-accent bg-accent-content">Status</th>
						<th className="text-accent bg-accent-content">Date Created</th>
						<th className="text-accent bg-accent-content" />
					</tr>
				</thead>
				<tbody>{rows}</tbody>
				<tfoot>
					<tr>
						<th className="text-accent bg-accent-content" />
						<th className="text-accent bg-accent-content">Carrier</th>
						<th className="text-accent bg-accent-content">Pickup Address</th>
						<th className="text-accent bg-accent-content">Dropoff Address</th>
						<th className="text-accent bg-accent-content">Status</th>
						<th className="text-accent bg-accent-content">Date Created</th>
						<th className="text-accent bg-accent-content" />
					</tr>
				</tfoot>
			</table>
		</div>
	);
}
