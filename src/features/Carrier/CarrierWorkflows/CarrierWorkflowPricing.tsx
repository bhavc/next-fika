import { useForm, SubmitHandler } from "react-hook-form";
import { MouseEvent, ChangeEvent } from "react";

export type CarrierWorkflowPricingFormInputs = {
	notes: string;
};

interface CarrierWorkflowPricingProps {
	useCustomPricing?: boolean;
	customPrice?: string;
	handleBidSelectChange: (event: ChangeEvent<HTMLInputElement>) => void;
	bidSelectValue: string;
	carrierQuoteRequest: string;
	handleCarrierQuoteRequest: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function CarrierWorkflowPricing({
	useCustomPricing,
	customPrice,
	handleBidSelectChange,
	bidSelectValue,
	carrierQuoteRequest,
	handleCarrierQuoteRequest
}: CarrierWorkflowPricingProps) {
	let returnedComponent;

	// if theres no custom price, maybe user has to add the price of this
	// if there is a custom price, we can reject or accept the price

	// user can accept or reject this, if theres a custom price

	if (!useCustomPricing) {
		returnedComponent = (
			<form>
				<div className="flex flex-row gap-6 justify-between">
					<div className="pr-9">
						<label>Request for Quote</label>
						<p className="text-sm pl-4 text-slate-500">
							*The deliverer has states that a pre-agreed tariff in place. Please add the price you
							will be quoting the deliverer.
						</p>
						<label className="input-group mt-4 flex ml-4">
							<span>$</span>
							<input
								type="text"
								className="input input-bordered"
								value={carrierQuoteRequest}
								onChange={handleCarrierQuoteRequest}
							/>
							<span>USD</span>
						</label>
					</div>
				</div>
			</form>
		);
	} else {
		returnedComponent = (
			<form>
				<div className="flex flex-col md:flex-row justify-between">
					<div>
						<label>User Bid Price: </label>
						<p className="text-sm pl-4 text-slate-500">
							*This is the price deliverer is asking for to move the shipment. Please either accept
							the delivery or counter the price.
						</p>
						<p className="text-sm pl-4 text-slate-500">
							Note: If the price is countered, the deliverer will also have a chance to counter.
						</p>
						<label className="input-group mt-4 flex ml-4">
							<span>$</span>
							<input
								type="text"
								className="input input-bordered w-28 md:w-56"
								defaultValue={customPrice}
								disabled={bidSelectValue !== "counter"}
							/>
							<span>USD</span>
						</label>
					</div>
					<div className="flex flex-col justify-center items-center">
						<div className="form-control">
							<label className="label cursor-pointer gap-2">
								<span className="label-text">Accept Quote</span>
								<input
									type="radio"
									name="radio-2"
									className="radio checked:bg-success"
									value="accept"
									onChange={handleBidSelectChange}
									checked={bidSelectValue === "accept"}
								/>
							</label>
							<label className="label cursor-pointer gap-2">
								<span className="label-text">Counter Quote</span>
								<input
									type="radio"
									name="radio-2"
									className="radio checked:bg-error"
									value="counter"
									onChange={handleBidSelectChange}
									checked={bidSelectValue === "counter"}
								/>
							</label>
						</div>
					</div>
				</div>
			</form>
		);
	}

	return returnedComponent;
}
