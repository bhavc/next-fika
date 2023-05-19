import { useState, MouseEvent, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCurrentUser } from "@/api/user";
import { editWorkflowByWorkflowId, getWorkflowByWorkflowId } from "@/api/workflow";

import DriverLayout from "@/layouts/DriverLayout";
import DriverWorflowGeneral from "@/features/Driver/DriverWorkflows/DriverWorkflowGeneral";
import DriverWorflowFiles from "@/features/Driver/DriverWorkflows/DriverWorkflowFiles";
import DriverWorflowButton from "@/features/Driver/DriverWorkflows/DriverWorkflowButton";
import DriverWorkflowStatusChangeModal from "@/features/Driver/DriverWorkflows/DriverWorkflowStatusChangeModal";
import FileUploader from "@/components/FileUploader";

import type { GetServerSideProps } from "next";
import type { UserDriver } from "@/features/Driver/UserDriver/types";
import type {
	DriverWorkflowType,
	DriverWorkflowStatus
} from "@/features/Driver/DriverWorkflows/types";
import type { FileType } from "@/features/Driver/DriverWorkflows/types";
import { toast } from "react-hot-toast";
import DriverWorflowDetails from "@/features/Driver/DriverWorkflows/DriverWorkflowDetails";

export default function DriverWorkflowId({
	workflow,
	userToken,
	workflowId
}: {
	workflow: DriverWorkflowType;
	userToken: string;
	workflowId: string;
}) {
	const router = useRouter();
	const currentTab = router.query.tab;

	const workflowStatus = workflow.status;
	const workflowAddressData = workflow.workflowAddressData;
	const workflowContainerData = workflow.workflowContainerData;
	const workflowFiles = workflow.uploadedFiles;
	console.log("workflowFiles", workflowFiles);

	const [modalOpen, setModalOpen] = useState(false);
	const [updatedWorkflowStatus, setUpdatedWorkflowStatus] = useState(workflowStatus);
	const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);
	const [workflowStatusChangeNotes, setWorkflowStatusChangeNotes] = useState("");

	const handleBack = () => {
		return router.push("/driver");
	};

	const handleStatusChange = (newStatus: DriverWorkflowStatus) => {
		setModalOpen(true);
		setUpdatedWorkflowStatus(newStatus);
	};

	const handleCancelModal = () => {
		setModalOpen(false);
	};

	const handleUploadedFiles = (data: any[]) => {
		setUploadedFiles(data);
	};

	const handleUploadedFileRemove = (event: MouseEvent<HTMLElement>, key: number) => {
		event.preventDefault();
		const uploadedFilesCopy = [...uploadedFiles];
		uploadedFilesCopy.splice(key, 1);
		setUploadedFiles(uploadedFilesCopy);
	};

	const handleWorkflowStatusChangeNotes = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setWorkflowStatusChangeNotes(event.target.value);
	};

	const handleConfirmModal = async () => {
		const updateData = {
			workflow: {
				status: updatedWorkflowStatus,
				uploadedFiles,
				driverNotes: workflowStatusChangeNotes
			}
		};

		try {
			await editWorkflowByWorkflowId({ userToken, workflowId, body: updateData });

			toast.success("Error editing delivery");
			router.replace(router.asPath);
		} catch (err) {
			toast.error("Error editing delivery");
		} finally {
			setModalOpen(false);
			setUploadedFiles([]);
			setWorkflowStatusChangeNotes("");
		}
	};

	const leftSideItems = [
		<button key={"Back"} className="btn btn-ghost" onClick={handleBack}>
			Back
		</button>
	];

	const ModalUploadArea = (
		<div>
			<h2 className="prose prose-2xl">Upload Files</h2>
			<p>Add any documents relating to shipping manifest, Bol #, Customs document etc.</p>
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
	);

	const ModalTextArea = (
		<textarea
			placeholder="Add any other notes here that you may want the shipper to know"
			className={`input w-full h-40 pt-2 whitespace-pre-wrap border-solid border-slate-300`}
			onChange={handleWorkflowStatusChangeNotes}
			value={workflowStatusChangeNotes}
		/>
	);

	const driverWorkflowLinks = [
		{
			name: "General",
			href: `/driver/workflow/${workflowId}`,
			active: currentTab === undefined
		},
		{
			name: "Details",
			href: `/driver/workflow/${workflowId}/?tab=details`,
			active: currentTab === "details"
		},
		{
			name: "Files",
			href: `/driver/workflow/${workflowId}/?tab=files`,
			active: currentTab === "files"
		},
		{
			name: "Chat",
			href: `/driver/workflow/${workflowId}/?tab=chat`,
			active: currentTab === "chat"
		}
	];

	return (
		<DriverLayout leftSideItems={leftSideItems}>
			<div className="flex flex-col justify-center items-center h-auto">
				<div className="tabs justify-center bg-base-100 w-full rounded-t-2xl pt-2">
					{driverWorkflowLinks.map((driverWorkflowLink, index) => {
						return driverWorkflowLink.active ? (
							<Link className="tab tab-lg tab-bordered" key={index} href={driverWorkflowLink.href}>
								<p className="font-bold">{driverWorkflowLink.name}</p>
							</Link>
						) : (
							<Link className="tab tab-lg" key={index} href={driverWorkflowLink.href}>
								<p>{driverWorkflowLink.name}</p>
							</Link>
						);
					})}
				</div>
				<div className="card bg-base-100 shadow-xl rounded-t-none w-full">
					{currentTab === undefined && (
						<DriverWorflowGeneral workflowAddressData={workflowAddressData} />
					)}
					{currentTab === "details" && (
						<DriverWorflowDetails workflowContainerData={workflowContainerData} />
					)}
					{currentTab === "files" && <DriverWorflowFiles workflowFiles={workflowFiles} />}
				</div>
				<DriverWorflowButton
					workflowStatus={workflowStatus}
					handleStatusChange={handleStatusChange}
				/>
			</div>
			<DriverWorkflowStatusChangeModal
				modalOpen={modalOpen}
				workflowStatus={updatedWorkflowStatus}
				handleCancelModal={handleCancelModal}
				handleConfirmModal={handleConfirmModal}
				ModalUploadArea={ModalUploadArea}
				ModalTextArea={ModalTextArea}
			/>
		</DriverLayout>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req, params } = context;
	const workflowId = params?.id;

	const { cookies } = req;
	const userToken = cookies.user;

	let userData: UserDriver = {
		id: -99,
		username: "",
		email: "",
		firstName: "",
		lastName: "",
		companyName: "",
		address: "",
		phoneNumber: "",
		emergencyNumbers: [],
		avatarImageData: {},
		bucketStorageUrls: [],
		driverFileData: [],
		role: "",
		status: "",
		gender: ""
	};

	let workflowData: DriverWorkflowType | null;

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
				destination: "/driver",
				statusCode: 302
			}
		};
	}

	try {
		const getCurrentUserResponse = await getCurrentUser(userToken);
		userData = getCurrentUserResponse.data;

		const getWorkflowByIdResponse = await getWorkflowByWorkflowId(userToken, workflowId);
		workflowData = getWorkflowByIdResponse.workflow;
	} catch (err) {
		workflowData = null;
	}

	if (!workflowData) {
		return {
			redirect: {
				destination: "/driver",
				statusCode: 302
			}
		};
	}

	return {
		props: {
			userData,
			workflow: workflowData,
			userToken,
			workflowId
		}
	};
};
