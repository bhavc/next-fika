import Link from "next/link";

interface WorkflowCardsData {
	workflows: any[];
}

export default function WorkflowCards({ workflows }: WorkflowCardsData) {
	console.log("workflows", workflows);
	return (
		<div className="flex flex-col gap-2">
			{workflows?.map((workflow, index) => {
				return (
					<Link key={index} href={`/client/workflow/${workflow.id}`}>
						<div className="card w-80 bg-slate-200 shadow-xl">
							<div className="card-body">
								<h2 className="card-title">Card title!</h2>
								<p>If a dog chews shoes whose shoes does he choose?</p>
							</div>
						</div>
					</Link>
				);
			})}
		</div>
	);
}
