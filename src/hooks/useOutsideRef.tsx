import { useEffect, useState } from "react";

interface RefObject {
	readonly current: any | null;
}

export const useOutsideRef = (ref: RefObject) => {
	const [isOutsideRef, setIsOutsideRef] = useState(false);

	useEffect(() => {
		const handleOutsideClick = (event: any) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setIsOutsideRef(true);
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [ref]);

	return { isOutsideRef };
};
