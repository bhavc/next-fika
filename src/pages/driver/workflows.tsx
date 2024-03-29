import Link from "next/link";

import DriverLayout from "@/layouts/DriverLayout";

import { getCurrentUser } from "@/api/user";
import { getWorkflowsForDriver } from "@/api/workflow";

import { formatDateStringToDate } from "@/utils/time";
import { shouldRedirectUserDueToIncorrectRole } from "@/features/helpers";

import WorkflowStatusBadge from "@/features/Driver/DriverWorkflows/WorkflowStatusBadge";

import type { GetServerSideProps } from "next";
import type { UserDriver } from "@/features/Driver/UserDriver/types";
import type { DriverWorkflowType } from "@/features/Driver/DriverWorkflows/types";

export default function DriverWorkflows({
	workflowsData
}: {
	workflowsData?: DriverWorkflowType[];
}) {
	return (
		<DriverLayout>
			<h1 className="text-3xl text-black">Deliveries</h1>
			<div className="flex flex-col items-center mt-4">
				{workflowsData && workflowsData.length > 0 ? (
					workflowsData?.map((workflow, index) => {
						const workflowAddressData = workflow.workflowAddressData;
						const pickupAddress = workflowAddressData.pickupAddress;
						const dropoffAddress = workflowAddressData.dropoffAddress;
						const workflowStatus = workflow.status;
						const createdDate = formatDateStringToDate(workflow.createdAt);

						return (
							<Link key={index} href={`/driver/workflow/${workflow.id}`} className="my-2">
								<div className="card w-80 bg-base-100 shadow-xl">
									<div className="card-body">
										<div className="flex justify-between items-center">
											<p className="text-sm">{createdDate}</p>
											<WorkflowStatusBadge workflowStatus={workflowStatus}>
												{workflowStatus}
											</WorkflowStatusBadge>
										</div>
										<p>Pickup: {pickupAddress}</p>
										<p>Dropoff: {dropoffAddress}</p>
									</div>
								</div>
							</Link>
						);
					})
				) : (
					<div className="card w-80 bg-base-100 shadow-xl">
						<div className="card-body">
							<div className="flex flex-col justify-between items-center">
								<h2 className="card-title">No deliveries have been assigned to you yet.</h2>

								<p className="text-sm">
									Check back later for work that&apos;s been assigned to you
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</DriverLayout>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req } = context;
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
		phoneNumber: null,
		emergencyNumbers: null,
		gender: null,
		avatarImageData: null,
		bucketStorageUrls: [],
		role: "",
		status: null,
		driverFileData: []
	};

	let workflowsData = [];

	if (!userToken) {
		return {
			redirect: {
				destination: "/",
				statusCode: 302
			}
		};
	}

	try {
		const getCurrentUserResponse = await getCurrentUser(userToken);
		userData = getCurrentUserResponse.data;

		const getDriverAssignedWorkflows = await getWorkflowsForDriver({ userToken });
		workflowsData = getDriverAssignedWorkflows.data;
	} catch (err) {
		console.info("err", err);
	}

	if (shouldRedirectUserDueToIncorrectRole("Driver", userData.role)) {
		return {
			redirect: {
				destination: "/",
				statusCode: 302
			}
		};
	}

	return {
		props: {
			userData,
			workflowsData
		}
	};
};
