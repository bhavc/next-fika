import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardNavbar from "@/components/Nav/DashboardNavbar";

import MenuIcon from "public/svg/menu.svg";
import TruckIcon from "public/svg/truck-loading.svg";
import ChartIcon from "public/svg/chart-line.svg";
import SettingsIcon from "public/svg/settings.svg";
import LogoutIcon from "public/svg/logout.svg";

interface LayoutProps {
	children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
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
				<div className="drawer-content flex flex-col">{children}</div>
				<div className="drawer-side">
					<label htmlFor="my-drawer-2" className="drawer-overlay" />
					<div className="flex flex-col justify-between w-72 bg-slate-100">
						<ul className="menu text-base-content">
							<Link href={"/dashboard/workflows"} className="hover:bg-accent p-2">
								<div className="flex flex-row">
									<TruckIcon />
									<p className="prose lg:prose-xl pl-2">Workflows</p>
								</div>
							</Link>
							<Link href={"/dashboard/metrics"} className="hover:bg-accent p-2">
								<div className="flex flex-row">
									<ChartIcon />
									<p className="prose lg:prose-xl pl-2">Metrics</p>
								</div>
							</Link>
						</ul>
						<ul className="menu text-base-content">
							<Link href={"/dashboard/workflows"} className="hover:bg-accent p-2">
								<div className="flex flex-row">
									<SettingsIcon stroke="black" />
									<p className="prose lg:prose-xl pl-2">Settings</p>
								</div>
							</Link>
							<Link href={"/dashboard/metrics"} className="hover:bg-accent p-2">
								<div className="flex flex-row">
									<LogoutIcon stroke="black" />
									<p className="prose lg:prose-xl pl-2">Log out</p>
								</div>
							</Link>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
