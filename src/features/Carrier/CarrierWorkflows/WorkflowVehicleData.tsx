import { ChangeEvent } from "react";
import type { UserDriver } from "@/features/Driver/UserDriver/types";

export default function WorkflowVehicleInput({
	handleVehicleNumberChange,
	vehicleNumber,
	isDisabled
}: {
	handleVehicleNumberChange: (event: ChangeEvent<HTMLInputElement>) => void;
	vehicleNumber: string;
	isDisabled?: boolean;
}) {
	return (
		<div className="flex gap-2 justify-start items-center">
			<div>Truck#: </div>
			<input
				type="text"
				placeholder="Vehicle Number..."
				className="input input-bordered text-black"
				onChange={handleVehicleNumberChange}
				value={vehicleNumber}
				disabled={isDisabled}
			/>
		</div>
	);
}
