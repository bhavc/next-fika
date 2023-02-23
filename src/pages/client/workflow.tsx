import { useState } from "react";

import ClientLayout from "@/layouts/ClientLayout";

import NewWorkflowFormAddress from "@/features/Client/Workflow/NewWorkflowFormAddress";
import NewWorkflowFormContainerDetails from "@/features/Client/Workflow/NewWorkflowFormContainerDetails";
import NewWorkflowFormNotes from "@/features/Client/Workflow/NewWorkflowFormNotes";

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

					{step === 0 && <NewWorkflowFormAddress handleSubmitWorkflow={handleSubmitWorkflow} />}
					{step === 1 && (
						<NewWorkflowFormContainerDetails
							handleSubmitWorkflow={handleSubmitWorkflow}
							handleGoBack={handleGoBack}
						/>
					)}
					{step === 2 && (
						<NewWorkflowFormNotes
							handleSubmitWorkflow={handleSubmitWorkflow}
							handleGoBack={handleGoBack}
						/>
					)}
				</main>
			</ClientLayout>
		</>
	);
}
