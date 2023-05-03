import { useEffect, useState } from "react";

import { getWorkflowsByUserId } from "@/api/workflow";

import ShipperLayout from "@/layouts/ShipperLayout";
import WorkflowTableList from "@/features/Shipper/ShipperWorkflows/WorkflowTableList";

import type { GetServerSideProps } from "next";
import type { WorkflowType } from "@/features/Shipper/ShipperWorkflows/types";

import { toast } from "react-hot-toast";

export default function Workflows({ userToken }: { userToken: string }) {
	const [workflows, setWorkflows] = useState<WorkflowType[] | undefined>(undefined);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getWorkflowsByUserId({ userToken, statusGroup: "inactive" })
			.then((workflowData) => {
				setWorkflows(workflowData.workflows);
			})
			.catch(() => {
				setIsError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [userToken]);

	useEffect(() => {
		if (isError) {
			toast.error("Error getting users workflows");
			setIsError(false);
		}
	}, [isError, setIsError]);

	return (
		<ShipperLayout>
			<main className="items-center justify-center">
				<div className="bg-slate-100 mt-4 p-4 rounded-t-md">
					<h1 className="text-3xl text-left mb-4">View your past Workflows</h1>
					<div className="flex justify-end mb-4">
						<div className="form-control w-1/2">
							{/* <div className="input-group">
								<input
									type="text"
									placeholder="Search…"
									className="input input-bordered w-full"
									onChange={handleOnSearch}
								/>
								<button className="btn btn-primary btn-square" onClick={handleClick}>
									<SearchIcon width={24} height={24} />
								</button>
							</div> */}
						</div>
					</div>
					<WorkflowTableList workflows={workflows} isLoading={isLoading} />
				</div>
			</main>
		</ShipperLayout>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req } = context;
	const { cookies } = req;
	const userToken = cookies.user;

	if (!userToken) {
		return {
			redirect: {
				destination: "/",
				statusCode: 302
			}
		};
	}

	return {
		props: {
			userToken
		}
	};
};
