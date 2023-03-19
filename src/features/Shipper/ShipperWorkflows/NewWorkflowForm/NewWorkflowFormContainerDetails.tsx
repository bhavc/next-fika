import { useForm, SubmitHandler } from "react-hook-form";

import { valueToDimensionsMap, mapSelectedCargoValueToDimensions } from "../helpers";

import IconRight from "public/svg/arrow-right.svg";
import IconLeft from "public/svg/arrow-left.svg";

export type WorkflowFormContainerDetailsInputs = {
	useCustomPricing: boolean;
	customPrice: string;
	goodsDescription: string;
	cargoType: string;
	length: string;
	width: string;
	height: string;
	sealNumber: string;
	numberOfPackages: string;
	grossWeight: string;
	netWeight: string;
	goodsVolume: string;
	isHumid: boolean;
	damaged: boolean;
	frozen: boolean;
	requiresChiller: boolean;
	requiresControlledAtmosphere: boolean;
	isDropoff: boolean;
	dropoffTerminalName: string;
	isReturn: boolean;
	returnDepotName: string;
	shippingLine: string;
	vesselName: string;
};

interface NewWorkflowFormContainerDetailsProps {
	handleSubmitWorkflow: (data: WorkflowFormContainerDetailsInputs) => void;
	handleGoBack: () => void;
	workflowFormContainerDetailsState: WorkflowFormContainerDetailsInputs;
}

export default function NewWorkflowFormContainerDetails({
	handleSubmitWorkflow,
	handleGoBack,
	workflowFormContainerDetailsState
}: NewWorkflowFormContainerDetailsProps) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<WorkflowFormContainerDetailsInputs>({
		defaultValues: {
			useCustomPricing: workflowFormContainerDetailsState.useCustomPricing,
			customPrice: workflowFormContainerDetailsState.customPrice,
			goodsDescription: workflowFormContainerDetailsState.goodsDescription,
			cargoType: workflowFormContainerDetailsState.cargoType,
			length: workflowFormContainerDetailsState.length,
			width: workflowFormContainerDetailsState.width,
			height: workflowFormContainerDetailsState.height,
			sealNumber: workflowFormContainerDetailsState.sealNumber,
			numberOfPackages: workflowFormContainerDetailsState.numberOfPackages,
			grossWeight: workflowFormContainerDetailsState.grossWeight,
			netWeight: workflowFormContainerDetailsState.netWeight,
			goodsVolume: workflowFormContainerDetailsState.goodsVolume,
			isHumid: workflowFormContainerDetailsState.isHumid,
			damaged: workflowFormContainerDetailsState.damaged,
			frozen: workflowFormContainerDetailsState.frozen,
			requiresChiller: workflowFormContainerDetailsState.requiresChiller,
			requiresControlledAtmosphere: workflowFormContainerDetailsState.requiresControlledAtmosphere,
			isDropoff: workflowFormContainerDetailsState.isDropoff,
			dropoffTerminalName: workflowFormContainerDetailsState.dropoffTerminalName,
			isReturn: workflowFormContainerDetailsState.isReturn,
			returnDepotName: workflowFormContainerDetailsState.returnDepotName,
			shippingLine: workflowFormContainerDetailsState.shippingLine,
			vesselName: workflowFormContainerDetailsState.vesselName
		}
	});

	const isUseCustomPricing = watch("useCustomPricing");
	const isDropoff = watch("isDropoff");
	const isReturn = watch("isReturn");

	const selectedCargoType = watch("cargoType");
	const selectedCargoTypeData = mapSelectedCargoValueToDimensions(selectedCargoType);
	const selectedCargoWeight = selectedCargoTypeData.weight;
	const watchedNetWeight = watch("netWeight");
	const calculatedGrossWeight = +watchedNetWeight + +selectedCargoWeight;

	const onSubmit: SubmitHandler<WorkflowFormContainerDetailsInputs> = (data) => {
		data.height = selectedCargoTypeData.height as string;
		data.width = selectedCargoTypeData.width as string;
		data.length = selectedCargoTypeData.length as string;
		data.netWeight = `${data.netWeight}kg`;
		data.grossWeight = `${calculatedGrossWeight}kg`;

		handleSubmitWorkflow(data);
	};

	return (
		<div className="w-full bg-slate-100 rounded-b-md p-4 mb-4">
			<form
				id="newWorkflowFormContainerDetails"
				onSubmit={handleSubmit(onSubmit)}
				className="w-full"
			>
				<h2 className="prose prose-2xl">Costs</h2>

				<div className="mb-2 grid grid-cols-2 gap-4">
					<div className="form-control">
						<label className="label cursor-pointer">Add Custom Price</label>
						<input type="checkbox" className="toggle" {...register("useCustomPricing")} />
					</div>
					<p>
						*Pre-agreed tariff in place, if no pre-agreed tariff, then a quote will be shared prior
						to the order being accepted
					</p>
					{isUseCustomPricing && (
						<div>
							<label>Custom Price*</label>
							<label className="input-group mt-2">
								<span>$</span>
								<input
									type="text"
									placeholder="250.00"
									className={`input input-bordered ${
										errors.customPrice ? "border-error" : "border-neutral"
									}`}
									{...register("customPrice", {
										required: isUseCustomPricing,
										pattern: /^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/i
									})}
								/>
								<span>USD</span>
							</label>
							{errors.customPrice && (
								<p className="text-error mt-1">
									*Please enter a valid numeric price in USD with two (2) decimal places
								</p>
							)}
						</div>
					)}
				</div>

				<div className="divider" />

				<h2 className="prose prose-2xl">Goods Description*</h2>
				<div className="mb-2">
					<div>
						<div className="mt-1 flex rounded-md shadow-sm">
							<textarea
								placeholder="Knurled Bolt, GR 19.9 Plain..."
								className={`input w-full h-80 pt-2 whitespace-pre-wrap ${
									errors.goodsDescription ? "border-error" : "border-neutral"
								}`}
								{...register("goodsDescription", { required: true })}
							/>
						</div>
					</div>
				</div>

				<div className="divider" />

				<h2 className="prose prose-2xl">Container Details</h2>
				<div className="mb-2 grid grid-cols-2 gap-2">
					<div>
						<label>Type / Mode*</label>
						<div className={"mt-1 flex rounded-md shadow-sm"}>
							<select
								className={`select w-full max-w-s ${
									errors.cargoType ? "border-error" : "border-neutral"
								}`}
								defaultValue=""
								{...register("cargoType", { required: true })}
							>
								<option value="" disabled>
									Choose your cargo type
								</option>
								{Object.entries(valueToDimensionsMap).map((entry) => {
									return (
										<option key={entry[0]} value={entry[0]}>
											{entry[1].name}
										</option>
									);
								})}
							</select>
						</div>
					</div>
				</div>
				<div className="mb-2 grid grid-cols-3 gap-2">
					<div>
						<label>Length*</label>
						<div className={"mt-1 flex rounded-md shadow-sm"}>
							<input
								type="text"
								className={`input w-full bg-slate-200 ${
									errors.length ? "border-error" : "border-neutral"
								}`}
								value={selectedCargoTypeData.length}
								readOnly
							/>
						</div>
					</div>
					<div>
						<label>Width*</label>
						<div className={"mt-1 flex rounded-md shadow-sm"}>
							<input
								type="text"
								className={`input w-full bg-slate-200 ${
									errors.width ? "border-error" : "border-neutral"
								}`}
								value={selectedCargoTypeData.width}
								readOnly
							/>
						</div>
					</div>
					<div>
						<label>Height*</label>
						<div className={"mt-1 flex rounded-md shadow-sm"}>
							<input
								type="text"
								className={`input w-full bg-slate-200 ${
									errors.height ? "border-error" : "border-neutral"
								}`}
								value={selectedCargoTypeData.height}
								readOnly
							/>
						</div>
					</div>
				</div>
				<div className="mb-2 grid grid-cols-2 gap-2">
					<div>
						<label>Seal Number*</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="oolgka7297"
								className={`input w-full ${errors.sealNumber ? "border-error" : "border-neutral"}`}
								{...register("sealNumber", { required: true })}
							/>
						</div>
					</div>
					<div>
						<label># of Packages*</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="40 PLT"
								className={`input w-full ${
									errors.numberOfPackages ? "border-error" : "border-neutral"
								}`}
								{...register("numberOfPackages", { required: true })}
							/>
						</div>
					</div>
				</div>

				<div className="mb-2 grid grid-cols-3 gap-2">
					<div>
						<label>Net Weight*</label>
						<p className="text-sm pl-4 text-slate-500">*In kilograms (kg)</p>
						<div className="mt-1 flex rounded-md shadow-sm">
							{/* Change this from number to text type */}
							<input
								type="number"
								placeholder="467.310"
								className={`input w-full ${errors.netWeight ? "border-error" : "border-neutral"}`}
								{...register("netWeight", { required: true })}
							/>
						</div>
					</div>
					<div>
						<label>Gross Weight*</label>
						<p className="text-sm pl-4 text-slate-500">*In kilograms (kg)</p>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="number"
								placeholder="20467.310"
								className={`input w-full bg-slate-200 ${
									errors.grossWeight ? "border-error" : "border-neutral"
								}`}
								value={calculatedGrossWeight}
								readOnly
							/>
						</div>
					</div>
					<div>
						<label>Goods Volume*</label>
						<p className="text-sm pl-4 text-slate-500">*Please specify units</p>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="18.520 M3"
								className={`input w-full ${errors.goodsVolume ? "border-error" : "border-neutral"}`}
								{...register("goodsVolume", { required: true })}
							/>
						</div>
					</div>
				</div>

				<div className="mb-2 grid grid-cols-2 gap-2">
					<div className="flex flex-row gap-4">
						<label className="label cursor-pointer">Humidity</label>
						<div className="mt-2 flex rounded-md shadow-sm">
							<input
								type="checkbox"
								className="checkbox"
								{...register("isHumid", { required: false })}
							/>
						</div>
					</div>
					<div className="flex flex-row gap-4">
						<label className="label cursor-pointer">Damaged</label>
						<div className="mt-2 flex rounded-md shadow-sm">
							<input
								type="checkbox"
								className="checkbox"
								{...register("damaged", { required: false })}
							/>
						</div>
					</div>
					<div className="flex flex-row gap-4">
						<label className="label cursor-pointer">Frozen</label>
						<div className="mt-2 flex rounded-md shadow-sm">
							<input
								type="checkbox"
								className="checkbox"
								{...register("frozen", { required: false })}
							/>
						</div>
					</div>
					<div className="flex flex-row gap-4">
						<label className="label cursor-pointer">Requires Chiller</label>
						<div className="mt-2 flex rounded-md shadow-sm">
							<input
								type="checkbox"
								className="checkbox"
								{...register("requiresChiller", { required: false })}
							/>
						</div>
					</div>
					<div className="flex flex-row gap-4">
						<label className="label cursor-pointer">Requires Controlled Atmosphere</label>
						<div className="mt-2 flex rounded-md shadow-sm">
							<input
								type="checkbox"
								className="checkbox"
								{...register("requiresControlledAtmosphere", { required: false })}
							/>
						</div>
					</div>
				</div>

				<div className="divider" />
				<h2 className="prose prose-2xl">Empty Container</h2>
				<div className="mb-2 grid grid-cols-2 gap-4">
					<div className="form-control">
						<label className="label cursor-pointer">Dropoff</label>
						<input type="checkbox" className="toggle" {...register("isDropoff")} />
					</div>
					{isDropoff && (
						<div>
							<label>Terminal Name*</label>
							<div className="mt-1 flex rounded-md shadow-sm">
								<input
									type="text"
									placeholder="MSC, Mapuka, Mombasa, Nairobi CFS"
									className={`input w-full ${
										errors.dropoffTerminalName ? "border-error" : "border-neutral"
									}`}
									{...register("dropoffTerminalName", { required: isDropoff })}
								/>
							</div>
						</div>
					)}
				</div>
				<div className="mb-2 grid grid-cols-2 gap-4">
					<div className="form-control">
						<label className="label cursor-pointer">Return</label>
						<input type="checkbox" className="toggle" {...register("isReturn")} />
					</div>
					{isReturn && (
						<div>
							<label>Return Depot*</label>
							<div className="mt-1 flex rounded-md shadow-sm">
								<input
									type="text"
									placeholder="MSC, Mapuka, Mombasa, Nairobi CFS"
									className={`input w-full ${
										errors.returnDepotName ? "border-error" : "border-neutral"
									}`}
									{...register("returnDepotName", { required: isReturn })}
								/>
							</div>
						</div>
					)}
				</div>

				<div className="divider" />

				<h2 className="prose prose-2xl">Vessel Details</h2>
				<div className="mb-2 grid grid-cols-2 gap-2">
					<div>
						<label>Shipping Line</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="MSC"
								className={`input w-full ${
									errors.shippingLine ? "border-error" : "border-neutral"
								}`}
								{...register("shippingLine", { required: false })}
							/>
						</div>
					</div>
					<div>
						<label>Vessel Name</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="Scorpio Honor"
								className={`input w-full ${errors.vesselName ? "border-error" : "border-neutral"}`}
								{...register("vesselName", { required: false })}
							/>
						</div>
					</div>
				</div>
			</form>
			<div className="flex flex-row justify-between">
				<div className="justify-start">
					<button className="btn btn-circle bg-primary mt-10" onClick={handleGoBack}>
						<IconLeft />
					</button>
				</div>
				<div className="justify-end">
					<button
						className="btn btn-circle bg-primary mt-10"
						type="submit"
						form="newWorkflowFormContainerDetails"
					>
						<IconRight />
					</button>
				</div>
			</div>
		</div>
	);
}
