import type { UserStatus } from "@/features/types";

export default function DriverStatusBadge({
	userStatus,
	children
}: {
	userStatus: UserStatus;
	children: string;
}) {
	switch (userStatus) {
		case "Pending":
			return <div className="p-2 bg-warning rounded-lg text-center">{children}</div>;
		case "Activated":
			return <div className="p-2 bg-success rounded-lg text-center">{children}</div>;
		case "Banned":
			return <div className="p-2 bg-slate-200 rounded-lg text-center">{children}</div>;
		case "Deleted":
			return <div className="p-2 bg-error rounded-lg text-center">{children}</div>;
		default:
			return <div className="p-2 bg-slate-200 rounded-lg text-center">{children}</div>;
	}
}
