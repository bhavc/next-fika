import { ChangeEvent, useState, useRef } from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

import { useOutsideRef } from "@/hooks/useOutsideRef";

interface GoogleAddressAutocomplete {
	error: any;
	onChange: any;
	value: any;
	name: string;
}

export default function GoogleAddressAutocomplete({
	error,
	value,
	onChange,
	name
}: GoogleAddressAutocomplete) {
	const refContainer = useRef(null);
	const { isOutsideRef } = useOutsideRef(refContainer);

	const errorRef = error?.ref;
	const errorRefName = errorRef?.name;

	const [address, setAddress] = useState(value);

	const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } = usePlacesService({
		apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_AUTOCOMPLETE,
		options: {
			componentRestrictions: {
				country: ["ke", "ca"]
			},
			input: ""
		}
	});

	const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
		setAddress(event.target.value);
		onChange(event.target.value);
		const input = event.target.value;
		getPlacePredictions({ input });
	};

	const handleSelectedAddress = async (data: any) => {
		const addressDescription = data.description;
		// const { formattedAddress } = await getParsedLocationDetails({
		// 	placeId: data.place_id
		// });

		setAddress(addressDescription || "");

		onChange(addressDescription);
		getPlacePredictions({ input: "" });
	};

	return (
		<div>
			<label>Address*</label>
			<div className="mt-1 flex rounded-md shadow-sm">
				<input
					type="text"
					className={`input w-full ${
						error && errorRefName === name ? "border-error" : "border-neutral"
					}`}
					onChange={handleAddressChange}
					value={address}
				/>
			</div>
			{placePredictions && placePredictions.length > 0 && (
				<ul className="menu bg-white" ref={refContainer}>
					{placePredictions.map((item, index) => {
						return (
							<li
								key={index}
								className="hover:bg-accent"
								onClick={() => handleSelectedAddress(item)}
							>
								<p className="hover:text-white">{item.description}</p>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
