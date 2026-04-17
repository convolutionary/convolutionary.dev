import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Window = ({ title, children, className = "", style = {}, delay = 0 }) => {
	const ref = useRef(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const ctx = gsap.context(() => {
			gsap.from(el, {
				opacity: 0,
				scale: 0.94,
				y: 14,
				duration: 0.55,
				delay,
				ease: "power3.out",
				transformOrigin: "50% 0%",
				scrollTrigger: {
					trigger: el,
					start: "top 88%",
					toggleActions: "play none none none",
				},
			});
		}, el);
		return () => ctx.revert();
	}, [delay]);

	return (
		<div ref={ref} className={`win ${className}`} style={style}>
			<div className="win-title">
				<div className="win-close">
					<div className="win-close-inner" />
				</div>
				<span>{title}</span>
			</div>
			<div className="win-body">{children}</div>
		</div>
	);
};

export default Window;
