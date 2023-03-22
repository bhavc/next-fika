import { useState, MouseEvent } from "react";
import Link from "next/link";
import { ChangeEvent } from "react";

import { getWorkflowByWorkflowId, editWorkflowByWorkflowId } from "@/api/workflow";

import { getCarrierWorkflowModalStatusChangeCopy } from "@/features/Carrier/CarrierWorkflows/helpers";

import CarrierLayout from "@/layouts/CarrierLayout";
import CarrierWorkflow from "@/features/Carrier/CarrierWorkflows/CarrierWorkflow";
import CarrierWorkflowPricing from "@/features/Carrier/CarrierWorkflows/CarrierWorkflowPricing";

import WorkflowStatusDropdown from "@/features/Carrier/CarrierWorkflows/WorkflowStatusDropdown";
import Modal from "@/components/Modal";

import type {
	CarrierWorkflowStatus,
	CarrierWorkflowType
} from "@/features/Carrier/CarrierWorkflows/types";
import type { GetServerSideProps } from "next";

import IconLeft from "public/svg/arrow-left.svg";
import { toast } from "react-hot-toast";

type BidSelectValueType = "accept" | "counter";

export default function WorkflowId({
	workflow,
	userToken
}: {
	workflow: CarrierWorkflowType;
	userToken: string;
}) {
	const workflowStatus = workflow.status;
	const workflowId = workflow.id;

	const price = workflow.workflowPriceData.price;

	const [previousStatus, setPreviousStatus] = useState(workflowStatus);
	const [newStatus, setNewStatus] = useState(workflowStatus);
	const [modalOpen, setModalOpen] = useState(false);
	const [workflowStatusChangeNotes, setWorkflowStatusChangeNotes] = useState("");
	const [bidSelectValue, setBidSelectValue] = useState<BidSelectValueType>("accept");
	const [carrierQuoteRequest, setCarrierQuoteRequest] = useState("");
	const [carrierCounterRequest, setCarrierCounterRequest] = useState(price?.toString() || "");
	const [quotePriceError, setQuotePriceError] = useState(false);

	const { titleText, bodyText } = getCarrierWorkflowModalStatusChangeCopy(newStatus);

	const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setNewStatus(event.target.value as CarrierWorkflowStatus);
		setWorkflowStatusChangeNotes("");
	};

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
		}

		setModalOpen(true);
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

	const handleConfirmModal = async () => {
		try {
			const updateData: { [key: string]: any } = {
				workflow: {
					status: newStatus,
					carrierNotes: workflowStatusChangeNotes
				},
				payment: {}
			};

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

	const ModalTextArea = (
		<textarea
			placeholder="Add any other notes here that you may want the shipper to know"
			className={`input w-full h-40 pt-2 whitespace-pre-wrap border-solid border-slate-300`}
			onChange={handleWorkflowStatusChangeNotes}
			value={workflowStatusChangeNotes}
		/>
	);

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
									disabled={newStatus === previousStatus}
									onClick={handleSaveChanges}
								>
									Save All
								</button>
							)}
						</div>
					</div>

					{/* TODO: does this make sense or just a button that accepts/declines */}
					<div className="flex justify-end align-middle bg-slate-100 px-4">
						<WorkflowStatusDropdown
							handleStatusChange={handleStatusChange}
							newStatus={newStatus}
							previousStatus={previousStatus}
							workflow={workflow}
							bidSelectValue={bidSelectValue}
						/>
					</div>

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

	let workflowData: CarrierWorkflowType | null;

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
		const response = await getWorkflowByWorkflowId(userToken, workflowId);
		workflowData = response.workflow;
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
			workflow: workflowData,
			userToken
		}
	};
};
