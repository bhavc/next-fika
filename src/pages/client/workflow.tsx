import { useState, useEffect } from "react";

import ClientLayout from "@/layouts/ClientLayout";

import { WorkflowFormAddressInputs } from "@/features/Client/Workflow/NewWorkflowFormAddress";
import { WorkflowFormContainerDetailsInputs } from "@/features/Client/Workflow/NewWorkflowFormContainerDetails";
import { WorkflowFormNotesInputs } from "@/features/Client/Workflow/NewWorkflowFormNotes";

import NewWorkflowFormAddress from "@/features/Client/Workflow/NewWorkflowFormAddress";
import NewWorkflowFormContainerDetails from "@/features/Client/Workflow/NewWorkflowFormContainerDetails";
import NewWorkflowFormNotes from "@/features/Client/Workflow/NewWorkflowFormNotes";
import NewWorkflowFormReview from "@/features/Client/Workflow/NewWorkflowReview";

import AlertIcon from "public/svg/alert-circle.svg";

export default function Workflow() {
	const [step, setStep] = useState(0);
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
			dropOffAppointmentNeeded: false,
			bolNumber: "",
			t1Number: "",
			borderCrossing: ""
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
			isDropoff: false,
			dropoffTerminalName: "",
			isReturn: false,
			returnDepotName: "",
			shippingLine: "",
			vesselName: ""
		});

	const [workflowFormNotesState, setWorkflowFormNotesState] = useState<WorkflowFormNotesInputs>({
		notes: ""
	});

	const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

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

	const handleUploadedFiles = (data: any[]) => {
		setUploadedFiles(data);
	};

	useEffect(() => {
		const element = document.getElementById("workflowHeader");
		element?.scrollIntoView({ behavior: "smooth" });
	}, [step]);

	return (
		<>
			<ClientLayout>
				<main id="workflowParent" className="px-4 overflow-auto bg-slate-100">
					<h1 id="workflowHeader" className="text-3xl mt-2 text-left rounded-t-md p-4">
						Create a new Delivery
					</h1>
					{step < 2 && (
						<div className="alert alert-info shadow-lg ml-auto mr-auto w-2/4">
							<div>
								<AlertIcon />
								<span className="text-white">
									Save all of your files to upload in the final section
								</span>
							</div>
						</div>
					)}

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
							uploadedFiles={uploadedFiles}
							handleUploadedFiles={handleUploadedFiles}
							handleGoBack={handleGoBack}
						/>
					)}
					{step === 3 && (
						<NewWorkflowFormReview
							workflowFormAddressState={workflowFormAddressState}
							workflowFormContainerDetailsState={workflowFormContainerDetailsState}
							workflowFormNotesState={workflowFormNotesState}
							uploadedFiles={uploadedFiles}
							handleGoBack={handleGoBack}
						/>
					)}
				</main>
			</ClientLayout>
		</>
	);
}
