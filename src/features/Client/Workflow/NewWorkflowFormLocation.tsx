import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import IconRight from "public/svg/arrow-right.svg";
import IconLeft from "public/svg/arrow-left.svg";

// TODO There will be a new workflow form for mobile
// and a new workflow form for desktop

type FormInputs = {
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
};

interface NewWorkflowFormLocationProps {
	handleSubmitWorkflow: () => void;
	handleGoBack: () => void;
}

export default function NewWorkflowFormLocation({
	handleSubmitWorkflow,
	handleGoBack
}: NewWorkflowFormLocationProps) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<FormInputs>({
		defaultValues: {
			useCustomPricing: false
		}
	});

	const isUseCustomPricing = watch("useCustomPricing");

	console.log("watchAddCustomPricing", isUseCustomPricing);

	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		handleSubmitWorkflow();

		// TODO
		// make a request to the backend, register the user
	};

	return (
		<div className="flex flex-row w-full bg-slate-100 rounded-md p-4">
			<form id="newWorkflowForm" onSubmit={handleSubmit(onSubmit)} className="w-full">
				<h2 className="prose prose-2xl">Costs</h2>

				<div className="mb-2 grid grid-cols-2 gap-4">
					<div className="form-control">
						<label className="label cursor-pointer">Add Custom Price</label>
						<input type="checkbox" className="toggle" {...register("useCustomPricing")} />
					</div>
					{isUseCustomPricing && (
						<div>
							<label>Custom Price</label>
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

				<h2 className="prose prose-2xl">Goods Description</h2>
				<div className="mb-2">
					<div>
						<div className="mt-1 flex rounded-md shadow-sm">
							<textarea
								placeholder="Knurled Bolt, GR 19.9 Plain..."
								className={`input w-full h-80 pt-2 ${
									errors.goodsDescription ? "border-error" : "border-neutral"
								}`}
								{...register("goodsDescription", { required: "Address required" })}
							/>
						</div>
					</div>
				</div>

				<div className="divider" />

				<h2 className="prose prose-2xl">Container Details</h2>
				<div className="mb-2 grid grid-cols-2 gap-2">
					<div>
						<label>Type / Mode</label>
						<div className={"mt-1 flex rounded-md shadow-sm"}>
							<select
								className={`select w-full max-w-s ${
									errors.cargoType ? "border-error" : "border-neutral"
								}`}
								defaultValue=""
								{...register("cargoType", { required: "Cargo Type required" })}
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
						<label>Length</label>
						<div className={"mt-1 flex rounded-md shadow-sm"}>
							<input
								type="text"
								placeholder="20 meters"
								className={`input w-full ${errors.sealNumber ? "border-error" : "border-neutral"}`}
								{...register("length", { required: "Name required." })}
							/>
						</div>
					</div>
					<div>
						<label>Width</label>
						<div className={"mt-1 flex rounded-md shadow-sm"}>
							<input
								type="text"
								placeholder="8 meters"
								className={`input w-full ${errors.sealNumber ? "border-error" : "border-neutral"}`}
								{...register("width", { required: "Name required." })}
							/>
						</div>
					</div>
					<div>
						<label>Height</label>
						<div className={"mt-1 flex rounded-md shadow-sm"}>
							<input
								type="text"
								placeholder="8.5 meters"
								className={`input w-full ${errors.sealNumber ? "border-error" : "border-neutral"}`}
								{...register("height", { required: "Name required." })}
							/>
						</div>
					</div>
				</div>
				<div className="mb-2 grid grid-cols-2 gap-2">
					<div>
						<label>Seal Number</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="oolgka7297"
								className={`input w-full ${errors.sealNumber ? "border-error" : "border-neutral"}`}
								{...register("sealNumber", { required: "Name required." })}
							/>
						</div>
					</div>
					<div>
						<label># of Packages</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="40 PLT"
								className={`input w-full ${
									errors.numberOfPackages ? "border-error" : "border-neutral"
								}`}
								{...register("numberOfPackages", { required: "Phone required." })}
							/>
						</div>
					</div>
				</div>

				<div className="mb-2 grid grid-cols-3 gap-2">
					<div>
						<label>Net Weight</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="20467.310 KG"
								className={`input w-full ${errors.sealNumber ? "border-error" : "border-neutral"}`}
								{...register("netWeight", { required: "Name required." })}
							/>
						</div>
					</div>
					<div>
						<label>Gross Weight</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="20467.310 KG"
								className={`input w-full ${
									errors.numberOfPackages ? "border-error" : "border-neutral"
								}`}
								{...register("grossWeight", { required: "Phone required." })}
							/>
						</div>
					</div>
					<div>
						<label>Goods Volume</label>
						<div className="mt-1 flex rounded-md shadow-sm">
							<input
								type="text"
								placeholder="18.520 M3"
								className={`input w-full ${errors.sealNumber ? "border-error" : "border-neutral"}`}
								{...register("goodsVolume", { required: "Name required." })}
							/>
						</div>
					</div>
				</div>

				<div className="flex justify-end">
					<button className="btn btn-circle bg-primary mt-10">
						{/* <Image src={IconRight} width={24} height={24} alt="arrow-next" color="white" /> */}
						<IconRight />
					</button>
				</div>
			</form>
		</div>
	);
}
