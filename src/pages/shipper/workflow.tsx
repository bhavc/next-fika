import { useState, useEffect, MouseEvent } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

import ShipperLayout from "@/layouts/ShipperLayout";

import { WorkflowFormAddressInputs } from "@/features/Shipper/ShipperWorkflows/NewWorkflowForm/NewWorkflowFormAddress";
import { WorkflowFormContainerDetailsInputs } from "@/features/Shipper/ShipperWorkflows/NewWorkflowForm/NewWorkflowFormContainerDetails";
import { WorkflowFormNotesInputs } from "@/features/Shipper/ShipperWorkflows/NewWorkflowForm/NewWorkflowFormNotes";

import NewWorkflowFormAddress from "@/features/Shipper/ShipperWorkflows/NewWorkflowForm/NewWorkflowFormAddress";
import NewWorkflowFormSelectCarrier from "@/features/Shipper/ShipperWorkflows/NewWorkflowForm/NewWorkflowFormSelectCarrier";
import NewWorkflowFormContainerDetails from "@/features/Shipper/ShipperWorkflows/NewWorkflowForm/NewWorkflowFormContainerDetails";
import NewWorkflowFormNotes from "@/features/Shipper/ShipperWorkflows/NewWorkflowForm/NewWorkflowFormNotes";
import NewWorkflowFormReview from "@/features/Shipper/ShipperWorkflows/NewWorkflowForm/NewWorkflowReview";

import { createWorkflow } from "@/api/workflow";

import { FileType } from "@/features/Shipper/ShipperWorkflows/types";
import type { UserCarrier } from "../../features/Carrier/UserCarrier/types";

import AlertIcon from "public/svg/alert-circle.svg";
import { getCarriers } from "@/api/carriers";
import { getCountryFromAddress } from "@/features/Shipper/ShipperWorkflows/helpers";

export default function Workflow({ userToken }: { userToken: string }) {
	const router = useRouter();
	const [step, setStep] = useState(0);
	const [workflowFormAddressState, setWorkflowFormAddressState] =
		useState<WorkflowFormAddressInputs>({
			containerNumber: "",
			shipmentNumber: "",
			pickupCompanyName: "",
			pickupAddress: "",
			pickupContactName: "",
			pickupContactPhone: "",
			pickupWindow: "",
			pickupAppointmentNeeded: false,
			dropoffCompanyName: "",
			dropoffAddress: "",
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
	const [selectedCarrier, setSelectedCarrier] = useState<UserCarrier | undefined>(undefined);
	const [carriers, setCarriers] = useState<UserCarrier[]>([]);

	const handleSelectedCarrier = (carrierId: number | null) => {
		if (carrierId) {
			const mappedCarrier = carriers.find((carrier) => carrier.id === carrierId);
			setSelectedCarrier(mappedCarrier);
		}
	};

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
			selectedCarrier,
			uploadedFiles
		};

		try {
			const response = await createWorkflow(userToken, workflowData);
			toast.success(response.message);
			router.push("/shipper/workflows");
		} catch (err) {
			toast.error("Error creating workflow");
		}
	};

	const handleUploadedFiles = (data: any[]) => {
		setUploadedFiles(data);
	};

	const handleUploadedFileRemove = (event: MouseEvent<HTMLElement>, key: number) => {
		event.preventDefault();
		const uploadedFilesCopy = [...uploadedFiles];
		uploadedFilesCopy.splice(key, 1);
		setUploadedFiles(uploadedFilesCopy);
	};

	useEffect(() => {
		const element = document.getElementById("workflowHeader");
		element?.scrollIntoView({ behavior: "smooth" });
	}, [step]);

	useEffect(() => {
		if (step === 1) {
			const pickupCountry = getCountryFromAddress(workflowFormAddressState.pickupAddress);
			const dropoffCountry = getCountryFromAddress(workflowFormAddressState.dropoffAddress);

			getCarriers({ userToken, pickupCountry, dropoffCountry })
				.then((value) => {
					const responseData = value.data;
					setCarriers(responseData);
				})
				.catch((err) => {
					toast.error("Error getting a carrier list. Please try creating a delivery request later");
				});
		}
	}, [
		step,
		workflowFormAddressState.pickupAddress,
		workflowFormAddressState.dropoffAddress,
		userToken
	]);

	return (
		<>
			<ShipperLayout>
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
							<NewWorkflowFormSelectCarrier
								selectedCarrier={selectedCarrier}
								handleSelectedCarrier={handleSelectedCarrier}
								carriers={carriers}
								handleNextStep={handleNextStep}
								handleGoBack={handleGoBack}
							/>
						)}
						{step === 2 && (
							<NewWorkflowFormContainerDetails
								handleSubmitWorkflow={handleSubmitNewWorkflowFormContainerDetails}
								handleGoBack={handleGoBack}
								workflowFormContainerDetailsState={workflowFormContainerDetailsState}
							/>
						)}
						{step === 3 && (
							<NewWorkflowFormNotes
								handleSubmitWorkflow={handleSubmitNewWorkflowFormNotes}
								workflowFormNotesState={workflowFormNotesState}
								uploadedFiles={uploadedFiles}
								handleUploadedFiles={handleUploadedFiles}
								handleGoBack={handleGoBack}
								userToken={userToken}
								handleUploadedFileRemove={handleUploadedFileRemove}
							/>
						)}
						{step === 4 && (
							<NewWorkflowFormReview
								workflowFormAddressState={workflowFormAddressState}
								workflowFormContainerDetailsState={workflowFormContainerDetailsState}
								workflowFormNotesState={workflowFormNotesState}
								selectedCarrier={selectedCarrier}
								uploadedFiles={uploadedFiles}
								handleGoBack={handleGoBack}
								handleSubmit={handleSubmitReview}
							/>
						)}
					</div>
				</main>
			</ShipperLayout>
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
