import { useState, useEffect } from "react";

import ClientLayout from "@/layouts/ClientLayout";

import { WorkflowFormAddressInputs } from "@/features/Client/Workflow/NewWorkflowFormAddress";
import { WorkflowFormContainerDetailsInputs } from "@/features/Client/Workflow/NewWorkflowFormContainerDetails";
import { WorkflowFormNotesInputs } from "@/features/Client/Workflow/NewWorkflowFormNotes";

import NewWorkflowFormAddress from "@/features/Client/Workflow/NewWorkflowFormAddress";
import NewWorkflowFormContainerDetails from "@/features/Client/Workflow/NewWorkflowFormContainerDetails";
import NewWorkflowFormNotes from "@/features/Client/Workflow/NewWorkflowFormNotes";
import NewWorkflowFormReview from "@/features/Client/Workflow/NewWorkflowReview";

export default function Workflow() {
	const [step, setStep] = useState(2);
	const [workflowFormAddressState, setWorkflowFormAddressState] =
		useState<WorkflowFormAddressInputs>({
			containerNumber: "",
			shipmentNumber: "",
			clearance: "",
			pickupCompanyName: "",
			pickupAddress: "",
			pickupCity: "",
			pickupProvince: "",
			pickupCountry: "",
			pickupContactName: "",
			pickupContactPhone: "",
			pickupWindow: "",
			pickupAppointmentNeeded: false,
			dropoffCompanyName: "",
			dropoffAddress: "",
			dropoffCity: "",
			dropoffProvince: "",
			dropoffCountry: "",
			dropoffContactName: "",
			dropoffContactPhone: "",
			dropoffWindow: "",
			dropOffAppointmentNeeded: false
		});
	const [workflowFormContainerDetailsState, setWorkflowFormContainerDetailsState] =
		useState<WorkflowFormContainerDetailsInputs>({
			useCustomPricing: false,
			customPrice: "",
			goodsDescription: "",
			cargoType: "",
			length: "",
			width: "",
			height: "",
			sealNumber: "",
			numberOfPackages: "",
			grossWeight: "",
			netWeight: "",
			goodsVolume: "",
			isHumid: false,
			damaged: false,
			frozen: false,
			requiresChiller: false,
			requiresControlledAtmosphere: false,
			shippingLine: "",
			vesselName: ""
		});

	const [workflowFormNotesState, setWorkflowFormNotesState] = useState<WorkflowFormNotesInputs>({
		notes: "",
		files: []
	});

	const handleNextStep = () => {
		setStep(step + 1);
	};

	const handleGoBack = () => {
		setStep(step - 1);
	};

	const handleSubmitNewWorkflowFormAddress = (data: WorkflowFormAddressInputs) => {
		setWorkflowFormAddressState(data);
		handleNextStep();
	};

	const handleSubmitNewWorkflowFormContainerDetails = (
		data: WorkflowFormContainerDetailsInputs
	) => {
		setWorkflowFormContainerDetailsState(data);
		handleNextStep();
	};

	const handleSubmitNewWorkflowFormNotes = (data: WorkflowFormNotesInputs) => {
		setWorkflowFormNotesState(data);
		handleNextStep();
	};

	useEffect(() => {
		const element = document.getElementById("workflowHeader");
		element?.scrollIntoView({ behavior: "smooth" });
	}, [step]);

	return (
		<>
			<ClientLayout>
				<main id="workflowParent" className="px-4 overflow-auto">
					<h1 id="workflowHeader" className="text-3xl mt-2 text-left bg-slate-100 rounded-t-md p-4">
						Create a new Workflow
					</h1>

					{/* allow users to eventually be able to upload a csv */}

					{step === 0 && (
						<NewWorkflowFormAddress
							handleSubmitWorkflow={handleSubmitNewWorkflowFormAddress}
							workflowFormAddressState={workflowFormAddressState}
						/>
					)}
					{step === 1 && (
						<NewWorkflowFormContainerDetails
							handleSubmitWorkflow={handleSubmitNewWorkflowFormContainerDetails}
							handleGoBack={handleGoBack}
							workflowFormContainerDetailsState={workflowFormContainerDetailsState}
						/>
					)}
					{step === 2 && (
						<NewWorkflowFormNotes
							handleSubmitWorkflow={handleSubmitNewWorkflowFormNotes}
							workflowFormNotesState={workflowFormNotesState}
							handleGoBack={handleGoBack}
						/>
					)}
					{step === 3 && (
						<NewWorkflowFormReview
							workflowFormAddressState={workflowFormAddressState}
							workflowFormContainerDetailsState={workflowFormContainerDetailsState}
							workflowFormNotesState={workflowFormNotesState}
							handleGoBack={handleGoBack}
						/>
					)}
				</main>
			</ClientLayout>
		</>
	);
}
