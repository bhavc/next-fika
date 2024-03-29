interface BadgeProps {
	children: any;
	color: string;
}

export default function Badge({ children, color }: BadgeProps) {
	return <div className={`p-2 bg-${color} rounded-lg`}>{children}</div>;
}
