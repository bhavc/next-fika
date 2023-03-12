import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function Logout() {
	const [cookie, setCookie, removeCookie] = useCookies(["user"]);
	const router = useRouter();

	useEffect(() => {
		removeCookie("user");
		router.push("/");
	}, [router, removeCookie]);

	return (
		<div className="flex justify-center items-center center h-screen">
			<progress className="progress w-56"></progress>
		</div>
	);
}

// TODO delete cookie properly
