import Link from "next/link";

import DriverLayout from "@/layouts/DriverLayout";

import { getCurrentUser } from "@/api/user";
import { getLatestWorkflowsForDriver } from "@/api/workflow";

import type { GetServerSideProps } from "next";
import type { UserDriver } from "@/features/Driver/UserDriver/types";

import AlertIcon from "public/svg/alert-circle.svg";
import { DriverWorkflowType } from "@/features/Driver/DriverWorkflows/types";

export default function Driver({
	userData,
	workflowData
}: {
	userData: UserDriver;
	workflowData: DriverWorkflowType;
}) {
	const { firstName } = userData;
	const workflowId = workflowData?.id;

	return (
		<DriverLayout>
			{workflowId ? (
				<div className="flex align-middle justify-center">
					<div className="alert alert-info">
						<div>
							<div>
								<AlertIcon />
							</div>
							{/* TODO this needs to be fixed */}
							<span className="text-white">
								You have a delivery in progress. Click{" "}
								<Link href={`/driver/workflow/${workflowId}`} className="underline">
									here
								</Link>{" "}
								to see the delivery
							</span>
						</div>
					</div>
				</div>
			) : (
				<div />
			)}
			<div className="flex flex-col">
				<div className="max-w-xl">
					<h1 className="text-3xl text-black mt-4 text-left">Welcome, {firstName}</h1>
				</div>
				<div className="flex flex-col items-center mt-4 gap-4">
					<Link href={`/driver/workflow/${workflowId}`}>
						<div className="card w-80 bg-base-100 shadow-xl">
							<div className="card-body">
								<h2 className="card-title">Most Recent delivery</h2>
								{!workflowId && (
									<p className="text-sm text-error">
										*User as not been assigned to any deliveries yet
									</p>
								)}
							</div>
						</div>
					</Link>
					<Link href={`/driver/workflows`}>
						<div className="card w-80 bg-base-100 shadow-xl">
							<div className="card-body">
								<h2 className="card-title">Assigned deliveries</h2>
							</div>
						</div>
					</Link>
					<Link href="tel:123-456-7890">
						<div className="card w-80 bg-base-100 shadow-xl">
							<div className="card-body">
								<h2 className="card-title">Call Dispatch</h2>
							</div>
						</div>
					</Link>
				</div>
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
		status: "",
		driverFileData: []
	};

	let workflowData: unknown;

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

		const latestDriverAssignedWorkflow = await getLatestWorkflowsForDriver({ userToken });
		workflowData = latestDriverAssignedWorkflow.data as DriverWorkflowType;
	} catch (err) {
		console.info("err", err);
	}

	return {
		props: {
			userData,
			workflowData
		}
	};
};
