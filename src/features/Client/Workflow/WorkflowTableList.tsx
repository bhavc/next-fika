import TruckIcon from "public/svg/truck-loading.svg";
import IconRight from "public/svg/arrow-right.svg";

import { formatDateStringToDate } from "@/utils/time";

export default function WorkflowTableList({ workflows }: { workflows: any[] }) {
	const rows = workflows.map((workflow, index) => {
		console.log("workflow", workflow);
		const { workflowAddressData, status, created_at } = workflow;
		const { pickupAddress, dropoffAddress } = workflowAddressData;

		const formattedDate = formatDateStringToDate(created_at);

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
				<td>{status}</td>
				<td>{created_at}</td>
				<th>
					<button className="btn btn-circle bg-primary">
						<IconRight />
					</button>
				</th>
			</tr>
		);
	});

	return (
		<div className="overflow-x-auto w-full">
			<table className="table w-full">
				<thead>
					<tr>
						<th />
						<th>Pickup Address</th>
						<th>Dropoff Address</th>
						<th>Status</th>
						<th>Date Created</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{/* <tr>
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
									<div className="font-bold">Hart Hagerty</div>
									<div className="text-sm opacity-50">United States</div>
								</div>
							</div>
						</td>
						<td>
							Zemlak, Daniel and Leannon
							<br />
							<span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
						</td>
						<td>Purple</td>
						<th>
							<button className="btn btn-ghost btn-xs">details</button>
						</th>
					</tr> */}
					{rows}
				</tbody>
				<tfoot>
					<tr>
						<th />
						<th>Pickup Address</th>
						<th>Dropoff Address</th>
						<th>Status</th>
						<th>Date Created</th>
						<th />
					</tr>
				</tfoot>
			</table>
		</div>
	);
}
