import Image from "next/image";
import Link from "next/link";
import Router from "next/router";

import { getCurrentUser } from "@/api/user";

import MainNavBar from "@/components/Nav/MainNavbar";

import type { GetStaticProps, GetServerSideProps } from "next";

export default function Home({ header }: { header: string }) {
	return (
		<>
			<MainNavBar />
			<main>
				<h1 className="text-3xl mt-2 mb-2">Fika 2</h1>
				<div>
					<p className="prose lg:prose-xl">Fika landing page</p>
				</div>
			</main>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	// const { req } = context;
	// const { cookies } = req;
	// const userToken = cookies.user;
	// let userData;

	// // need to validate user here

	// try {
	// 	const responseData = await getCurrentUser(userToken);
	// 	userData = responseData.user;
	// } catch (err) {
	// 	console.log("err", err);
	// }

	// console.log("userData", userData);

	// return {
	// 	props: {
	// 		hello: "hello",
	// 		userToken
	// 	}
	// };
	return {
		redirect: {
			destination: "/client",
			statusCode: 302
		}
	};
};
