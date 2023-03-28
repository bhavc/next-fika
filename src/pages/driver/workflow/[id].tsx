import { useRouter } from "next/router";
import { getCurrentUser } from "@/api/user";
import { getWorkflowByWorkflowId } from "@/api/workflow";

import DriverLayout from "@/layouts/DriverLayout";

import type { GetServerSideProps } from "next";
import type { UserDriver } from "@/features/Driver/UserDriver/types";
import type { DriverWorkflowType } from "@/features/Driver/DriverWorkflows/types";

export default function WorkflowId({ workflow }: { workflow: DriverWorkflowType }) {
	const router = useRouter();

	const workflowAddressData = workflow.workflowAddressData;
	const {
		t1Number,
		bolNumber,
		pickupWindow,
		dropoffWindow,
		pickupAddress,
		borderCrossing,
		dropoffAddress,
		shipmentNumber,
		containerNumber,
		pickupCompanyName,
		pickupContactName,
		dropoffCompanyName,
		dropoffContactName,
		pickupContactPhone,
		dropoffContactPhone,
		pickupAppointmentNeeded,
		dropOffAppointmentNeeded
	} = workflowAddressData;

	const workflowContainerData = workflow.workflowContainerData;

	const handleBack = () => {
		return router.back();
	};

	const leftSideItems = [
		<button key={"Back"} className="btn btn-ghost" onClick={handleBack}>
			Back
		</button>
	];

	return (
		<DriverLayout leftSideItems={leftSideItems}>
			<h1 className="text-3xl text-black">Delivery</h1>
			<div className="flex flex-col justify-center items-center mt-4">
				<div className="card w-80 bg-base-100 shadow-xl">
					<div className="card-body">
						<p className="font-bold">Shipment #: {shipmentNumber}</p>
						<p className="font-bold">BOL # {bolNumber}</p>

						<div className="divider" />

						<div className="flex flex-col">
							<p className="font-bold">Pickup Company Name</p>
							<p>{pickupCompanyName}</p>
							<p className="font-bold">Pickup Address</p>
							<p>{pickupAddress}</p>
							<p className="font-bold">Pickup Window</p>
							<p>{pickupWindow}</p>
							{pickupAppointmentNeeded && (
								<p className="italic">
									Contact {pickupContactName}, {pickupContactPhone} when you&apos;ve arrived
								</p>
							)}
						</div>
						<div className="divider" />

						<div className="flex flex-col">
							<p className="font-bold">Dropoff Company Name</p>
							<p>{dropoffCompanyName}</p>
							<p className="font-bold">Dropoff Address</p>
							<p>{dropoffAddress}</p>
							<p className="font-bold">Dropoff Window</p>
							<p>{dropoffWindow}</p>
							{dropOffAppointmentNeeded && (
								<p className="italic">
									Contact {dropoffContactName}, {dropoffContactPhone} when you&apos;ve arrived
								</p>
							)}
						</div>
					</div>
				</div>
				<div className="flex flex-row gap-4">
					<button className="btn btn-error">Reject</button>
					<button className="btn btn-success">Start</button>
				</div>
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
				destination: "/carrier/workflows",
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
				destination: "/carrier/workflows",
				statusCode: 302
			}
		};
	}

	return {
		props: {
			userData,
			workflow: workflowData,
			userToken
		}
	};
};
