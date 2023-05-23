import type { UserType } from "../types";

interface RegisterTypeProps {
	selectedAccountType: UserType | null;
	accountTypeCards: { type: string; icon: JSX.Element; title: string; body: string }[];
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
							className={`card w-80 h-56 shadow-xl p-4 ${
								accountCard.type === selectedAccountType ? "bg-accent-content" : "bg-base-100"
							}`}
						>
							<figure>{accountCard.icon}</figure>
							<div className="card-body p-4">
								<h2 className="card-title">{accountCard.title}</h2>
								<p className="text-left">{accountCard.body}</p>
							</div>
						</div>
					</button>
				);
			})}
		</div>
	);
}
