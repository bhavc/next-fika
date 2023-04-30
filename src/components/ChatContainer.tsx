import { formatDateStringToDateCalendar } from "@/utils/time";

import type { WorkflowType, WorkflowNotesType } from "@/features/Shipper/ShipperWorkflows/types";

import IconRight from "public/svg/arrow-right.svg";

type MessageType = {
	something: string;
};

interface ChatContainerProps {
	userIdChatEnd: number;
	userIdChatStart: number;
	messageArray?: WorkflowNotesType[];
}

export default function ChatContainer({
	userIdChatEnd,
	userIdChatStart,
	messageArray
}: ChatContainerProps) {
	console.log("messageArray", messageArray);
	return (
		<div className="">
			<div className="border-2 border-slate-300 p-4 h-96 w-full overflow-y-auto">
				{messageArray &&
					messageArray.map((messageObject, index) => {
						const isCurrentUserMessage = messageObject.user_from === userIdChatEnd;

						return isCurrentUserMessage ? (
							<div className="chat chat-start">
								<div className="chat-bubble">
									{messageObject.message}
									{messageObject.message}
									<div className="text-sm italic text-right">
										{formatDateStringToDateCalendar(messageObject.created_at)}
									</div>
								</div>
							</div>
						) : (
							<div className="chat chat-end">
								<div className="chat-bubble chat-bubble-info">
									{messageObject.message}
									<div className="text-sm italic text-right">
										{formatDateStringToDateCalendar(messageObject.created_at)}
									</div>
								</div>
							</div>
						);
					})}
			</div>

			<div>
				<div className="form-control">
					<div className="input-group mt-4">
						<input type="text" placeholder="Search…" className="input input-bordered w-full" />
						<button className="btn btn-square">
							<IconRight />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
