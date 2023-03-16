import cn from "classnames";

interface ModalProps {
	open: boolean;
	title: string;
	body: string;
	cancelText: string;
	handleCancel: () => void;
	continueText: string;
	handleContinue: () => void;
}

export default function Modal({
	open,
	title,
	body,
	cancelText,
	handleCancel,
	continueText,
	handleContinue
}: ModalProps) {
	const modalClass = cn({
		modal: true,
		"modal-open": open
	});

	return (
		<>
			<div className={modalClass}>
				<div className="modal-box">
					<h3 className="font-bold text-lg">{title}</h3>
					<p className="py-4 text-center">{body}</p>
					<div className="modal-action justify-between">
						<button className="btn btn-error" onClick={handleCancel}>
							{cancelText}
						</button>
						<button className="btn btn-primary" onClick={handleContinue}>
							{continueText}
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
