import { ChangeEvent, useState, useRef, KeyboardEvent } from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

import { useOutsideRef } from "@/hooks/useOutsideRef";

interface GoogleAddressAutocomplete {
	error: any;
	onChange: any;
	value: any;
	name: string;
	label?: string;
}

export default function GoogleAddressAutocomplete({
	error,
	value,
	onChange,
	name,
	label
}: GoogleAddressAutocomplete) {
	const refContainer = useRef(null);
	const [currentHoveredListItem, setCurrentHoveredListItem] = useState(-1);
	// let currentHoveredListItem: null | number = null;
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
		const input = event.target.value;
		setAddress(input);
		onChange(input);
		getPlacePredictions({ input });
	};

	const handleHoverSelectedAddress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.code === "ArrowDown") {
			if (currentHoveredListItem > 4) {
				return;
			}

			return setCurrentHoveredListItem(currentHoveredListItem + 1);
		}

		if (e.code === "ArrowUp") {
			if (currentHoveredListItem < -1) {
				return;
			}

			return setCurrentHoveredListItem(currentHoveredListItem - 1);
		}

		if (e.code === "Enter" && currentHoveredListItem > -1 && currentHoveredListItem < 4) {
			e.preventDefault();
			const currentlyHighlightedPlace = placePredictions[currentHoveredListItem];
			handleSelectedAddress(currentlyHighlightedPlace);
			setCurrentHoveredListItem(-1);
		}
	};

	const handleSelectedAddress = async (data: any) => {
		const addressDescription = data.description;
		setAddress(addressDescription || "");
		setCurrentHoveredListItem(-1);
		onChange(addressDescription);
		getPlacePredictions({ input: "" });
	};

	return (
		<div>
			{label && <label>{label}</label>}
			<div className="mt-1 flex rounded-md shadow-sm">
				<input
					type="text"
					className={`input w-full ${
						error && errorRefName === name ? "border-error" : "border-neutral"
					}`}
					onChange={handleAddressChange}
					onKeyDown={handleHoverSelectedAddress}
					value={address}
					placeholder="123 Edward Street, Toronto, ON, Canada"
				/>
			</div>
			{placePredictions && placePredictions.length > 0 && (
				<ul className="menu bg-white rounded-b-md" ref={refContainer}>
					{placePredictions.map((item, index) => {
						return (
							<li
								key={index}
								className={`hover:bg-accent ${
									index === currentHoveredListItem ? "bg-accent" : "bg-inherit"
								}`}
								onClick={() => handleSelectedAddress(item)}
							>
								<p
									className={`hover:text-white ${
										index === currentHoveredListItem ? "text-white" : "text-inherit"
									}`}
								>
									{item.description}
								</p>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
