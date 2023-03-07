import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

import ClientLayout from "@/layouts/ClientLayout";

import { WorkflowFormAddressInputs } from "@/features/Client/Workflow/NewWorkflowFormAddress";
import { WorkflowFormContainerDetailsInputs } from "@/features/Client/Workflow/NewWorkflowFormContainerDetails";
import { WorkflowFormNotesInputs } from "@/features/Client/Workflow/NewWorkflowFormNotes";

import NewWorkflowFormAddress from "@/features/Client/Workflow/NewWorkflowFormAddress";
import NewWorkflowFormContainerDetails from "@/features/Client/Workflow/NewWorkflowFormContainerDetails";
import NewWorkflowFormNotes from "@/features/Client/Workflow/NewWorkflowFormNotes";
import NewWorkflowFormReview from "@/features/Client/Workflow/NewWorkflowReview";

import { createWorkflow } from "@/api/workflow";

import { FileType } from "@/features/Client/Workflow/types";

import AlertIcon from "public/svg/alert-circle.svg";

export default function Workflow({ userToken }: { userToken: string }) {
	const router = useRouter();
	const [step, setStep] = useState(0);
	const [workflowFormAddressState, setWorkflowFormAddressState] =
		useState<WorkflowFormAddressInputs>({
			containerNumber: "",
			shipmentNumber: "",
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

	const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);

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

	const handleSubmitReview = async () => {
		const workflowData = {
			workflowAddressData: workflowFormAddressState,
			workflowContainerData: workflowFormContainerDetailsState,
			workflowNotes: workflowFormNotesState,
			uploadedFiles
		};

		try {
			const response = await createWorkflow(userToken, workflowData);
			toast.success(response.message);
			router.push("/client/workflows");
		} catch (err) {
			toast.error("Error creating workflow");
		}
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
				<main id="workflowParent" className="px-4 overflow-auto">
					<div className="bg-slate-100 mt-2 px-4">
						<h1 id="workflowHeader" className="text-3xl mt-4 text-left rounded-t-md p-4">
							Create a new Delivery
						</h1>
						{step < 2 && (
							<div className="alert alert-info shadow-lg">
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
								handleSubmit={handleSubmitReview}
							/>
						)}
					</div>
				</main>
			</ClientLayout>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req } = context;
	const { cookies } = req;
	const userToken = cookies.user;

	if (!userToken) {
		return {
			redirect: {
				destination: "/",
				statusCode: 302
			}
		};
	}

	return {
		props: {
			userToken
		}
	};
};
