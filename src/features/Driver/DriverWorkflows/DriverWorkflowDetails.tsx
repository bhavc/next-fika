import type { WorkflowContainerDataType } from "./types";

export default function DriverWorflowDetails({
	workflowContainerData
}: {
	workflowContainerData: WorkflowContainerDataType;
}) {
	const {
		containerTypeLabel,
		containerWidth,
		containerHeight,
		containerLength,
		netWeight,
		numberOfPackages,
		sealNumber
	} = workflowContainerData;

	return (
		<div className="card-body">
			<div className="flex flex-col">
				<p className="font-bold">Cargo Type:</p>
				<p>{containerTypeLabel}</p>
			</div>
			<div className="flex flex-col">
				<p className="font-bold">Measurements:</p>
				<p>
					{containerWidth} x {containerLength} x {containerHeight}
				</p>
			</div>
			<div className="flex flex-col">
				<p className="font-bold">Net Weight:</p>
				<p>{netWeight}</p>
			</div>
			<div className="flex flex-col">
				<p className="font-bold">Number of packages:</p>
				<p>{numberOfPackages}</p>
			</div>
			<div className="flex flex-col">
				<p className="font-bold">Seal #:</p>
				<p>{sealNumber}</p>
			</div>

			<div className="border-2 my-2" />
		</div>
	);
}
