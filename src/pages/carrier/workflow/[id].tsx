import { useState, useEffect, MouseEvent, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

import { getWorkflowByWorkflowId, editWorkflowByWorkflowId } from "@/api/workflow";
import { getDriversByCompany } from "@/api/drivers";
import { getWorkflowStatusByStatuses } from "@/api/workflowStatus";
import { getWorkflowNotesByWorkflowId, postWorkflowNotesByWorkflowId } from "@/api/workflowNotes";

import { getCarrierWorkflowModalStatusChangeCopy } from "@/features/Carrier/CarrierWorkflows/helpers";

import CarrierLayout from "@/layouts/CarrierLayout";
import CarrierWorkflow from "@/features/Carrier/CarrierWorkflows/CarrierWorkflow";
import CarrierWorkflowPricing from "@/features/Carrier/CarrierWorkflows/CarrierWorkflowPricing";

import FileUploader from "@/components/FileUploader";
import WorkflowStatusDropdown from "@/features/Carrier/CarrierWorkflows/WorkflowStatusDropdown";
import WorkflowAssignDriverDropdown from "@/features/Carrier/CarrierWorkflows/WorkflowAssignDriverDropdown";
import Modal from "@/components/Modal";
import Stepper from "@/components/Stepper";

import type { GetServerSideProps } from "next";
import type {
	CarrierWorkflowStatus,
	CarrierWorkflowType,
	CarrierWorkflowStatusType
} from "@/features/Carrier/CarrierWorkflows/types";
import type { FileType } from "@/features/Carrier/CarrierWorkflows/types";
import type { UserDriver } from "@/features/Driver/UserDriver/types";
import type { WorkflowNotesType } from "@/features/Shipper/ShipperWorkflows/types";

import ChatContainer from "@/components/ChatContainer";

import IconLeft from "public/svg/arrow-left.svg";
import PDFIcon from "public/svg/PDF_file_icon.svg";
import TextIcon from "public/svg/file-text.svg";

type BidSelectValueType = "accept" | "counter";

// TODO: you may have to pull workflow on front end
// when assigning allocated to triage and back you need to assign driver

export default function WorkflowId({
	workflow,
	userToken,
	workflowStatusData,
	drivers
}: {
	workflow: CarrierWorkflowType;
	userToken: string;
	workflowStatusData: { [key: string]: string }[];
	drivers: UserDriver[];
}) {
	const router = useRouter();

	const workflowStatus = workflow.status;
	const workflowId = workflow.id;
	const workflowAssignedDriver = workflow.assignedDriver;
	const price = workflow.workflowPriceData.price;
	const userFor = workflow.userId;
	const userForAsInt = parseInt(userFor, 10);
	const workflowUploadedFiles = workflow?.fileUrls;

	// toddo this should be the current users id
	const carrierId = workflow.selectedCarrier.id;

	// TODO figure out what should happen on
	// counter price. should a user have to assign a driver on counter
	// or is there a new status?

	// TODO driver notes need to be added.
	// carrier <-> driver notes
	// Shipper <-> carrier notes

	// TODO figure out when a user should be able to be selected
	// maybe we want to unassign and reassign to another user
	const showAssignDriverDropdown =
		workflowStatus === "Triage" ||
		(workflowStatus === "Allocated" && Boolean(workflowAssignedDriver?.id) === false);

	const [previousStatus, setPreviousStatus] = useState(workflowStatus);
	const [newStatus, setNewStatus] = useState(workflowStatus);
	const [assignedDriver, setAssignedDriver] = useState<UserDriver>();
	const [modalOpen, setModalOpen] = useState(false);
	const [workflowStatusChangeNotes, setWorkflowStatusChangeNotes] = useState("");
	const [bidSelectValue, setBidSelectValue] = useState<BidSelectValueType>("accept");
	const [carrierQuoteRequest, setCarrierQuoteRequest] = useState("");
	const [carrierCounterRequest, setCarrierCounterRequest] = useState(price?.toString() || "");
	const [quotePriceError, setQuotePriceError] = useState(false);
	const [shipperWorkflowNotes, setShipperWorkflowNotes] = useState<WorkflowNotesType[]>([]);
	const [driverWorkflowNotes, setDriverWorkflowNotes] = useState<WorkflowNotesType[]>([]);
	const [isMessageSentShipperLoading, setIsMessageSentShipperLoading] = useState(false);
	const [isMessageSentDriverLoading, setIsMessageSentDriverLoading] = useState(false);
	const [uploadedFiles, setUploadedFiles] = useState<FileType[]>(
		workflowUploadedFiles ? workflowUploadedFiles : []
	);

	// TODO make workflowassignedDriver and assignedDriver the same?

	const { titleText, bodyText } = getCarrierWorkflowModalStatusChangeCopy(newStatus);

	// TODO remove note sending functionality on status change
	const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const newStatus = event.target.value as CarrierWorkflowStatus;
		setNewStatus(newStatus);
		setWorkflowStatusChangeNotes("");

		// if (newStatus === "Triage") {
		// 	setAssignedDriver("")
		// }
	};

	// if in a certain status (allocated) and no driver is selected, allow user
	// to save workflow delivery
	const handleDriverChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const driverId = parseFloat(event.target.value);
		const mappedDriver = drivers.find((driver) => driver.id === driverId);
		setAssignedDriver(mappedDriver);
	};

	const refreshData = () => router.replace(router.asPath);

	const handleSaveChanges = async (event: MouseEvent<HTMLElement>) => {
		event.preventDefault();

		// carrier rejects their own price
		if (newStatus === "Counter Price") {
			if (
				carrierCounterRequest.match(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/i) === null ||
				bidSelectValue !== "counter"
			) {
				setQuotePriceError(true);
				toast.error("You must ensure you counter the price with a valid price.");
				return;
			}
		}

		// flows
		// carrier accepts and provides quote
		// carrier accepts with shipper price
		if (newStatus === "Allocated") {
			if (!price && carrierQuoteRequest.match(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/i) === null) {
				setQuotePriceError(true);
				toast.error("You must ensure you provide a valid quote price.");
				return;
			}

			if (!assignedDriver) {
				toast.error("You must ensure you assign your delivery to a driver.");
				return;
			}
		}

		// can add modal functionality later
		// setModalOpen(true);
		handleConfirmModal();
	};

	const handleBidSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
		const bidValueSelected = event.target.value as BidSelectValueType;
		setBidSelectValue(bidValueSelected);
	};

	const handleCarrierQuoteRequest = (event: ChangeEvent<HTMLInputElement>) => {
		setCarrierQuoteRequest(event.target.value);
	};

	const handleCarrierCounterRequest = (event: ChangeEvent<HTMLInputElement>) => {
		setCarrierCounterRequest(event.target.value);
	};

	// TODO: add logic for status changes
	const handleConfirmModal = async () => {
		try {
			// TODO change where the message is posted here
			const updateData: { [key: string]: any } = {
				workflow: {
					status: newStatus,
					carrierNotes: workflowStatusChangeNotes,
					assignedDriver: assignedDriver?.id
				},
				payment: {}
			};

			if (newStatus === "Triage") {
				updateData.workflow.assignedDriver = undefined;
			}

			// RFQ in the body
			if (carrierQuoteRequest) {
				updateData.payment.carrierQuote = carrierQuoteRequest;
				// Counter in body
			} else if (carrierCounterRequest) {
				updateData.payment.carrierCounter = carrierCounterRequest;
				updateData.payment.bidTurn = workflow.userId;
				// accepted price in body
			} else {
				updateData.payment.acceptedPrice = price;
			}

			const response = await editWorkflowByWorkflowId({ userToken, workflowId, body: updateData });
			setPreviousStatus(newStatus);
			toast.success(response.message);
			refreshData();
		} catch (err) {
			toast.error("Error updating workflow");
		} finally {
			setModalOpen(false);
			setQuotePriceError(false);
		}
	};

	const handleCancelModal = () => {
		setModalOpen(false);
	};

	const handleWorkflowStatusChangeNotes = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setWorkflowStatusChangeNotes(event.target.value);
	};

	// TODO: work on sendMessage functionality
	const handleMessageSendShipper = async (message: string) => {
		try {
			setIsMessageSentShipperLoading(true);
			const response = await postWorkflowNotesByWorkflowId({
				userToken,
				workflowId,
				userTo: userForAsInt,
				message
			});

			const responseMessage = response.message;
			const responseWorkflowNotes = response.workflowNotes;

			toast.success(responseMessage);
			setIsMessageSentShipperLoading(false);
			setShipperWorkflowNotes(responseWorkflowNotes);
		} catch (err) {
			toast.error("Error sending message workflow");
		}
	};

	const handleMessageSendDriver = async (message: string) => {
		try {
			if (workflowAssignedDriver?.id) {
				setIsMessageSentDriverLoading(true);
				const response = await postWorkflowNotesByWorkflowId({
					userToken,
					workflowId,
					userTo: workflowAssignedDriver?.id,
					message
				});

				const responseMessage = response.message;
				const responseWorkflowNotes = response.workflowNotes;

				toast.success(responseMessage);
				setIsMessageSentDriverLoading(false);
				setDriverWorkflowNotes(responseWorkflowNotes);
			}
		} catch (err) {
			toast.error("Error sending message workflow");
		}
	};

	const handleUploadedFiles = async (data: any[]) => {
		// what i want to do is send an update
		setUploadedFiles(data);

		try {
			const updateData: { [key: string]: any } = {
				uploadedFiles: data
			};

			const response = await editWorkflowByWorkflowId({ userToken, workflowId, body: updateData });
			toast.success(response.message);
		} catch (err) {
			toast.error("Error adding workflow files");
		}
	};

	const handleUploadedFileRemove = async (event: MouseEvent<HTMLElement>, key: number) => {
		// what i want to do is send an update to the backend
		event.preventDefault();
		const uploadedFilesCopy = [...uploadedFiles];
		uploadedFilesCopy.splice(key, 1);
		setUploadedFiles(uploadedFilesCopy);

		try {
			const updateData: { [key: string]: any } = {
				uploadedFilesCopy
			};

			const response = await editWorkflowByWorkflowId({ userToken, workflowId, body: updateData });
			toast.success(response.message);
		} catch (err) {
			toast.error("Error removing workflow files");
		}
	};

	useEffect(() => {
		getWorkflowNotesByWorkflowId({
			userToken,
			workflowId,
			userTo: userFor
		})
			.then((data: { message: string; workflowNotes: WorkflowNotesType[] }) => {
				setShipperWorkflowNotes(data.workflowNotes);
			})
			.catch((err: any) => {
				setShipperWorkflowNotes([]);
			});
	}, [userToken, workflowId, userFor]);

	useEffect(() => {
		if (workflowAssignedDriver && workflowAssignedDriver.id) {
			getWorkflowNotesByWorkflowId({
				userToken,
				workflowId,
				userTo: workflowAssignedDriver?.id.toString()
			})
				.then((data: { message: string; workflowNotes: WorkflowNotesType[] }) => {
					setDriverWorkflowNotes(data.workflowNotes);
				})
				.catch((err: any) => {
					setDriverWorkflowNotes([]);
				});
		}
	}, [userToken, workflowId, workflowAssignedDriver]);

	const ModalTextArea = (
		<textarea
			placeholder="Add any other notes here that you may want the shipper to know"
			className={`input w-full h-40 pt-2 whitespace-pre-wrap border-solid border-slate-300`}
			onChange={handleWorkflowStatusChangeNotes}
			value={workflowStatusChangeNotes}
		/>
	);

	const isSaveAllButtonDisabled = () => {
		return newStatus === previousStatus;
	};

	return (
		<>
			<CarrierLayout>
				<main className="items-center justify-center px-4">
					<h1 className="text-3xl mt-4 px-4 text-left">Delivery</h1>

					<div className="flex flex-row w-full justify-between bg-slate-100 rounded-b-md p-4 mt-4">
						<Link href={"/carrier/workflows"} className="btn btn-circle bg-primary">
							<IconLeft />
						</Link>
						<div>
							{!["Cancelled", "Rejected"].includes(previousStatus) && (
								<button
									className="btn btn-primary"
									disabled={isSaveAllButtonDisabled()}
									onClick={handleSaveChanges}
								>
									Save All
								</button>
							)}
						</div>
					</div>

					{!["Rejected"].includes(workflowStatus) && (
						<div className="flex justify-end align-middle bg-slate-100 px-4">
							<WorkflowStatusDropdown
								handleStatusChange={handleStatusChange}
								newStatus={newStatus}
								previousStatus={previousStatus}
								workflow={workflow}
								bidSelectValue={bidSelectValue}
							/>
						</div>
					)}

					{showAssignDriverDropdown && (
						<div className="flex justify-end align-middle bg-slate-100 px-4 py-4">
							<WorkflowAssignDriverDropdown
								drivers={drivers}
								handleDriverChange={handleDriverChange}
								assignedDriver={assignedDriver}
							/>
						</div>
					)}

					{workflowAssignedDriver && workflowAssignedDriver.id && (
						<div className="bg-slate-100 pt-4 pr-4 flex justify-end">
							<div className="stats border-accent border-2 ">
								<div className="stat">
									<div className="stat-title">Assigned Driver</div>
									<div className="stat-value text-primary">
										{workflowAssignedDriver.firstName} {workflowAssignedDriver.lastName} (
										{workflowAssignedDriver.username})
									</div>
									<div className="stat-desc">to move your shipment</div>
								</div>
							</div>
						</div>
					)}

					{workflowStatusData && (
						<div className="bg-slate-100 px-4">
							<h1 className="text-2xl text-left rounded-t-md mb-4">Delivery Status</h1>
							<Stepper>{workflowStatusData}</Stepper>
						</div>
					)}

					<CarrierWorkflow workflow={workflow}>
						<CarrierWorkflowPricing
							workflowStatus={workflowStatus}
							price={price}
							handleBidSelectChange={handleBidSelectChange}
							bidSelectValue={bidSelectValue}
							carrierQuoteRequest={carrierQuoteRequest}
							handleCarrierQuoteRequest={handleCarrierQuoteRequest}
							quotePriceError={quotePriceError}
							handleCarrierCounterRequest={handleCarrierCounterRequest}
							carrierCounterRequest={carrierCounterRequest}
						/>
					</CarrierWorkflow>

					{/* Carrier & Driver chat */}
					{carrierId && shipperWorkflowNotes && (
						<div className="bg-slate-100 p-4 ">
							<h2 className="text-xl">Shipper Chat</h2>
							<p className="text-md pl-4 mb-4">This is your chat history with the Shipper</p>
							<ChatContainer
								currentUserId={carrierId}
								messageArray={shipperWorkflowNotes}
								handleMessageSend={handleMessageSendShipper}
								isMessageSentLoading={isMessageSentShipperLoading}
							/>
						</div>
					)}

					{carrierId && driverWorkflowNotes && (
						<div className="bg-slate-100 p-4 ">
							<h2 className="text-xl">Driver Chat</h2>
							<p className="text-md pl-4 mb-4">This is your chat history with the Driver</p>
							<ChatContainer
								currentUserId={carrierId}
								messageArray={driverWorkflowNotes}
								handleMessageSend={handleMessageSendDriver}
								isMessageSentLoading={isMessageSentDriverLoading}
							/>
						</div>
					)}

					<div className="mt-6 mb-6 border-b-2 border-slate-300" />

					{/* Carrier and driver chat */}
					{!["Delivered", "Rejected", "Cancelled", "Deleted"].includes(workflowStatus) ? (
						<div>
							<h2 className="prose prose-2xl">Upload Files</h2>
							<p>Add any documents relating to shipping manifest, Bol #, Customs document etc.</p>
							<p>*Max of 10 files allowed (JPG, JPEG, PDF, PNG supported)</p>
							<div className="my-2">
								<div className="mt-1 flex">
									<FileUploader
										uploadedFiles={uploadedFiles}
										handleUploadedFiles={handleUploadedFiles}
										userToken={userToken}
										handleUploadedFileRemove={handleUploadedFileRemove}
									/>
								</div>
							</div>
						</div>
					) : (
						<div>
							<div className="flex flex-col gap-4">
								<h2 className="text-xl">Your uploaded files: </h2>
								{workflowUploadedFiles?.map((file, key) => {
									return (
										<Link href={file.url} key={key} target="_blank">
											<div className="flex flex-row border-b-2 p-4 border-slate-300 gap-4">
												{file.type === "application/pdf" ? (
													<PDFIcon height={48} width={48} />
												) : (
													<TextIcon height={48} width={48} />
												)}
												<div className="flex justify-center items-center">
													<h2>{file.name}</h2>
												</div>
											</div>
										</Link>
									);
								})}
							</div>
						</div>
					)}
				</main>
				<Modal
					open={modalOpen}
					title={titleText}
					body={
						<div>
							<p className="mb-4">{bodyText}</p>
							{ModalTextArea}
						</div>
					}
					cancelText={"Cancel"}
					handleCancel={handleCancelModal}
					continueText={"Continue"}
					handleContinue={handleConfirmModal}
				/>
			</CarrierLayout>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req, params } = context;
	const workflowId = params?.id;

	const { cookies } = req;
	const userToken = cookies.user;

	let drivers: UserDriver[] = [];
	let workflowData: CarrierWorkflowType | null;
	let workflowStatusData = [];

	// get workflow status data for statuses
	// display on stepper

	if (!userToken) {
		return {
			redirect: {
				destination: "/",
				statusCode: 302
			}
		};
	}

	if (!workflowId || Array.isArray(workflowId)) {
		return {
			redirect: {
				destination: "/carrier/workflows",
				statusCode: 302
			}
		};
	}

	try {
		const getDriversResponse = await getDriversByCompany({
			userToken,
			statusList: ["Activated"]
		});
		drivers = getDriversResponse.data;

		const getWorkflowByWorkflowIdResponse = await getWorkflowByWorkflowId(userToken, workflowId);
		workflowData = getWorkflowByWorkflowIdResponse.workflow;

		const getWorkflowStatusData = await getWorkflowStatusByStatuses({ userToken, workflowId });
		workflowStatusData = getWorkflowStatusData.workflowStatus;
	} catch (err) {
		workflowData = null;
	}

	if (!workflowData) {
		return {
			redirect: {
				destination: "/carrier/workflows",
				statusCode: 302
			}
		};
	}

	return {
		props: {
			drivers,
			workflow: workflowData,
			workflowStatusData,
			userToken
		}
	};
};
