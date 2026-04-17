import React, { useEffect, useRef } from "react";

const TechMarquee = ({ items, speed = 45, reverse = false }) => {
	const trackRef = useRef(null);
	const maskRef = useRef(null);
	const posRef = useRef(0);
	const lastRef = useRef(0);
	const hoverRef = useRef(false);

	useEffect(() => {
		const el = trackRef.current;
		const mask = maskRef.current;
		if (!el || !mask) return;

		let raf = 0;
		let visible = true;
		let tabActive = typeof document === "undefined" ? true : !document.hidden;

		const io = new IntersectionObserver(
			(entries) => { visible = entries[0]?.isIntersecting ?? true; },
			{ rootMargin: "100px" }
		);
		io.observe(mask);

		const onVis = () => { tabActive = !document.hidden; };
		document.addEventListener("visibilitychange", onVis);

		const tick = (now) => {
			// clear the clock while paused so we don't compute a huge dt on wake
			if (!visible || !tabActive || hoverRef.current) {
				lastRef.current = 0;
			} else {
				if (!lastRef.current) lastRef.current = now;
				const dt = (now - lastRef.current) / 1000;
				lastRef.current = now;

				const dx = (reverse ? -1 : 1) * speed * dt;
				posRef.current -= dx;

				const w = el.scrollWidth / 3;
				if (posRef.current <= -w) posRef.current += w;
				if (posRef.current > 0)   posRef.current -= w;

				el.style.transform = `translate3d(${posRef.current}px,0,0)`;
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(raf);
			io.disconnect();
			document.removeEventListener("visibilitychange", onVis);
		};
	}, [speed, reverse]);

	const tripled = [...items, ...items, ...items];

	return (
		<div
			ref={maskRef}
			className="tech-marquee-mask"
			onMouseEnter={() => (hoverRef.current = true)}
			onMouseLeave={() => (hoverRef.current = false)}
		>
			<div className="tech-marquee-track" ref={trackRef}>
				{tripled.map((item, i) => (
					<a
						key={i}
						href={item.link}
						target="_blank"
						rel="noopener noreferrer"
						className="tech-marquee-chip"
					>
						<img src={item.img} alt="" />
						{item.name}
					</a>
				))}
			</div>
		</div>
	);
};

export default TechMarquee;
