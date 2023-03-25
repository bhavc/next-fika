import Link from "next/link";
import IconRight from "public/svg/arrow-right.svg";

import DriverStatusBadge from "./DriverStatusBadge";

import { formatDateStringToDate } from "@/utils/time";

import type { UserStatus } from "@/features/types";

type DriverListType = {
	id: number;
	username: string;
	status: UserStatus;
	firstName: string;
	lastName: string;
};

export default function DriverList({
	drivers,
	isLoading
}: {
	drivers?: DriverListType[];
	isLoading: boolean;
}) {
	if (isLoading) {
		return (
			<div className="flex justify-center items-center align-middle h-[calc(100vh_-_30vh)]">
				<progress className="progress progress-accent w-56" />
			</div>
		);
	}

	const rows = drivers?.map((driver, index) => {
		const { id, username, status, firstName, lastName } = driver;

		// const formattedDate = formatDateStringToDate(createdAt);
		return (
			<tr key={index}>
				<td>
					<DriverStatusBadge userStatus={status}>{status}</DriverStatusBadge>
				</td>
				<td>
					<div className="flex items-center space-x-3">
						<div>
							<div>{username}</div>
						</div>
					</div>
				</td>
				<td>
					<div className="flex items-center space-x-3">
						<div>
							<div>
								{firstName} {lastName}
							</div>
						</div>
					</div>
				</td>
				<td>Date Created</td>
				<td>
					<Link href={`/carrier/driver/${id}`} className="btn btn-circle bg-primary">
						<IconRight />
					</Link>
				</td>
			</tr>
		);
	});

	return (
		<div className="overflow-x-auto w-full">
			<table className="table w-full">
				<thead>
					<tr>
						<th className="text-accent bg-accent-content">Status</th>
						<th className="text-accent bg-accent-content">User Name</th>
						<th className="text-accent bg-accent-content">Name</th>
						<th className="text-accent bg-accent-content">Date Created</th>
						<th className="text-accent bg-accent-content" />
					</tr>
				</thead>
				<tbody>{rows}</tbody>
				<tfoot>
					<tr>
						<th className="text-accent bg-accent-content">Status</th>
						<th className="text-accent bg-accent-content">User Name</th>
						<th className="text-accent bg-accent-content">Name</th>
						<th className="text-accent bg-accent-content">Date Created</th>
						<th className="text-accent bg-accent-content" />
					</tr>
				</tfoot>
			</table>
		</div>
	);
}
