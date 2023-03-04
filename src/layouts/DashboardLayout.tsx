import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";

import DashboardNavbar from "@/components/Nav/DashboardNavbar";

import MenuIcon from "public/svg/menu.svg";
import HistoryIcon from "public/svg/history.svg";
import SettingsIcon from "public/svg/settings.svg";
import LogoutIcon from "public/svg/logout.svg";
import UserPlus from "public/svg/user-plus.svg";

interface LayoutProps {
	children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
	const router = useRouter();

	const currentPath = router.pathname;

	const leftSideButtons = [
		<label key={"menu"} htmlFor="main-drawer" className="btn btn-primary drawer-button lg:hidden">
			<MenuIcon />
		</label>
	];

	return (
		<>
			<DashboardNavbar leftSideItems={leftSideButtons} />
			<div className="drawer drawer-mobile h-[calc(100vh_-_65px)]">
				<input id="main-drawer" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content flex flex-col bg-slate-200">{children}</div>
				<div className="drawer-side">
					<label htmlFor="my-drawer-2" className="drawer-overlay" />
					<div className="flex flex-col justify-between w-72 bg-primary">
						<ul className="menu text-base-content w-60 pl-4 pt-4 gap-4">
							<Link
								href={"/dashboard/workflows"}
								className={`hover:bg-accent p-2 rounded-md ${
									currentPath === "/dashboard/workflows" ? "bg-accent" : "bg-inherit"
								}`}
							>
								<div className="flex flex-row">
									<div className="mt-2">
										<HistoryIcon stroke="white" />
									</div>
									<p className="prose lg:prose-xl pl-2 text-white">Assigned Deliveries</p>
								</div>
							</Link>
							<Link
								href={"/dashboard/onboard-driver"}
								className={`hover:bg-accent p-2 rounded-md ${
									currentPath === "/dashboard/onboard-driver" ? "bg-accent" : "bg-inherit"
								}`}
							>
								<div className="flex flex-row">
									<div className="mt-2">
										<UserPlus width={24} height={24} stroke="white" />
									</div>
									<p className="prose lg:prose-xl pl-2 text-white">Onboard Driver</p>
								</div>
							</Link>
						</ul>
						<ul className="menu text-base-content w-60 pl-4">
							<Link
								href={"/dashboard/settings"}
								className={`hover:bg-accent p-2 rounded-md ${
									currentPath === "/dashboard/settings" ? "bg-accent" : "bg-inherit"
								}`}
							>
								<div className="flex flex-row">
									<div className="mt-2">
										<SettingsIcon stroke="white" height={24} width={24} />
									</div>
									<p className="prose lg:prose-xl pl-2 text-white">Settings</p>
								</div>
							</Link>
							<Link
								href={"/logout"}
								className={`hover:bg-accent p-2 rounded-md ${
									currentPath === "/logout" ? "bg-accent" : "bg-inherit"
								}`}
							>
								<div className="flex flex-row">
									<div className="mt-2">
										<LogoutIcon stroke="white" />
									</div>
									<p className="prose lg:prose-xl pl-2 text-white">Log out</p>
								</div>
							</Link>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
