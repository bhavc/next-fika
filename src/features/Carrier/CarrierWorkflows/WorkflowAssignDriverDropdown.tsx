import { ChangeEvent } from "react";
import type { UserDriver } from "@/features/Driver/UserDriver/types";

export default function WorkflowAssignDriverDropdown({
	handleDriverChange,
	drivers,
	selectedDriver
}: {
	handleDriverChange: (event: ChangeEvent<HTMLSelectElement>) => void;
	drivers: UserDriver[];
	selectedDriver?: UserDriver;
}) {
	return (
		<select
			className="select select-bordered w-full max-w-xs"
			onChange={handleDriverChange}
			defaultValue={drivers?.[0].id}
			value={selectedDriver?.id}
		>
			{drivers?.map((driver, index) => {
				return (
					<option key={index} value={driver.id}>
						{driver.firstName} {driver.lastName} - ({driver.username})
					</option>
				);
			})}
		</select>
	);
}
