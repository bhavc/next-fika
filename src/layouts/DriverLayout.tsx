import Link from "next/link";
import DriverNavbar from "@/components/Nav/DriverNavbar";
import DriverMainFooter from "@/components/Footer/DriverMainFooter";

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
			<main className="bg-slate-200 p-4 overflow-auto h-[calc(100vh_-_120px)]">{children}</main>
			<DriverMainFooter />
		</>
	);
}
