import { ReactNode } from "react";

import { formatDateStringToDate, formatDateStringToDateCalendar } from "@/utils/time";

interface StepperProps {
	children?: { [key: string]: string }[];
}

export default function Stepper({ children }: StepperProps) {
	return (
		<div className="bg-slate-100 w-full py-4 flex justify-center items-center">
			<ul className="steps bg-inherit">
				{children?.map((child, index) => {
					return (
						<li key={index} data-content="●" className="step step-neutral w-36">
							<div className="flex flex-col">
								<div>{child.status}</div>
								<p className="text-sm pl-4 text-slate-500">
									{formatDateStringToDateCalendar(child.createdAt)}
								</p>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
