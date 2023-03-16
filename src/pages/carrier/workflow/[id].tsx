import { useState, MouseEvent, use } from "react";
import Link from "next/link";
import { ChangeEvent } from "react";

import { getWorkflowByWorkflowId, editWorkflowByWorkflowId } from "@/api/workflow";

import { getCarrierWorkflowModalStatusChangeCopy } from "@/features/Carrier/CarrierWorkflows/helpers";

import CarrierLayout from "@/layouts/CarrierLayout";
import CarrierWorkflow from "@/features/Carrier/CarrierWorkflows/CarrierWorkflow";
import WorkflowStatusDropdown from "@/features/Carrier/CarrierWorkflows/WorkflowStatusDropdown";
import Modal from "@/components/Modal";

import type {
	CarrierWorkflowStatus,
	CarrierWorkflowType
} from "@/features/Carrier/CarrierWorkflows/types";
import type { GetServerSideProps } from "next";

import IconLeft from "public/svg/arrow-left.svg";
import { toast } from "react-hot-toast";

export default function WorkflowId({
	workflow,
	userToken
}: {
	workflow: CarrierWorkflowType;
	userToken: string;
}) {
	const workflowStatus = workflow.status;
	const workflowId = workflow.id;

	const [previousStatus, setPreviousStatus] = useState(workflowStatus);
	const [newStatus, setNewStatus] = useState(workflowStatus);
	const [modalOpen, setModalOpen] = useState(false);
	const [workflowStatusChangeNotes, setWorkflowStatusChangeNotes] = useState("");

	const { titleText, bodyText } = getCarrierWorkflowModalStatusChangeCopy(newStatus);

	const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setNewStatus(event.target.value as CarrierWorkflowStatus);
		setWorkflowStatusChangeNotes("");
	};

	const handleSaveChanges = async (event: MouseEvent<HTMLElement>) => {
		event.preventDefault();
		setModalOpen(true);
	};

	const handleConfirmModal = async () => {
		try {
			const updateData = {
				status: newStatus,
				carrierNotes: workflowStatusChangeNotes
			};
			const response = await editWorkflowByWorkflowId({ userToken, workflowId, body: updateData });
			setPreviousStatus(newStatus);
			toast.success(response.message);
		} catch (err) {
			toast.error("Error updateing workflow");
		} finally {
			setModalOpen(false);
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
							<button
								className="btn btn-primary"
								disabled={newStatus === previousStatus}
								onClick={handleSaveChanges}
							>
								Save All
							</button>
						</div>
					</div>

					<div className="flex justify-end align-middle bg-slate-100 px-4">
						<WorkflowStatusDropdown
							handleStatusChange={handleStatusChange}
							newStatus={newStatus}
							previousStatus={previousStatus}
						/>
					</div>

					<CarrierWorkflow workflow={workflow} />
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
