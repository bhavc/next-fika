import { useForm, SubmitHandler } from "react-hook-form";
import IconRight from "public/svg/arrow-right.svg";
import IconLeft from "public/svg/arrow-left.svg";

// TODO There will be a new workflow form for mobile
// and a new workflow form for desktop

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
	shippingLine: string;
	vessellName: string;
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
			shippingLine: workflowFormContainerDetailsState.shippingLine,
			vessellName: workflowFormContainerDetailsState.vessellName
		}
	});

	const isUseCustomPricing = watch("useCustomPricing");

	const onSubmit: SubmitHandler<WorkflowFormContainerDetailsInputs> = (data) => {
		handleSubmitWorkflow(data);
	};

	return (
		<div className="w-full bg-slate-100 rounded-b-md p-4">
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
					<p>*If not selected, price will be what was agreed upon by Dispatcher</p>
					{isUseCustomPricing && (
						<div>
							<label>Custom Price*</label>
							<div className="mt-1 flex rounded-md shadow-sm">
								<input
									type="text"
									placeholder="$500 USD"
									className={`input w-full ${
										errors.customPrice ? "border-error" : "border-neutral"
									}`}
									{...register("customPrice", { required: isUseCustomPricing })}
								/>
							</div>
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
								className={`input w-full h-80 pt-2 ${
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
								<option value="Container">20GP BCN</option>
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
								placeholder="20 meters"
								className={`input w-full ${errors.length ? "border-error" : "border-neutral"}`}
								{...register("length", { required: true })}
							/>
						</div>
					</div>
					<div>
						<label>Width*</label>
						<div className={"mt-1 flex rounded-md shadow-sm"}>
							<input
								type="text"
								placeholder="8 meters"
								className={`input w-full ${errors.width ? "border-error" : "border-neutral"}`}
								{...register("width", { required: true })}
							/>
						</div>
					</div>
					<div>
						<label>Height*</label>
						<div className={"mt-1 flex rounded-md shadow-sm"}>
							<input
								type="text"
								placeholder="8.5 meters"
								className={`input w-full ${errors.height ? "border-error" : "border-neutral"}`}
								{...register("height", { required: true })}
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
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="20467.310 KG"
								className={`input w-full ${errors.netWeight ? "border-error" : "border-neutral"}`}
								{...register("netWeight", { required: true })}
							/>
						</div>
					</div>
					<div>
						<label>Gross Weight*</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="20467.310 KG"
								className={`input w-full ${errors.grossWeight ? "border-error" : "border-neutral"}`}
								{...register("grossWeight", { required: true })}
							/>
						</div>
					</div>
					<div>
						<label>Goods Volume*</label>
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
						<label>Vessell Name</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="Scorpio Honor"
								className={`input w-full ${errors.vessellName ? "border-error" : "border-neutral"}`}
								{...register("vessellName", { required: false })}
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
