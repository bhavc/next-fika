import { ReactNode } from "react";

import { formatDateStringToDateCalendar } from "@/utils/time";

interface StepperProps {
	steps: { value: number; label: string }[];
	currentStep: number;
}

const mapStepperComponentToCurrentStep = (
	step: { value: number; label: string },
	currentStep: number
) => {
	if (step.value === currentStep) {
		return (
			<li key={step.value} data-content="●" className="step step-primary w-36">
				<div className="flex flex-col">
					<div>{step.label}</div>
				</div>
			</li>
		);
	}

	if (step.value < currentStep) {
		return (
			<li key={step.value} data-content="✓" className="step step-primary w-36">
				<div className="flex flex-col">
					<div>{step.label}</div>
				</div>
			</li>
		);
	}

	return (
		<li key={step.value} data-content="●" className="step w-36">
			<div className="flex flex-col">
				<div>{step.label}</div>
			</div>
		</li>
	);
};

export default function RegistrationStepper({ steps, currentStep }: StepperProps) {
	return (
		<div className="bg-inherit w-full flex justify-center items-center">
			<ul className="steps bg-slate-100 rounded-lg">
				{steps?.map((step, index) => {
					return mapStepperComponentToCurrentStep(step, currentStep);
				})}
			</ul>
		</div>
	);
}
