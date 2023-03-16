import cn from "classnames";

interface ModalProps {
	open: boolean;
	title: string;
	body: JSX.Element;
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
					<h3 className="font-bold text-lg mb-2 text-center">{title}</h3>
					{body}
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
