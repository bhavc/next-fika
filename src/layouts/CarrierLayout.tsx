import { ReactNode, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useOutsideRef } from "@/hooks/useOutsideRef";

import CarrierNavbar from "@/components/Nav/CarrierNavbar";

import CloseIcon from "public/svg/icon-x.svg";
import HomeIcon from "public/svg/home.svg";
import HistoryIcon from "public/svg/history.svg";
import LogoutIcon from "public/svg/logout.svg";
import MenuIcon from "public/svg/menu.svg";
import SettingsIcon from "public/svg/settings.svg";
import TruckIcon from "public/svg/truck-loading.svg";

import UserPlus from "public/svg/user-plus.svg";
import User from "public/svg/user-circle.svg";

interface LayoutProps {
	children: ReactNode;
}

export default function CarrierLayout({ children }: LayoutProps) {
	const refContainer = useRef(null);
	const { isOutsideRef } = useOutsideRef(refContainer);

	const router = useRouter();
	const [showSidebar, setShowSidebar] = useState(false);

	const currentPath = router.pathname;

	const handleButtonClick = () => {
		setShowSidebar(!showSidebar);
	};

	const leftSideButtons = [
		<button
			key={"menu"}
			className="btn btn-primary drawer-button lg:hidden"
			onClick={handleButtonClick}
		>
			{showSidebar ? <CloseIcon width={24} height={24} stroke="white" /> : <MenuIcon />}
		</button>
	];

	return (
		<>
			<CarrierNavbar leftSideItems={leftSideButtons} />
			<div className="drawer drawer-mobile h-[calc(100vh_-_65px)]">
				<input
					id="main-drawer"
					type="checkbox"
					className="drawer-toggle"
					checked={showSidebar}
					onChange={() => null}
				/>
				<div className="drawer-content flex flex-col bg-slate-200">{children}</div>
				<div className="drawer-side">
					<div className="flex flex-col justify-between w-72 bg-primary" ref={refContainer}>
						<ul className="menu text-base-content w-60 pl-4 pt-4 gap-4">
							<Link
								href={"/carrier"}
								className={`hover:bg-accent p-2 rounded-md ${
									currentPath === "/carrier" ? "bg-accent" : "bg-inherit"
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
								href={"/carrier/workflows/ongoing"}
								className={`hover:bg-accent p-2 rounded-md ${
									currentPath === "/carrier/workflows/ongoing" ? "bg-accent" : "bg-inherit"
								}`}
							>
								<div className="flex flex-row">
									<div className="mt-2">
										<TruckIcon width={24} height={24} stroke="white" />
									</div>
									<p className="prose lg:prose-xl pl-2 text-white">Assigned Deliveries</p>
								</div>
							</Link>
							<Link
								href={"/carrier/workflows/past"}
								className={`hover:bg-accent p-2 rounded-md ${
									currentPath === "/carrier/workflows/past" ? "bg-accent" : "bg-inherit"
								}`}
							>
								<div className="flex flex-row">
									<div className="mt-2">
										<HistoryIcon stroke="white" />
									</div>
									<p className="prose lg:prose-xl pl-2 text-white">Past Deliveries</p>
								</div>
							</Link>
							<Link
								href={"/carrier/drivers"}
								className={`hover:bg-accent p-2 rounded-md ${
									currentPath === "/carrier/drivers" ? "bg-accent" : "bg-inherit"
								}`}
							>
								<div className="flex flex-row">
									<div className="mt-2">
										<User width={24} height={24} stroke="white" />
									</div>
									<p className="prose lg:prose-xl pl-2 text-white">Drivers</p>
								</div>
							</Link>
							<Link
								href={"/carrier/onboard-driver"}
								className={`hover:bg-accent p-2 rounded-md ${
									currentPath === "/carrier/onboard-driver" ? "bg-accent" : "bg-inherit"
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
								href={"/carrier/settings"}
								className={`hover:bg-accent p-2 rounded-md ${
									currentPath === "/carrier/settings" ? "bg-accent" : "bg-inherit"
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
