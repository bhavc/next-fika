import { useForm, SubmitHandler } from "react-hook-form";

export type CarrierWorkflowPricingFormInputs = {
	notes: string;
};

interface CarrierWorkflowPricingProps {
	useCustomPricing?: boolean;
	customPrice?: string;
}

export default function CarrierWorkflowPricing({
	useCustomPricing,
	customPrice
}: CarrierWorkflowPricingProps) {
	let returnedComponent;

	if (!useCustomPricing) {
		returnedComponent = <p>The price has already been determined by your team</p>;
	} else {
		returnedComponent = (
			<form>
				<label>User Bid Price: </label>
				<p className="text-sm pl-4 text-slate-500">
					*This is the price user is asking to move the shipment for.
				</p>
				<label className="input-group mt-4">
					<span>$</span>
					<input type="text" className="input input-bordered" defaultValue={customPrice} disabled />
					<span>USD</span>
				</label>
			</form>
		);
	}

	return returnedComponent;
}
