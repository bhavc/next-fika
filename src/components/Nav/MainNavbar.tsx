import logo from "public/logo.png";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
	return (
		<div className="navbar bg-primary justify-between">
			<Link href={"/"}>
				<Image src={logo} alt="logo" height={50} width={50} priority />
			</Link>
			<div className="gap-2">
				<Link
					href={"/login"}
					className="btn btn-md btn-ghost normal-case bg-base-100 visited:bg-base-100 hover:bg-base-100 active:bg-base-100"
				>
					Login
				</Link>
				<Link
					href={"/register"}
					className="btn btn-md btn-ghost normal-case bg-base-100 hover:bg-base-100 active:bg-base-100 visited:bg-base-100"
				>
					Register
				</Link>
			</div>
		</div>
	);
}
