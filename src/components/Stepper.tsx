import { ReactNode } from "react";

interface StepperProps {
	children?: ReactNode;
}

export default function Stepper({ children }: StepperProps) {
	return (
		<ul className="steps">
			<li data-content="●" className="step step-neutral">
				Step 7
			</li>
		</ul>
	);
}
