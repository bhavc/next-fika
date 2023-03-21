import ShipperLayout from "@/layouts/ShipperLayout";
import Link from "next/link";
import { useRouter } from "next/router";

import { getWorkflowByWorkflowId, editWorkflowByWorkflowId } from "@/api/workflow";

import ShipperWorkflow from "@/features/Shipper/ShipperWorkflows/ShipperWorkflow";

import type { WorkflowType } from "@/features/Shipper/ShipperWorkflows/types";
import type { GetServerSideProps } from "next";

import { toast } from "react-hot-toast";

import IconLeft from "public/svg/arrow-left.svg";

export default function WorkflowId({
	workflow,
	userToken
}: {
	userToken: string;
	workflow: WorkflowType;
}) {
	const router = useRouter();

	const workflowId = workflow.id;
	const workflowPriceData = workflow?.workflowPriceData;

	const handleAcceptPrice = async () => {
		try {
			const updateData: { [key: string]: any } = {
				workflow: {
					status: "Allocated"
				},
				payment: {
					acceptedPrice: workflowPriceData.price
				}
			};

			const response = await editWorkflowByWorkflowId({ userToken, workflowId, body: updateData });
			toast.success(response.message);
			router.push("/shipper/workflows");
		} catch (err) {
			toast.error("Error updating workflow");
		}
	};

	const handleDeclinePrice = async () => {
		try {
			const updateData: { [key: string]: any } = {
				workflow: {
					status: "Cancelled"
				},
				payment: {
					declineShipment: true
				}
			};

			const response = await editWorkflowByWorkflowId({ userToken, workflowId, body: updateData });
			toast.success(response.message);
			router.push("/shipper/workflows");
		} catch (err) {
			toast.error("Error updating workflow");
		}
	};

	return (
		<>
			<ShipperLayout>
				<main className="items-center justify-center px-4">
					<div className="flex flex-col w-full bg-slate-100 rounded-b-md p-4 mt-4">
						<Link href={"/shipper/workflows"} className="btn btn-circle bg-primary">
							<IconLeft />
						</Link>
						<h1 className="text-3xl mt-4 text-left">Delivery</h1>
					</div>

					<ShipperWorkflow
						workflow={workflow}
						handleAcceptPrice={handleAcceptPrice}
						handleDeclinePrice={handleDeclinePrice}
					/>
				</main>
			</ShipperLayout>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req, params } = context;
	const workflowId = params?.id;

	const { cookies } = req;
	const userToken = cookies.user;
	let workflowData: WorkflowType | null;

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
				destination: "/shipper/workflows",
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
				destination: "/shipper/workflows",
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
