import { useState } from "react";

import { formatDateStringToDateCalendar } from "@/utils/time";

import type { WorkflowType, WorkflowNotesType } from "@/features/Shipper/ShipperWorkflows/types";

import IconRight from "public/svg/arrow-right.svg";
import { KeyboardEvent, MouseEvent, ChangeEvent } from "react";

interface ChatContainerProps {
	currentUserId: number;
	messageArray?: WorkflowNotesType[];
	handleMessageSend: (message: string) => void;
	isMessageSentLoading: boolean;
}

export default function ChatContainer({
	currentUserId,
	messageArray,
	handleMessageSend,
	isMessageSentLoading
}: ChatContainerProps) {
	const [message, setMessage] = useState("");

	const handleOnMessageClick = (event: MouseEvent<HTMLElement>) => {
		event.preventDefault();
		if (message.length > 0) {
			handleMessageSend(message);
			setMessage("");
		}
	};

	const handleOnMessageEnter = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
			if (message.length > 0) {
				handleMessageSend(message);
				setMessage("");
			}
		}
	};

	const handleOnMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const typedMessage = event.target.value;
		setMessage(typedMessage);
	};

	return (
		<div className="">
			<div className="border-2 border-slate-300 p-4 h-96 w-full overflow-y-auto">
				{messageArray &&
					messageArray.map((messageObject, index) => {
						const isCurrentUserMessage = messageObject.user_from === currentUserId;

						return isCurrentUserMessage ? (
							<div className="chat chat-end" key={index}>
								<div className="chat-bubble chat-bubble-info">
									{messageObject.message}
									<div className="text-sm italic text-right">
										{formatDateStringToDateCalendar(messageObject.created_at)}
									</div>
								</div>
							</div>
						) : (
							<div className="chat chat-start" key={index}>
								<div className="chat-bubble">
									{messageObject.message}
									<div className="text-sm italic text-right">
										{formatDateStringToDateCalendar(messageObject.created_at)}
									</div>
								</div>
							</div>
						);
					})}
			</div>

			{/* TODO add disabled state */}
			<div>
				<div className="form-control">
					<div className="input-group mt-4">
						<input
							type="text"
							placeholder="Search…"
							className="input input-bordered w-full"
							onKeyDown={handleOnMessageEnter}
							onChange={handleOnMessageChange}
							value={message}
						/>
						<button
							className="btn btn-square"
							onClick={handleOnMessageClick}
							disabled={isMessageSentLoading}
						>
							<IconRight />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
