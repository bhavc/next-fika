import { GetServerSideProps } from "next";
import { useQuery } from "react-query";

import { getCurrentUser } from "@/api/user";

export default function Dashboard({ hello, userToken }: { hello: string; userToken: string }) {
	// const { isLoading, isError, data, error } = useQuery({
	// 	queryKey: ["user"],
	// 	queryFn: () => getCurrentUser(userToken)
	// });

	// console.log("data 123", data);

	return (
		<div>
			<div>Dashboard here for dashboard users {hello}</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req } = context;
	const { cookies } = req;
	const userToken = cookies.user;
	let userData;

	// need to validate user here

	try {
		const responseData = await getCurrentUser(userToken);
		userData = responseData.user;
	} catch (err) {
		console.log("err", err);
	}

	console.log("userData", userData);

	return {
		props: {
			hello: "hello",
			userToken
		}
	};
};
