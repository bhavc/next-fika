import Modal from "@/components/Modal";
import { DriverWorkflowStatus } from "./types";

export default function DriverWorkflowStatusChangeModal({
	modalOpen,
	workflowStatus,
	handleCancelModal,
	handleConfirmModal,
	ModalUploadArea,
	ModalTextArea
}: {
	modalOpen: boolean;
	workflowStatus: DriverWorkflowStatus;
	handleCancelModal: () => void;
	handleConfirmModal: () => void;
	ModalUploadArea: JSX.Element;
	ModalTextArea: JSX.Element;
}) {
	let showTextArea = false;
	let showUploadArea = false;
	let titleText;
	let bodyText;

	if (workflowStatus === "In Progress") {
		titleText = "Start Delivery?";
		bodyText = "By starting the delivery, you've agreed to the terms set by the company";
		showTextArea = true;
	} else if (workflowStatus === "Delivered") {
		titleText = "Finished Delivery?";
		bodyText =
			"By finishing the delivery, you're agreeing that the delivery has reached the end location in the best possible condition";
		showTextArea = true;
		showUploadArea = true;
	} else if (workflowStatus === "Rejected") {
		titleText = "Reject Delivery?";
		bodyText = "By rejecting the delivery, you do not want to be allocated the delivery";
		showTextArea = true;
	} else {
		titleText = "Cancel Delivery?";
		bodyText =
			"By cancelling the delivery, you do not plan on going through with the trip. Caution, this could be problematic and will need to be resolved with your company internally";
		showTextArea = true;
	}

	return (
		<Modal
			open={modalOpen}
			title={titleText}
			body={
				<div>
					<p className="mb-4">{bodyText}</p>
					{showTextArea && ModalTextArea}
					{showUploadArea && ModalUploadArea}
				</div>
			}
			cancelText={"Cancel"}
			handleCancel={handleCancelModal}
			continueText={"Continue"}
			handleContinue={handleConfirmModal}
		/>
	);
}
