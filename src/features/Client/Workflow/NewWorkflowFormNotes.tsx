import { useForm, SubmitHandler } from "react-hook-form";
import IconRight from "public/svg/arrow-right.svg";
import IconLeft from "public/svg/arrow-left.svg";

// TODO There will be a new workflow form for mobile
// and a new workflow form for desktop

type FormInputs = {
	notes: string;
};

interface NewWorkflowFormNotesProps {
	handleSubmitWorkflow: () => void;
	handleGoBack: () => void;
}

export default function NewWorkflowFormNotes({
	handleGoBack,
	handleSubmitWorkflow
}: NewWorkflowFormNotesProps) {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormInputs>();

	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		handleSubmitWorkflow();

		// TODO
		// make a request to the backend, register the user
	};

	return (
		<div className="w-full bg-slate-100 rounded-b-md p-4">
			<form id="newWorkflowFormNotes" onSubmit={handleSubmit(onSubmit)} className="w-full">
				<h2 className="prose prose-2xl">Extra Notes</h2>
				<div className="mb-2">
					<div>
						<div className="mt-1 flex rounded-md shadow-sm">
							<textarea
								placeholder="Knurled Bolt, GR 19.9 Plain..."
								className={`input w-full h-80 pt-2 ${
									errors.notes ? "border-error" : "border-neutral"
								}`}
								{...register("notes", { required: false })}
							/>
						</div>
					</div>
				</div>
			</form>
			<div className="flex flex-row justify-between">
				<div className="justify-start">
					<button className="btn btn-circle bg-primary mt-10" onClick={handleGoBack}>
						<IconLeft />
					</button>
				</div>
				<div className="justify-end">
					<button
						className="btn btn-circle bg-primary mt-10"
						form="newWorkflowFormNotes"
						type="submit"
					>
						<IconRight />
					</button>
				</div>
			</div>
		</div>
	);
}
