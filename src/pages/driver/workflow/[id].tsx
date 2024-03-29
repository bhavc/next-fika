import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

import { getCurrentUser } from "@/api/user";
import { editWorkflowByWorkflowId, getWorkflowByWorkflowId } from "@/api/workflow";
import { shouldRedirectUserDueToIncorrectRole } from "@/features/helpers";

import DriverLayout from "@/layouts/DriverLayout";
import DriverWorflowDetails from "@/features/Driver/DriverWorkflows/DriverWorkflowDetails";
import DriverWorflowGeneral from "@/features/Driver/DriverWorkflows/DriverWorkflowGeneral";
import DriverWorflowFiles from "@/features/Driver/DriverWorkflows/DriverWorkflowFiles";
import DriverWorkflowChat from "@/features/Driver/DriverWorkflows/DriverWorkflowChat";
import DriverWorflowButton from "@/features/Driver/DriverWorkflows/DriverWorkflowButton";

import type { GetServerSideProps } from "next";
import type { UserDriver } from "@/features/Driver/UserDriver/types";
import type {
	DriverWorkflowType,
	DriverWorkflowStatus
} from "@/features/Driver/DriverWorkflows/types";
import type { FileType } from "@/features/Driver/DriverWorkflows/types";

export default function DriverWorkflowId({
	userToken,
	userData,
	workflow,
	workflowId
}: {
	userToken: string;
	userData: UserDriver;
	workflow: DriverWorkflowType;
	workflowId: string;
}) {
	const router = useRouter();
	const currentTab = router.query.tab;

	const workflowStatus = workflow.status;
	const workflowAddressData = workflow.workflowAddressData;
	const workflowContainerData = workflow.workflowContainerData;
	const workflowFiles = workflow.uploadedFiles;

	// TODO make a relation on the backend for the driver as to who this belongs to
	const workflowCarrierId = workflow.selectedCarrier.id;

	// const [updatedWorkflowStatus, setUpdatedWorkflowStatus] = useState(workflowStatus);
	const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);
	const [workflowStatusChangeNotes, setWorkflowStatusChangeNotes] = useState("");

	const handleBack = () => {
		return router.push("/driver");
	};

	const handleStatusChange = async (newStatus: DriverWorkflowStatus) => {
		const updateData = {
			workflow: {
				status: newStatus,
				uploadedFiles,
				driverNotes: workflowStatusChangeNotes
			}
		};

		try {
			await editWorkflowByWorkflowId({ userToken, workflowId, body: updateData });

			toast.success("Successfully editing delivery");
			router.replace(router.asPath);
		} catch (err) {
			toast.error("Error editing delivery");
		} finally {
			setUploadedFiles([]);
			setWorkflowStatusChangeNotes("");
		}
	};

	const leftSideItems = [
		<button key={"Back"} className="btn btn-primary" onClick={handleBack}>
			<p className="font text-slate-100">Back</p>
		</button>
	];

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
					{currentTab === "chat" && (
						<DriverWorkflowChat
							userData={userData}
							userToken={userToken}
							workflowId={workflowId}
							workflowCarrierId={workflowCarrierId}
						/>
					)}
				</div>
				<DriverWorflowButton
					workflowStatus={workflowStatus}
					handleStatusChange={handleStatusChange}
				/>
			</div>
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
		status: null,
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

	if (shouldRedirectUserDueToIncorrectRole("Driver", userData.role)) {
		return {
			redirect: {
				destination: "/",
				statusCode: 302
			}
		};
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
