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
	const [selectedCity, setCity] = useState("");
	const [selectedProvince, setProvince] = useState("");
	const [selectedCountry, setCountry] = useState("");

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

	type LocationDetailsType = {
		long_name: string;
		short_name: string;
		types: string[];
	};

	const getLocationDetails = async ({
		placeId
	}: {
		placeId: string;
	}): Promise<LocationDetailsType[]> => {
		return new Promise((resolve, reject) => {
			placesService?.getDetails({ placeId }, (data) => {
				if (!data || !data.address_components) {
					reject("Error getting address details");
				}
				const addressComponents = data?.address_components as LocationDetailsType[];

				resolve(addressComponents);
			});
		});
	};

	const getParsedLocationDetails = async ({ placeId }: { placeId: string }) => {
		let addressNumber = "";
		let address = "";
		let city = "";
		let province = "";
		let country = "";

		const locationDetails: LocationDetailsType[] = await getLocationDetails({
			placeId
		});

		for (let i = 0; i < locationDetails.length; i++) {
			const locationDetail = locationDetails[i];
			const locationDetailType = locationDetail.types;

			if (locationDetailType.includes("street_number")) {
				addressNumber = locationDetail.long_name;
			}

			if (locationDetailType.includes("route")) {
				address = locationDetail.long_name;
			}

			if (locationDetailType.includes("locality")) {
				city = locationDetail.long_name;
			}

			if (locationDetailType.includes("administrative_area_level_1")) {
				province = locationDetail.long_name;
			}

			if (locationDetailType.includes("country")) {
				country = locationDetail.long_name;
			}
		}

		return {
			addressNumber,
			address,
			city,
			province,
			country
		};
	};

	const handleSelectedAddress = async (data: any) => {
		const { address, addressNumber, city, country, province } = await getParsedLocationDetails({
			placeId: data.place_id
		});

		setAddress(`${addressNumber} ${address}`);
		setCity(city);
		setCountry(country);
		setProvince(province);
		onChange(`${addressNumber} ${address}, ${city}, ${province}, ${country}`);
		getPlacePredictions({ input: "" });
	};

	return (
		<div>
			<label>Address*</label>
			<div className="mt-1 flex rounded-md shadow-sm">
				<input
					type="text"
					placeholder="76 Intermodal Dr."
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

			<div className="mb-2 grid grid-cols-3 gap-2">
				<div>
					<label>City*</label>
					<div className="mt-1 flex rounded-md shadow-sm">
						<input
							type="text"
							placeholder="Brampton"
							className={`input w-full bg-slate-200 border-neutral`}
							value={selectedCity}
							readOnly
						/>
					</div>
				</div>
				<div>
					<label>Province*</label>
					<div className="mt-1 flex rounded-md shadow-sm">
						<input
							type="text"
							placeholder="ON"
							className={`input w-full bg-slate-200 border-neutral`}
							value={selectedProvince}
							readOnly
						/>
					</div>
				</div>
				<div>
					<label>Country*</label>
					<div className="mt-1 flex rounded-md shadow-sm">
						<input
							type="text"
							placeholder="Canada"
							className={`input w-full bg-slate-200 border-neutral`}
							value={selectedCountry}
							readOnly
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
