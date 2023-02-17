import { useState, useEffect } from "react";

export const useViewport = () => {
	const [width, setWidth] = useState(window.innerWidth);
	const breakpoint = 620;

	useEffect(() => {
		const handleWindowResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", () => handleWindowResize);

		return () => window.removeEventListener("resize", handleWindowResize);
	}, []);

	const isMobile = width < breakpoint;

	return { isMobile };
};
