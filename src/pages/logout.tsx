import { useRouter } from "next/router";
import { useEffect } from "react";
import { setCookie, getCookie, deleteCookie } from "cookies-next";

export default function Logout() {
	const router = useRouter();

	useEffect(() => {
		deleteCookie("user");
		router.push("/");
	}, [router]);

	return (
		<div className="flex justify-center items-center center h-screen">
			<progress className="progress w-56"></progress>
		</div>
	);
}
