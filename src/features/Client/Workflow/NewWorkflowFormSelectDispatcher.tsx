import Image from "next/image";

import IconRight from "public/svg/arrow-right.svg";

// TODO get a list of the users dispatchers
// if a user uses a dispatcher, keep these as their favorites/last used

// TODO add pagination

export type AreasServiced = "Local" | "Provincial" | "Cross Country" | "Cross Border";

interface NewWorkflowFormSelectDispatcherProps {
	selectedDispatcher: number | null;
	handleSelectedDispatcher: (dispatcherId: number) => void;
}

export default function NewWorkflowFormSelectDispatcher({
	selectedDispatcher,
	handleSelectedDispatcher
}: NewWorkflowFormSelectDispatcherProps) {
	// TODO have to add countries serviced
	// TODO pass this data in instead of hard coding it
	const favoriteDispatchers = [
		{
			id: 1,
			companyName: "Company 1",
			logo: "Logo here",
			isFavorite: false,
			areasServiced: ["Local", "Provincial"]
		},
		{
			id: 2,
			companyName: "Company 2",
			logo: "Logo here",
			isFavorite: true,
			areasServiced: ["Local", "Provincial"]
		},
		{
			id: 3,
			companyName: "Company 3",
			logo: "Logo here",
			isFavorite: false,
			areasServiced: ["Local", "Provincial", "Cross Country", "Cross Border"]
		}
	];

	const dispatchers = [
		{
			id: 4,
			companyName: "Company 1",
			logo: "Logo here",
			isFavorite: false,
			areasServiced: ["Local", "Provincial"]
		},
		{
			id: 5,
			companyName: "Company 2",
			logo: "Logo here",
			isFavorite: true,
			areasServiced: ["Local", "Provincial"]
		},
		{
			id: 6,
			companyName: "Company 3",
			logo: "Logo here",
			isFavorite: false,
			areasServiced: ["Local", "Provincial", "Cross Country", "Cross Border"]
		},
		{
			id: 7,
			companyName: "Company 1",
			logo: "Logo here",
			isFavorite: false,
			areasServiced: ["Local", "Provincial"]
		},
		{
			id: 8,
			companyName: "Company 2",
			logo: "Logo here",
			isFavorite: true,
			areasServiced: ["Local", "Provincial"]
		},
		{
			id: 9,
			companyName: "Company 3",
			logo: "Logo here",
			isFavorite: false,
			areasServiced: ["Local", "Provincial", "Cross Country", "Cross Border"]
		}
	];

	return (
		<div className="w-full bg-slate-100 rounded-b-md p-4 mb-4">
			<h2 className="prose prose-2xl">Select Your dispatchers</h2>
			<div className="px-4">
				<h3 className="prose prose-xl">Favorites/Frequently used</h3>
				<div className="flex flex-row flex-wrap gap-4">
					{favoriteDispatchers.map((dispatcher, index) => {
						return (
							<button key={index} onClick={() => handleSelectedDispatcher(dispatcher.id)}>
								<div
									className={`card w-96 ${
										selectedDispatcher === dispatcher.id ? "bg-accent-content" : "bg-base-100"
									} shadow-xl`}
								>
									<figure>
										<Image
											src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
											alt="Company Logo"
											height={"40"}
											width={"40"}
										/>
									</figure>
									<div className="card-body">
										<h2 className="card-title">
											{dispatcher.companyName}
											<div className="badge badge-secondary">Used Before</div>
										</h2>
										{/* <p>If a dog chews shoes whose shoes does he choose?</p> */}

										<div className="card-actions justify-end">
											{dispatcher.areasServiced.map((areaServiced, index) => {
												return (
													<div key={index} className="badge badge-outline">
														{areaServiced}
													</div>
												);
											})}
										</div>
									</div>
								</div>
							</button>
						);
					})}
				</div>
			</div>
			<div className="divider" />
			<div className="px-4">
				<h3 className="prose prose-xl">Others</h3>
				<div className="flex flex-row flex-wrap gap-4">
					{dispatchers.map((dispatcher, index) => {
						return (
							<button key={index} onClick={() => handleSelectedDispatcher(dispatcher.id)}>
								<div
									className={`card w-96 ${
										selectedDispatcher === dispatcher.id ? "bg-accent-content" : "bg-base-100"
									} shadow-xl`}
								>
									<figure>
										<Image
											src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
											alt="Company Logo"
											height={"40"}
											width={"40"}
										/>
									</figure>
									<div className="card-body">
										<h2 className="card-title">
											{dispatcher.companyName}
											<div className="badge badge-secondary">Used Before</div>
										</h2>
										{/* <p>If a dog chews shoes whose shoes does he choose?</p> */}

										<div className="card-actions justify-end">
											{dispatcher.areasServiced.map((areaServiced, index) => {
												return (
													<div key={index} className="badge badge-outline">
														{areaServiced}
													</div>
												);
											})}
										</div>
									</div>
								</div>
							</button>
						);
					})}
				</div>
			</div>
			<div className="divider" />

			{/* TODO: add pagination */}
			{/* <div className="flex items-center justify-center">
				<div className="btn-group">
					<button className="btn btn-lg">1</button>
					<button className="btn btn-lg btn-active">2</button>
					<button className="btn btn-lg">3</button>
					<button className="btn btn-lg">4</button>
				</div>
			</div> */}

			<div className="flex justify-end">
				<button
					className="btn btn-circle bg-primary mt-10"
					form="newWorkflowFormSelectDispatcher"
					type="submit"
				>
					<IconRight />
				</button>
			</div>
		</div>
	);
}
