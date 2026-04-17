import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollBar = () => {
	const fill = useRef(null);

	useEffect(() => {
		const el = fill.current;
		if (!el) return;
		gsap.set(el, { scaleX: 0, transformOrigin: "0% 50%" });
		const tween = gsap.to(el, {
			scaleX: 1,
			ease: "none",
			scrollTrigger: {
				trigger: document.body,
				start: "top top",
				end: "bottom bottom",
				scrub: 0.15,
			},
		});
		return () => {
			tween.scrollTrigger?.kill();
			tween.kill();
		};
	}, []);

	return (
		<div className="helios-gauge" aria-hidden>
			<div className="helios-gauge-fill" ref={fill} />
		</div>
	);
};

export default ScrollBar;
