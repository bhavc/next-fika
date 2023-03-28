import logo from "public/logo.png";

import Image from "next/image";
import Link from "next/link";

export default function Navbar({
	hideLogo,
	isLoggedIn,
	appRoute,
	hideRightSideItems
}: {
	hideLogo?: boolean;
	isLoggedIn?: boolean;
	appRoute?: string;
	hideRightSideItems?: boolean;
}) {
	const rightSideItems = () => {
		if (hideRightSideItems) {
			return <></>;
		}

		if (isLoggedIn && appRoute) {
			return (
				<>
					<Link
						href={appRoute}
						className="btn btn-secondary btn-md normal-case bg-secondary visited:bg-secondary hover:bg-secondary-focus active:bg-secondary-content text-slate-200"
					>
						Go to App
					</Link>
				</>
			);
		}

		return (
			<>
				<Link
					href={"/login"}
					className="btn btn-md btn-ghost normal-case bg-secondary hover:bg-secondary active:bg-secondary visited:bg-secondary text-slate-100"
				>
					Login
				</Link>
				<Link
					href={"/register"}
					className="btn btn-md btn-ghost normal-case bg-secondary hover:bg-secondary active:bg-secondary visited:bg-secondary text-slate-100"
				>
					Register
				</Link>
			</>
		);
	};

	return (
		<div className="navbar bg-slate-100 justify-between">
			<Link href={"/"}>
				<Image src={logo} alt="logo" height={50} width={50} priority />
			</Link>
			<div className="gap-2">{rightSideItems()}</div>
		</div>
	);
}
