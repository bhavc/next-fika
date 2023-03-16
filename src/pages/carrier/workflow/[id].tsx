import { useState, MouseEvent } from "react";
import Link from "next/link";
import { ChangeEvent } from "react";

import { getWorkflowByWorkflowId, editWorkflowByWorkflowId } from "@/api/workflow";

import CarrierLayout from "@/layouts/CarrierLayout";
import CarrierWorkflow from "@/features/Carrier/CarrierWorkflows/CarrierWorkflow";
import WorkflowStatusDropdown from "@/features/Carrier/CarrierWorkflows/WorkflowStatusDropdown";

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

	const [status, setStatus] = useState(workflowStatus);

	const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setStatus(event.target.value as CarrierWorkflowStatus);
	};

	// TODO add a modal that confirms whether a user is sure
	const handleSaveChanges = async (event: MouseEvent<HTMLElement>) => {
		event.preventDefault();

		try {
			const updateData = {
				status
			};

			const response = await editWorkflowByWorkflowId({ userToken, workflowId, body: updateData });
			toast.success(response.message);
		} catch (err) {
			toast.error("Error updateing workflow");
		}
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
								disabled={status === workflowStatus}
								onClick={handleSaveChanges}
							>
								Save All
							</button>
						</div>
					</div>

					<div className="flex justify-end align-middle bg-slate-100 px-4">
						<WorkflowStatusDropdown handleStatusChange={handleStatusChange} status={status} />
					</div>

					<CarrierWorkflow workflow={workflow} />
				</main>
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
