import ShipperLayout from "@/layouts/ShipperLayout";
import Link from "next/link";
import { MouseEvent } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getCurrentUser } from "@/api/user";
import { getWorkflowByWorkflowId, editWorkflowByWorkflowId } from "@/api/workflow";
import { getWorkflowNotesByWorkflowId, postWorkflowNotesByWorkflowId } from "@/api/workflowNotes";

import ChatContainer from "@/components/ChatContainer";
import ShipperWorkflow from "@/features/Shipper/ShipperWorkflows/ShipperWorkflow";
import FileUploader from "@/components/FileUploader";

import type { WorkflowType, WorkflowNotesType } from "@/features/Shipper/ShipperWorkflows/types";
import type { GetServerSideProps } from "next";
import type { FileType } from "@/features/Shipper/ShipperWorkflows/types";

import { toast } from "react-hot-toast";

import IconLeft from "public/svg/arrow-left.svg";
import PDFIcon from "public/svg/PDF_file_icon.svg";
import TextIcon from "public/svg/file-text.svg";

export default function WorkflowId({
	workflow,
	userToken
}: {
	userToken: string;
	workflow: WorkflowType;
}) {
	const router = useRouter();

	const workflowId = workflow.id;
	const workflowStatus = workflow.status;
	const workflowUserFor = workflow.user_for;
	const workflowUserCarrierId = workflow.selectedCarrier.id;
	const workflowPriceData = workflow?.workflowPriceData;

	const selectedCarrier = workflow.selectedCarrier;
	const selectedCarrierId = selectedCarrier.id;

	const workflowUploadedFiles = workflow?.fileUrls;

	const userIdChatEnd = parseInt(workflowUserFor, 10);

	const [workflowNotes, setWorkflowNotes] = useState<WorkflowNotesType[] | null>([]);
	const [isMessageSentLoading, setIsMessageSentLoading] = useState(false);
	const [uploadedFiles, setUploadedFiles] = useState<FileType[]>(
		workflowUploadedFiles ? workflowUploadedFiles : []
	);

	// TODO we should allow for files to be updated at any and all times with timestamp

	const handleAcceptPrice = async () => {
		try {
			const updateData: { [key: string]: any } = {
				workflow: {
					status: "Triage"
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

	// TODO: work on sendMessage functionality
	const handleMessageSend = async (message: string) => {
		try {
			setIsMessageSentLoading(true);
			const response = await postWorkflowNotesByWorkflowId({
				userToken,
				workflowId,
				userTo: selectedCarrierId,
				message
			});

			const responseMessage = response.message;
			const responseWorkflowNotes = response.workflowNotes;

			toast.success(responseMessage);
			setIsMessageSentLoading(false);
			setWorkflowNotes(responseWorkflowNotes);
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
		const workflowUserCarrierIdAsString = workflowUserCarrierId?.toString();

		getWorkflowNotesByWorkflowId({
			userToken,
			workflowId,
			userTo: workflowUserCarrierIdAsString
		})
			.then((data: { message: string; workflowNotes: WorkflowNotesType[] }) => {
				setWorkflowNotes(data.workflowNotes);
			})
			.catch((err: any) => {
				setWorkflowNotes(null);
			});
	}, [userToken, workflowId, workflowUserCarrierId]);

	return (
		<>
			<ShipperLayout>
				<main className="items-center justify-center px-4 bg-slate-100">
					<div className="flex flex-col w-full bg-slate-100 rounded-b-md p-4 mt-4">
						<Link href={"/shipper/workflows"} className="btn btn-circle bg-primary">
							<IconLeft />
						</Link>
						<h1 className="text-3xl mt-4 text-left">Delivery</h1>
						<h2 className="text-3xl mt-4 text-left">{workflow.status}</h2>
					</div>

					<ShipperWorkflow
						workflow={workflow}
						handleAcceptPrice={handleAcceptPrice}
						handleDeclinePrice={handleDeclinePrice}
					/>
					{/* Shipper and carrier chat */}
					{selectedCarrierId && workflowNotes && (
						<div className="bg-slate-100 p-4 ">
							<h2 className="text-xl">Notes</h2>
							<p className="text-md pl-4 mb-4">This is your chat history with the Carrier</p>
							<ChatContainer
								userIdChatEnd={userIdChatEnd}
								userIdChatStart={selectedCarrierId}
								messageArray={workflowNotes}
								handleMessageSend={handleMessageSend}
								isMessageSentLoading={isMessageSentLoading}
							/>
						</div>
					)}
					<div className="mt-6 mb-6 border-b-2 border-slate-300" />

					{/* depending on status, you show what */}
					{!["Delivered", "Rejected", "Cancelled", "Deleted"].includes(workflowStatus) ? (
						<div>
							<h2 className="prose prose-2xl">Upload Files</h2>
							<p>Add any documents relating to shipping manifest, Bol #, T1 document etc.</p>
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
		const getWorkflowResponse = await getWorkflowByWorkflowId(userToken, workflowId);
		workflowData = getWorkflowResponse.workflow;
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
