import Image from "next/image";
import { UserType } from "../types";

interface RegisterTypeProps {
	selectedAccountType: UserType | null;
	accountTypeCards: { type: string; imageUrl: string; title: string; body: string }[];
	setSelectedItem: (index: number) => void;
	setNextStep: () => void;
}

export default function RegisterType({
	accountTypeCards,
	selectedAccountType,
	setSelectedItem
}: RegisterTypeProps) {
	return (
		<div className="flex flex-col gap-4 justify-center items-center mt-8">
			{accountTypeCards.map((accountCard, index) => {
				return (
					<button key={accountCard.type} onClick={() => setSelectedItem(index)}>
						<div
							className={`card w-80 shadow-xl ${
								accountCard.type === selectedAccountType ? "bg-accent-content" : "bg-base-100"
							}`}
						>
							{/* <figure>
									<img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
								</figure> */}
							<div className="card-body">
								<h2 className="card-title">{accountCard.title}</h2>
								<p>{accountCard.body}</p>
								{/* <div className="card-actions justify-end">
									<button className="btn btn-primary">Select</button>
								</div> */}
							</div>
						</div>
					</button>
				);
			})}
		</div>
	);
}
