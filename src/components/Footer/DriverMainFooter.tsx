import Link from "next/link";

import { useRouter } from "next/router";

import HomeIcon from "public/svg/home.svg";
import TruckIcon from "public/svg/truck-loading.svg";
import SettingsIcon from "public/svg/settings.svg";

export default function DriverMainFooter() {
	const router = useRouter();
	const currentPath = router.pathname;

	return (
		<div className="btm-nav overflow-hidden mt-2">
			<Link
				href={"/driver"}
				className={`p-2 ${currentPath === "/driver" ? "bg-primary" : "bg-inherit"}`}
			>
				{currentPath === "/driver" ? (
					<HomeIcon width={40} height={40} stroke="white" />
				) : (
					<HomeIcon width={40} height={40} />
				)}
			</Link>
			<Link
				href={"/driver/workflows"}
				className={`p-2 ${currentPath === "/driver/workflows" ? "bg-primary" : "bg-inherit"}`}
			>
				{currentPath === "/driver/workflows" ? (
					<TruckIcon width={40} height={40} stroke="white" />
				) : (
					<TruckIcon width={40} height={40} />
				)}
			</Link>
			<Link
				href={"/driver/settings"}
				className={`p-2 ${currentPath === "/driver/settings" ? "bg-primary" : "bg-inherit"}`}
			>
				{currentPath === "/driver/settings" ? (
					<SettingsIcon width={40} height={40} stroke="white" />
				) : (
					<SettingsIcon width={40} height={40} stroke="black" />
				)}
			</Link>
		</div>
	);
}
