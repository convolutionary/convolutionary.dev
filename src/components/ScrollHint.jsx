import React, { useEffect, useRef } from "react";

const ScrollHint = () => {
	const ref = useRef(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const onScroll = () => {
			if (window.scrollY > 40) {
				el.classList.add("gone");
				window.removeEventListener("scroll", onScroll);
			}
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<div ref={ref} className="scroll-hint" aria-hidden>
			<div className="scroll-hint-mouse">
				<div className="scroll-hint-wheel" />
			</div>
			<span className="scroll-hint-text">scroll</span>
		</div>
	);
};

export default ScrollHint;
