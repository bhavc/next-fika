import { useState } from "react";

import ClientLayout from "@/layouts/ClientLayout";

import NewWorkflowFormCargo from "@/features/Client/Workflow/NewWorkflowFormCargo";
import NewWorkflowFormLocation from "@/features/Client/Workflow/NewWorkflowFormLocation";
import NewWorkflowFormPrice from "@/features/Client/Workflow/NewWorkflowFormPrice";

export default function Workflow() {
	const [step, setStep] = useState(0);

	const handleSubmitWorkflow = () => {
		setStep(step + 1);
	};

	const handleGoBack = () => {
		setStep(step - 1);
	};

	return (
		<>
			<ClientLayout>
				<main className="px-4">
					<h1 className="text-3xl mt-2 mb-4 text-left">Create a new Workflow</h1>

					{step === 0 && <NewWorkflowFormCargo handleSubmitWorkflow={handleSubmitWorkflow} />}
					{step === 1 && (
						<NewWorkflowFormLocation
							handleSubmitWorkflow={handleSubmitWorkflow}
							handleGoBack={handleGoBack}
						/>
					)}
					{step === 2 && (
						<NewWorkflowFormPrice
							handleSubmitWorkflow={handleSubmitWorkflow}
							handleGoBack={handleGoBack}
						/>
					)}
				</main>
			</ClientLayout>
		</>
	);
}
