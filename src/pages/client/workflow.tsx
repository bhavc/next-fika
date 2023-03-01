import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
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
import { getCurrentUser } from "@/api/user";

import AlertIcon from "public/svg/alert-circle.svg";

export default function Workflow({ userToken }: { userToken: string }) {
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

	type FileType = {
		name: string;
		type: string;
		url: string;
	};
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
		console.log("submitting");
		const workflowData = {
			workflowAddressData: workflowFormAddressState,
			workflowContainerData: workflowFormContainerDetailsState,
			workflowNotes: workflowFormNotesState,
			uploadedFiles
		};

		try {
			await createWorkflow(userToken, workflowData);
			toast.success("Successfully registered");
		} catch (err) {
			toast.error("Error creating workflow");
		}

		// {
		// 	"containerNumber": "TEMU",
		// 	"shipmentNumber": "S10",
		// 	"pickupCompanyName": "Canadian National Railway",
		// 	"pickupAddress": "76 intermodal dr, Brampton, Ontario, Canada",
		// 	"pickupContactName": "Gloria ",
		// 	"pickupContactPhone": "1234321421",
		// 	"pickupWindow": "6am - 9pm",
		// 	"pickupAppointmentNeeded": false,
		// 	"dropoffCompanyName": "Some other dropof company",
		// 	"dropoffAddress": "5867 riverside place, Mississauga, Ontario, Canada",
		// 	"dropoffContactName": "Bhav",
		// 	"dropoffContactPhone": "34214321",
		// 	"dropoffWindow": "7am - 6pm",
		// 	"dropOffAppointmentNeeded": true,
		// 	"bolNumber": "XXXX123456789",
		// 	"t1Number": "GS22693482190",
		// 	"borderCrossing": "Detoir"
		// }

		// {
		// 	"useCustomPricing": true,
		// 	"customPrice": "$500 USD",
		// 	"goodsDescription": "dfsaklfjaskfjlk\n\n\ndjflksajl\n\n\n\njlfkdasjlk",
		// 	"cargoType": "5",
		// 	"length": "17' 11 ⅝\"",
		// 	"width": "7'6\"",
		// 	"height": "7' 4 ⅞\"",
		// 	"sealNumber": "oolgka",
		// 	"numberOfPackages": "40plt",
		// 	"grossWeight": "4312",
		// 	"netWeight": "321432",
		// 	"goodsVolume": "4321",
		// 	"isHumid": true,
		// 	"damaged": true,
		// 	"frozen": true,
		// 	"requiresChiller": false,
		// 	"requiresControlledAtmosphere": false,
		// 	"isDropoff": true,
		// 	"dropoffTerminalName": "MSC",
		// 	"isReturn": true,
		// 	"returnDepotName": "Mombasa",
		// 	"shippingLine": "MSC",
		// 	"vesselName": "Scorpo Honor"
		// }

		// {
		// 	"notes": "Here are some extra notes \n\n\nHere are a bunch of extra notes"
		// }
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
				</main>
			</ClientLayout>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req } = context;
	const { cookies } = req;
	const userToken =
		cookies.user ||
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjc3NjMwOTQxLCJleHAiOjE2Nzc3MTczNDF9.WYqldAIQnUxyckVNpGyqecVTL5GHtwelAKqBPQFG10w";

	let userData;

	if (!userToken) {
		console.log("theres not token");

		return {
			redirect: {
				destination: "/",
				statusCode: 302
			}
		};
	}

	// need to validate user here

	try {
		const responseData = await getCurrentUser(userToken);
		userData = responseData.user;
	} catch (err) {
		console.log("err", err);
	}

	// console.log("userData", userData);

	return {
		props: {
			hello: "hello",
			userToken
		}
	};
};
