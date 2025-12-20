import { useState, useEffect } from 'react';

// keeps track of screen size for responsive shenanigans
export const useMobileDetect = (breakpoint = 640) => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const check = () => setIsMobile(window.innerWidth < breakpoint);

		check(); // run on mount
		window.addEventListener('resize', check);

		return () => window.removeEventListener('resize', check);
	}, [breakpoint]);

	return isMobile;
};

export default useMobileDetect;
