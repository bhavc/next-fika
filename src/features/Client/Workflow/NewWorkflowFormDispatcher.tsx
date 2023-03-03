interface NewWorkflowFormDispatcherProps {}

// TODO how do i know where to search
// if on the user object, what if that user moves or has
// multiple regions they work in
// maybe take to and from address and find dispatchers from that area?
// in that case, this should be before the location step
export default function NewWorkflowFormDispatcher() {
	return (
		<div className="w-full bg-slate-100 rounded-b-md p-4 mb-4">
			<h2 className="text-xl mb-2">Select your dispatcher</h2>
			<div>
				<select className="select w-full max-w-xs">
					<option disabled selected>
						Choose what region
					</option>
					<option>Homer</option>
					<option>Marge</option>
					<option>Bart</option>
					<option>Lisa</option>
					<option>Maggie</option>
				</select>
			</div>
		</div>
	);
}
