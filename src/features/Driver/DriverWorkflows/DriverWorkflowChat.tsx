import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import { getWorkflowNotesByWorkflowId, postWorkflowNotesByWorkflowId } from "@/api/workflowNotes";

import ChatContainer from "@/components/ChatContainer";

import type { UserDriver } from "../UserDriver/types";
import type { WorkflowNotesType } from "@/features/Shipper/ShipperWorkflows/types";

export default function DriverWorkflowChat({
	userToken,
	userData,
	workflowId,
	workflowCarrierId
}: {
	userToken: string;
	userData: UserDriver;
	workflowId: string;
	workflowCarrierId: number | null;
}) {
	const [driverWorkflowNotes, setDriverWorkflowNotes] = useState<WorkflowNotesType[]>([]);
	const [isMessageSentLoading, setIsMessageSentLoading] = useState(false);

	const handleMessageSendShipper = async (message: string) => {
		try {
			setIsMessageSentLoading(true);
			const response = await postWorkflowNotesByWorkflowId({
				userToken,
				workflowId,
				userTo: workflowCarrierId,
				message
			});

			const responseMessage = response.message;
			const responseWorkflowNotes = response.workflowNotes;

			toast.success(responseMessage);
			setIsMessageSentLoading(false);
			setDriverWorkflowNotes(responseWorkflowNotes);
		} catch (err) {
			toast.error("Error sending message workflow");
		}
	};

	useEffect(() => {
		if (workflowCarrierId) {
			getWorkflowNotesByWorkflowId({
				userToken,
				workflowId,
				userTo: workflowCarrierId.toString()
			})
				.then((data: { message: string; workflowNotes: WorkflowNotesType[] }) => {
					setDriverWorkflowNotes(data.workflowNotes);
				})
				.catch((err: any) => {
					setDriverWorkflowNotes([]);
				});
		}
	}, [userToken, workflowId, workflowCarrierId]);

	return (
		<div className="card-body">
			<div className="bg-slate-100 p-4 ">
				<h2 className="text-xl">Shipper Chat</h2>
				<p className="text-md pl-4 mb-4">This is your chat history with the Shipper</p>
				<ChatContainer
					currentUserId={userData.id}
					messageArray={driverWorkflowNotes}
					handleMessageSend={handleMessageSendShipper}
					isMessageSentLoading={isMessageSentLoading}
				/>
			</div>
		</div>
	);
}
