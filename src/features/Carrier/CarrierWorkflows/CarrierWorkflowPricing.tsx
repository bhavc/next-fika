import { ChangeEvent } from "react";

export type CarrierWorkflowPricingFormInputs = {
	quotePrice: string;
};

interface CarrierWorkflowPricingProps {
	price?: number;
	handleBidSelectChange: (event: ChangeEvent<HTMLInputElement>) => void;
	bidSelectValue: string;
	carrierQuoteRequest: string;
	handleCarrierQuoteRequest: (event: ChangeEvent<HTMLInputElement>) => void;
	carrierCounterRequest: string;
	handleCarrierCounterRequest: (event: ChangeEvent<HTMLInputElement>) => void;
	quotePriceError: boolean;
}

export default function CarrierWorkflowPricing({
	price,
	handleBidSelectChange,
	bidSelectValue,
	carrierQuoteRequest,
	handleCarrierQuoteRequest,
	carrierCounterRequest,
	handleCarrierCounterRequest,
	quotePriceError
}: CarrierWorkflowPricingProps) {
	let returnedComponent;

	// TODO: Check workflow status as well
	if (price) {
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
							{bidSelectValue === "accept" ? (
								<input type="text" className={`input input-bordered`} value={price} disabled />
							) : (
								<input
									type="text"
									placeholder="250.00"
									className={`input input-bordered ${
										quotePriceError ? "border-error" : "border-neutral"
									}`}
									value={carrierCounterRequest}
									onChange={handleCarrierCounterRequest}
								/>
							)}
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
	} else {
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
								placeholder="250.00"
								className={`input input-bordered ${
									quotePriceError ? "border-error" : "border-neutral"
								}`}
								value={carrierQuoteRequest}
								onChange={handleCarrierQuoteRequest}
							/>
							<span>USD</span>
						</label>
					</div>
				</div>
			</form>
		);
	}

	return returnedComponent;
}
