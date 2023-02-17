import Image from "next/image";
import Link from "next/link";

export default function HomeCards() {
	return (
		<div className="flex flex-col items-center justify-center">
			<div className="flex flex-row gap-2 mb-2">
				<Link href={"client/workflow"}>
					<div className="card w-40 h-40 bg-accent hover:bg-opacity-90 text-primary-content">
						<div className="card-body">
							<h2 className="card-title text-cyan-50">New Shipment</h2>
						</div>
						<div className="card-actions justify-end absolute bottom-0 right-0">
							<Image src={"icons/svg/circle-plus.svg"} width={80} height={80} alt="logout" />
						</div>
					</div>
				</Link>
				<Link href={"client/workflows"}>
					<div className="card w-40 h-40 bg-orange-500 hover:bg-opacity-90 text-primary-content">
						<div className="card-body z-2">
							<div className="card-title text-cyan-50">View past Shipments</div>
						</div>
						<div className="card-actions justify-end absolute bottom-0 right-0">
							<Image src={"icons/svg/history.svg"} width={80} height={80} alt="logout" />
						</div>
					</div>
				</Link>
			</div>
			<div className="flex flex-row gap-2">
				<Link href={"/client/settings"}>
					<div className="card w-40 h-40 bg-green-400 hover:bg-opacity-90 text-primary-content">
						<div className="card-body">
							<h2 className="card-title text-cyan-50">Settings</h2>
						</div>
						<div className="card-actions justify-end absolute bottom-0 right-0">
							<Image src={"icons/svg/settings.svg"} width={80} height={80} alt="logout" />
						</div>
					</div>
				</Link>
				<Link href={"/logout"}>
					<div className="card w-40 h-40 bg-slate-400 hover:bg-opacity-90 text-primary-content">
						<div className="card-body">
							<h2 className="card-title text-cyan-50">Logout</h2>
						</div>
						<div className="card-actions justify-end absolute bottom-0 right-0">
							<Image src={"icons/svg/logout.svg"} width={80} height={80} alt="logout" />
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
}
