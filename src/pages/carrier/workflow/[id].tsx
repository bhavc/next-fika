import { useState, MouseEvent, use } from "react";
import Link from "next/link";
import { ChangeEvent } from "react";

import { getWorkflowByWorkflowId, editWorkflowByWorkflowId } from "@/api/workflow";

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

	const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setNewStatus(event.target.value as CarrierWorkflowStatus);
	};

	const handleSaveChanges = async (event: MouseEvent<HTMLElement>) => {
		event.preventDefault();
		setModalOpen(true);
	};

	const handleConfirmModal = async () => {
		try {
			const updateData = {
				status: newStatus
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
						<WorkflowStatusDropdown handleStatusChange={handleStatusChange} status={newStatus} />
					</div>

					<CarrierWorkflow workflow={workflow} />
				</main>
				<Modal
					open={modalOpen}
					title={"Are you sure you want Continue"}
					body={
						"Ensure you've checked all of the delivery details carefully especially price and locations"
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
