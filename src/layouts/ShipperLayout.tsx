import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import ShipperNavbar from "@/components/Nav/ShipperNavbar";

import MenuIcon from "public/svg/menu.svg";
import HomeIcon from "public/svg/home.svg";
import NewIcon from "public/svg/circle-plus.svg";
import HistoryIcon from "public/svg/history.svg";
import SettingsIcon from "public/svg/settings.svg";
import LogoutIcon from "public/svg/logout.svg";

interface LayoutProps {
	children: ReactNode;
}

export default function ShipperLayout({ children }: LayoutProps) {
	const router = useRouter();

	const currentPath = router.pathname;

	const leftSideButtons = [
		<label key={"menu"} htmlFor="main-drawer" className="btn btn-primary drawer-button lg:hidden">
			<MenuIcon />
		</label>
	];

	return (
		<>
			<ShipperNavbar leftSideItems={leftSideButtons} />
			<div className="drawer drawer-mobile h-[calc(100vh_-_65px)] overflow-auto">
				<input id="main-drawer" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content flex flex-col bg-slate-200">{children}</div>
				<div className="drawer-side">
					<label htmlFor="my-drawer-2" className="drawer-overlay" />
					<div className="flex flex-col justify-between w-72 bg-primary">
						<ul className="menu text-base-content w-60 pl-10 pt-4 gap-4">
							<Link
								href={"/shipper"}
								className={`hover:bg-accent p-2 rounded-md ${
									currentPath === "/shipper" ? "bg-accent" : "bg-inherit"
								}`}
							>
								<div className="flex flex-row">
									<div className="mt-2">
										<HomeIcon width={24} height={24} stroke="white" />
									</div>
									<p className="prose lg:prose-xl pl-2 text-white">Home</p>
								</div>
							</Link>
							<Link
								href={"/shipper/workflow"}
								className={`hover:bg-accent p-2 rounded-md ${
									currentPath === "/shipper/workflow" ? "bg-accent" : "bg-inherit"
								}`}
							>
								<div className="flex flex-row">
									<div className="mt-2">
										<NewIcon stroke="white" />
									</div>
									<p className="prose lg:prose-xl pl-2 text-white">Create Delivery</p>
								</div>
							</Link>
							<Link
								href={"/shipper/workflows"}
								className={`hover:bg-accent p-2 rounded-md ${
									currentPath === "/shipper/workflows" ? "bg-accent" : "bg-inherit"
								}`}
							>
								<div className="flex flex-row">
									<div className="mt-2">
										<HistoryIcon stroke="white" />
									</div>
									<p className="prose lg:prose-xl pl-2 text-white">Past Deliveries</p>
								</div>
							</Link>
						</ul>
						<ul className="menu text-base-content w-60 pl-10 gap-4">
							<Link
								href={"/shipper/settings"}
								className={`hover:bg-accent p-2 rounded-md ${
									currentPath === "/shipper/settings" ? "bg-accent" : "bg-inherit"
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
