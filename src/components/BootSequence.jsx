import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const HappyMac = () => (
	<svg width="64" height="64" viewBox="0 0 32 32" shapeRendering="crispEdges" style={{ imageRendering: 'pixelated' }}>
		<rect x="3" y="4" width="26" height="22" fill="#fff" stroke="#000" strokeWidth="1" />
		<rect x="6" y="26" width="20" height="2" fill="#000" />
		<rect x="10" y="28" width="12" height="2" fill="#000" />
		<rect x="6" y="7" width="20" height="16" fill="#fff" stroke="#000" strokeWidth="1" />
		<rect x="11" y="12" width="2" height="2" fill="#000" />
		<rect x="19" y="12" width="2" height="2" fill="#000" />
		<rect x="11" y="17" width="1" height="1" fill="#000" />
		<rect x="12" y="18" width="2" height="1" fill="#000" />
		<rect x="14" y="19" width="4" height="1" fill="#000" />
		<rect x="18" y="18" width="2" height="1" fill="#000" />
		<rect x="20" y="17" width="1" height="1" fill="#000" />
		<rect x="8" y="24" width="16" height="1" fill="#000" />
	</svg>
);

const extGlyphs = [
	<svg viewBox="0 0 16 16" shapeRendering="crispEdges"><rect x="1" y="1" width="14" height="14" fill="#fff" stroke="#000"/><rect x="3" y="2" width="10" height="5" fill="#fff" stroke="#000"/><rect x="5" y="3" width="6" height="3" fill="#000"/><rect x="4" y="9" width="8" height="6" fill="#fff" stroke="#000"/><rect x="6" y="10" width="4" height="1" fill="#000"/><rect x="6" y="12" width="4" height="1" fill="#000"/></svg>,
	<svg viewBox="0 0 16 16" shapeRendering="crispEdges"><path d="M3 1 L10 1 L13 4 L13 15 L3 15 Z" fill="#fff" stroke="#000"/><rect x="5" y="6" width="6" height="1" fill="#000"/><rect x="5" y="8" width="6" height="1" fill="#000"/><rect x="5" y="10" width="4" height="1" fill="#000"/></svg>,
	<svg viewBox="0 0 16 16" shapeRendering="crispEdges"><path d="M1 4 L6 4 L7 3 L14 3 L14 13 L1 13 Z" fill="#fff" stroke="#000"/><rect x="2" y="5" width="11" height="1" fill="#000"/></svg>,
	<svg viewBox="0 0 16 16" shapeRendering="crispEdges"><circle cx="8" cy="9" r="5" fill="#fff" stroke="#000"/><rect x="9" y="2" width="3" height="2" fill="#000"/><rect x="10" y="1" width="1" height="1" fill="#000"/></svg>,
	<svg viewBox="0 0 16 16" shapeRendering="crispEdges"><rect x="1" y="4" width="14" height="8" fill="#fff" stroke="#000"/><rect x="3" y="7" width="10" height="1" fill="#000"/><rect x="6" y="5" width="3" height="5" fill="#000"/></svg>,
	<svg viewBox="0 0 16 16" shapeRendering="crispEdges"><circle cx="8" cy="8" r="6" fill="#fff" stroke="#000"/><ellipse cx="8" cy="8" rx="6" ry="3" fill="none" stroke="#000"/><rect x="7" y="2" width="2" height="12" fill="none" stroke="#000"/></svg>,
	<svg viewBox="0 0 16 16" shapeRendering="crispEdges"><path d="M3 6 L6 6 L10 3 L10 13 L6 10 L3 10 Z" fill="#fff" stroke="#000"/><path d="M12 5 Q14 8 12 11" fill="none" stroke="#000"/></svg>,
	<svg viewBox="0 0 16 16" shapeRendering="crispEdges"><circle cx="8" cy="8" r="6" fill="#fff" stroke="#000"/><rect x="7" y="4" width="2" height="5" fill="#000"/><rect x="8" y="8" width="4" height="1" fill="#000"/></svg>,
	<svg viewBox="0 0 16 16" shapeRendering="crispEdges"><rect x="1" y="5" width="14" height="7" fill="#fff" stroke="#000"/><rect x="3" y="7" width="2" height="1" fill="#000"/><rect x="6" y="7" width="2" height="1" fill="#000"/><rect x="9" y="7" width="2" height="1" fill="#000"/><rect x="12" y="7" width="2" height="1" fill="#000"/><rect x="4" y="10" width="8" height="1" fill="#000"/></svg>,
	<svg viewBox="0 0 16 16" shapeRendering="crispEdges"><rect x="3" y="2" width="10" height="5" fill="#fff" stroke="#000"/><rect x="1" y="7" width="14" height="5" fill="#fff" stroke="#000"/><rect x="3" y="12" width="10" height="3" fill="#fff" stroke="#000"/><rect x="12" y="9" width="1" height="1" fill="#000"/></svg>,
	<svg viewBox="0 0 16 16" shapeRendering="crispEdges"><rect x="1" y="4" width="14" height="8" fill="#fff" stroke="#000"/><rect x="3" y="7" width="10" height="2" fill="#000"/><rect x="12" y="5" width="2" height="1" fill="#000"/></svg>,
	<svg viewBox="0 0 16 16" shapeRendering="crispEdges"><circle cx="8" cy="9" r="5" fill="#fff" stroke="#000"/><rect x="7" y="2" width="2" height="2" fill="#000"/><rect x="8" y="5" width="1" height="4" fill="#000"/></svg>,
	<svg viewBox="0 0 16 16" shapeRendering="crispEdges"><rect x="2" y="2" width="12" height="12" fill="#fff" stroke="#000"/><rect x="3" y="3" width="10" height="3" fill="#000"/><rect x="4" y="8" width="2" height="2" fill="#000"/><rect x="7" y="8" width="2" height="2" fill="#000"/><rect x="10" y="8" width="2" height="2" fill="#000"/><rect x="4" y="11" width="2" height="2" fill="#000"/><rect x="7" y="11" width="2" height="2" fill="#000"/><rect x="10" y="11" width="2" height="2" fill="#000"/></svg>,
	<svg viewBox="0 0 16 16" shapeRendering="crispEdges"><ellipse cx="8" cy="8" rx="6" ry="4" fill="#fff" stroke="#000"/><circle cx="8" cy="8" r="2" fill="#000"/></svg>,
];

const BootSequence = ({ onDone }) => {
	const root = useRef(null);
	const [phase, setPhase] = useState("dither");
	const [extCount, setExtCount] = useState(0);

	useEffect(() => {
		const t = [];
		t.push(setTimeout(() => setPhase("happy"), 250));
		t.push(setTimeout(() => setPhase("welcome"), 900));
		t.push(setTimeout(() => setPhase("exts"), 1600));

		let i = 0;
		const marchStep = () => {
			i += 1;
			setExtCount(i);
			if (i < extGlyphs.length) {
				t.push(setTimeout(marchStep, 90));
			} else {
				t.push(setTimeout(() => setPhase("fadeout"), 280));
			}
		};
		t.push(setTimeout(marchStep, 1800));

		return () => t.forEach(clearTimeout);
	}, []);

	useEffect(() => {
		if (phase !== "fadeout") return;
		gsap.to(root.current, {
			opacity: 0,
			duration: 0.45,
			ease: "power2.in",
			delay: 0.15,
			onComplete: onDone,
		});
	}, [phase, onDone]);

	const shown = phase !== "dither";

	return (
		<div ref={root} className="boot-root" aria-hidden>
			<div className="boot-screen" />

			{shown && (
				<div className="boot-happy">
					<HappyMac />
				</div>
			)}

			{phase !== "dither" && phase !== "happy" && (
				<div className="boot-welcome">
					<div className="boot-welcome-inner">
						<div style={{ fontSize: 12, textAlign: 'center' }}>Welcome to Mac OS</div>
						<div style={{ fontSize: 10, textAlign: 'center', marginTop: 6, color: '#333' }}>
							aurora.boot 8.1 — starting up…
						</div>
					</div>
				</div>
			)}

			{(phase === "exts" || phase === "fadeout") && (
				<div className="boot-exts">
					{extGlyphs.slice(0, extCount).map((g, i) => (
						<div key={i} className="boot-ext">{g}</div>
					))}
				</div>
			)}
		</div>
	);
};

export default BootSequence;
