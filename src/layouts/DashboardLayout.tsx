import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardNavbar from "@/components/Nav/DashboardNavbar";

import MenuSvg from "public/svg/menu.svg";

interface LayoutProps {
	children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
	const leftSideButtons = [
		<label key={"menu"} htmlFor="main-drawer" className="btn btn-primary drawer-button lg:hidden">
			<Image src={MenuSvg} alt="menu" />
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
									<Image
										src={"icons/svg/truck-loading.svg"}
										width={24}
										height={24}
										alt="workflows"
									/>
									<p className="prose lg:prose-xl pl-2">Workflows</p>
								</div>
							</Link>
							<Link href={"/dashboard/metrics"} className="hover:bg-accent p-2">
								<div className="flex flex-row">
									<Image src={"icons/svg/chart-line.svg"} width={24} height={24} alt="metrics" />
									<p className="prose lg:prose-xl pl-2">Metrics</p>
								</div>
							</Link>
						</ul>
						<ul className="menu text-base-content">
							<Link href={"/dashboard/workflows"} className="hover:bg-accent p-2">
								<div className="flex flex-row">
									<Image src={"icons/svg/settings.svg"} width={24} height={24} alt="settings" />
									<p className="prose lg:prose-xl pl-2">Settings</p>
								</div>{" "}
							</Link>
							<Link href={"/dashboard/metrics"} className="hover:bg-accent p-2">
								<div className="flex flex-row">
									<Image src={"icons/svg/logout.svg"} width={24} height={24} alt="logout" />
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
