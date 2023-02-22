import logo from "../../../public/logo.png";

import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
	leftSideItems?: JSX.Element[];
	rightSideItems?: any[];
}

export default function ClientNavBar({ leftSideItems, rightSideItems }: NavbarProps) {
	return (
		<div className="navbar bg-slate-100 justify-between px-2">
			<div className="w-1/3 justify-left items-center">
				{leftSideItems?.map((item, index) => {
					return <div key={index}>{item}</div>;
				})}
			</div>
			<div className="w-1/3 justify-center items-center">
				<Link href={"/"}>
					<Image src={logo} alt="logo" height={50} width={50} priority />
				</Link>
			</div>
			<div className="w-1/3 justify-right items-center">
				{rightSideItems ? (
					rightSideItems?.map((item, index) => {
						return <div key={index}>{item}</div>;
					})
				) : (
					<div />
				)}
			</div>
		</div>
	);
}
