import { ReactNode } from "react";
import Navbar from "@/components/Nav/ClientNavbar";
import Footer from "@/components/Footer";

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<>
			<Navbar />
			<main>{children}</main>
		</>
	);
}
