import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function Logout() {
	const [cookie, setCookie] = useCookies(["user"]);
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
