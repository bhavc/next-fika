import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function Logout() {
	const [cookie, setCookie] = useCookies(["user"]);
	const [loaderValue, setLoaderValue] = useState(0);
	const router = useRouter();

	useEffect(() => {
		setCookie("user", "", {
			maxAge: 0,
			expires: new Date()
		});

		router.push("/");
	}, [router, setCookie]);

	return (
		<div className="flex justify-center items-center center h-screen">
			<progress className="progress w-56"></progress>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req, res } = context;
	const { cookies } = req;

	console.log("do we get here");

	// need to validate user here

	return {
		props: {
			something: "hello"
		}
	};
};
