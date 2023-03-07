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

	const [address, setAddress] = useState("");

	const { placesService, placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
		usePlacesService({
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

	// type LocationDetailsType = {
	// 	long_name: string;
	// 	short_name: string;
	// 	types: string[];
	// };

	// const getLocationDetails = async ({
	// 	placeId
	// }: {
	// 	placeId: string;
	// }): Promise<string | undefined> => {
	// 	return new Promise((resolve, reject) => {
	// 		placesService?.getDetails({ placeId }, (data) => {
	// 			if (!data || !data.address_components) {
	// 				reject("Error getting address details");
	// 			}

	// 			// const addressComponents = data?.address_components as LocationDetailsType[];
	// 			const formattedAddress = data?.formatted_address;

	// 			resolve(formattedAddress);
	// 		});
	// 	});
	// };

	// const getParsedLocationDetails = async ({ placeId }: { placeId: string }) => {
	// 	const formattedAddress: string | undefined = await getLocationDetails({
	// 		placeId
	// 	});

	// 	return { formattedAddress };
	// };

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
