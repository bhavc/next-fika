import Image from "next/image";
import Link from "next/link";

import { getCurrentUser } from "@/api/user";
import { mapUserTypeToAppRoute } from "@/features/helpers";

import MainNavBar from "@/components/Nav/MainNavbar";
import MainFooter from "@/components/MainFooter";

import type { GetServerSideProps } from "next";

// import LandingMain from "public/jpeg/landing_main.jpg";
import AnalyzeFilled from "public/svg/analyze-filled.svg";
import ChartAreaLineFilled from "public/svg/chart-area-line-filled.svg";
import CloudLock from "public/svg/cloud-lock.svg";
import MoneyBag from "public/svg/money-bag.svg";

export default function Home({ isLoggedIn, appRoute }: { isLoggedIn: boolean; appRoute: string }) {
	return (
		<>
			<MainNavBar isLoggedIn={isLoggedIn} appRoute={appRoute} />
			<main className="bg-slate-100 100vh">
				<section className="bg-primary flex flex-col md:flex-row">
					<div className="flex flex-col justify-center p-8 gap-20 md:gap-40">
						<div>
							<h1 className="text-3xl text-base-100">Seamless freight handling</h1>
						</div>
						<div className="flex flex-col gap-4">
							<h2 className="text-xl text-base-100">
								Freight can be daunting. Fika is here to make it easier.
							</h2>
							<h2 className="text-xl text-base-100">
								Fika is a modern TMS that makes freight transactions between customers, forwarders,
								and drivers seamless and transparent.
							</h2>
							<h2 className="text-xl text-base-100">
								We connect you to verified logistics providers in Africa and emerging markets.
							</h2>
						</div>
					</div>
					<div className="hero h-[calc(100vh_-_20vh)] bg-[url('/jpeg/client_main.jpeg')]">
						<div className="hero-overlay bg-opacity-60"></div>
					</div>
				</section>
				<section className="px-4 py-10 flex flex-col justify-center items-center">
					<div className="p-4">
						<h2 className="text-xl mt-2">Getting started with Fika is easy.</h2>
						<p className="text-md">
							Just create an account and specify whether you&apos;re a Shipper or a Carrier.
						</p>
					</div>
					<div className="p-4">
						<Link
							href={"/register"}
							className="btn btn-lg btn-ghost normal-case bg-base-100 hover:bg-secondary active:bg-secondary visited:bg-secondary text-slate-100"
						>
							Get Started
						</Link>
					</div>
				</section>
				<section className="px-4 py-10 bg-primary text-slate-100">
					<h2 className="text-2xl text-center mt-2 mb-8 ">A quick glance at our benefits</h2>

					<div className="grid md:grid-cols-2 gap-4">
						<div>
							<div className="flex flex-row gap-2">
								<MoneyBag width={48} height={48} />
								<h2 className="text-xl mt-2 mb-4">No upfront costs</h2>
							</div>
							<div>
								<p className="text-md px-4">
									No high startup and onboarding costs. Fika is a free platform to on-board. We only
									get paid for work transacted on the platform
								</p>
							</div>
						</div>
						<div>
							<div className="flex flex-row gap-2">
								<CloudLock width={48} height={48} />
								<h2 className="text-xl mt-2 mb-4">Web based</h2>
							</div>
							<div>
								<p className="text-md px-4">
									Our platform is fully web-based with all data secured on our servers.
								</p>
							</div>
						</div>
						<div>
							<div className="flex flex-row gap-2">
								<AnalyzeFilled width={48} height={48} />
								<h2 className="text-xl mt-2 mb-4">All in one Quoting, allocating & tracking</h2>
							</div>
							<div>
								<p className="text-md px-4">
									we developed our software to for customers, carriers, and drivers to all interact
									seamlessly with each-other.
								</p>
								<p className="font-bold px-4">No more communication breakdowns</p>
							</div>
						</div>

						<div>
							<div className="flex flex-row gap-2">
								<ChartAreaLineFilled width={48} height={48} />
								<h2 className="text-xl mt-2 mb-4">Compare the market</h2>
							</div>
							<div>
								<p className="text-md px-4">
									You will be part of the exclusive club of people who know the secrets to day
									trading ** THIS NEEDS TO BE CHANGED
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="pt-10 p-4 flex flex-col justify-center items-center">
					<h2 className="text-2xl text-center mt-2 mb-8">Your cargo is in safe hands</h2>
					<div className="flex flex-col justify-center items-center md:px-40 mb-10">
						<p className="text-md mb-4">
							To ensure all our clients have peace of mind - all carriers & forwarders are vetted to
							ensure they meet our stringent standards to have access to our TMS & Freight
							marketplace. This means:
						</p>
						<ul className="list-disc">
							<li>Company registration documents & tax certificates are vetted</li>
							<li>Insurance in place for respective marketplaces</li>
							<li>Drivers meet local and company legal requirements</li>
							<li>All vehicles are GPS enabled</li>
							<li>Clear company and driver abstracts</li>
						</ul>
					</div>
				</section>
				{/* TODO: Add social proof, list of partners like GBW, Fracht */}
			</main>
			<MainFooter />
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req } = context;
	const { cookies } = req;
	const userToken = cookies?.user;
	const isLoggedIn = Boolean(userToken);
	let userData;

	// need to validate user here
	try {
		const response = await getCurrentUser(userToken);
		userData = response.data;
	} catch (err) {
		userData = null;
	}

	const appRoute = mapUserTypeToAppRoute(userData?.role);

	return {
		props: {
			isLoggedIn,
			appRoute
		}
	};
};
