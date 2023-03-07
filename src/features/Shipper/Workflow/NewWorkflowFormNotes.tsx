import { useForm, SubmitHandler } from "react-hook-form";

import FileUploader from "@/components/FileUploader";

import IconRight from "public/svg/arrow-right.svg";
import IconLeft from "public/svg/arrow-left.svg";

// TODO There will be a new workflow form for mobile
// and a new workflow form for desktop

export type WorkflowFormNotesInputs = {
	notes: string;
};

interface NewWorkflowFormNotesProps {
	handleSubmitWorkflow: (data: WorkflowFormNotesInputs) => void;
	handleGoBack: () => void;
	workflowFormNotesState: WorkflowFormNotesInputs;
	uploadedFiles: any[];
	handleUploadedFiles: (data: any[]) => void;
}

export default function NewWorkflowFormNotes({
	handleGoBack,
	handleSubmitWorkflow,
	workflowFormNotesState,
	uploadedFiles,
	handleUploadedFiles
}: NewWorkflowFormNotesProps) {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<WorkflowFormNotesInputs>({
		defaultValues: {
			notes: workflowFormNotesState.notes
		}
	});

	const onSubmit: SubmitHandler<WorkflowFormNotesInputs> = (data) => {
		handleSubmitWorkflow(data);

		// TODO
		// make a request to the backend, register the user
	};

	return (
		<div className="w-full bg-slate-100 rounded-b-md p-4">
			<form id="newWorkflowFormNotes" onSubmit={handleSubmit(onSubmit)} className="w-full">
				<div>
					<h2 className="prose prose-2xl">Upload Files</h2>
					<p>Add any documents relating to shipping manifest, Bol #, T1 document etc.</p>
					<p>*Max of 10 files allowed (JPG, JPEG, PDF, PNG supported)</p>
					<div className="my-2">
						<div className="mt-1 flex">
							<FileUploader
								uploadedFiles={uploadedFiles}
								handleUploadedFiles={handleUploadedFiles}
							/>
						</div>
					</div>
				</div>

				<div className="divider" />

				<div>
					<h2 className="prose prose-2xl">Extra Notes</h2>
					<div className="mb-2">
						<div>
							<div className="mt-1 flex rounded-md shadow-sm">
								<textarea
									placeholder="Add any other notes here that may help with your delivery"
									className={`input w-full h-80 pt-2 whitespace-pre-wrap ${
										errors.notes ? "border-error" : "border-neutral"
									}`}
									{...register("notes", { required: false })}
								/>
							</div>
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
