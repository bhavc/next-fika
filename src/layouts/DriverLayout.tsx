import Link from "next/link";
import DriverNavbar from "@/components/Nav/DriverNavbar";

import HomeIcon from "public/svg/home.svg";
import TruckIcon from "public/svg/truck-loading.svg";
import SettingsIcon from "public/svg/settings.svg";
import { useRouter } from "next/router";

interface DriverLayout {
	children: any;
	leftSideItems?: JSX.Element[];
}

export default function DriverLayout({ children, leftSideItems }: DriverLayout) {
	const router = useRouter();
	const currentPath = router.pathname;

	const rightSideItems = [
		<div key="profile">
			<div className="dropdown dropdown-end">
				<label tabIndex={0} className="avatar placeholder">
					<div className="bg-primary text-neutral-content rounded-full w-12">
						<span className="text-xl bg-primary">P</span>
					</div>
				</label>
				<ul
					tabIndex={0}
					className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 border-2 border-slate-300"
				>
					<Link href={"/driver/settings"} className="p-2 hover:opacity-80 hover:bg-accent">
						Settings
					</Link>
					<Link href={"/logout"} className="p-2 hover:opacity-80 hover:bg-accent">
						Logout
					</Link>
				</ul>
			</div>
		</div>
	];

	return (
		<>
			<DriverNavbar leftSideItems={leftSideItems} rightSideItems={rightSideItems} />
			<main className="bg-slate-200 h-[calc(100vh_-_0px)] p-4 overflow-auto">{children}</main>

			<div className="btm-nav overflow-hidden">
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
		</>
	);
}
