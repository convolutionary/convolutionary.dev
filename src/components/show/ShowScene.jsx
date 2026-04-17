import React, { createContext, useContext, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { zoomRect } from "../../utils/zoomRect";
import MacIcon from "./MacIcon";

gsap.registerPlugin(ScrollTrigger);

const Ctx = createContext(null);

export const SceneIcon = ({ id, x, y, label, icon = "folder" }) => {
	const show = useContext(Ctx);
	const ref = useRef(null);

	// useLayoutEffect so parents see registrations before their own effect
	// runs — otherwise icons.current is empty during buildShow()
	useLayoutEffect(() => { if (show) show.registerIcon(id, ref.current); }, [show, id]);

	return (
		<div ref={ref} className="show-icon" style={{ "--x": `${x}%`, "--y": `${y}%` }}>
			<MacIcon name={icon} />
			<div className="show-icon-label">{label}</div>
		</div>
	);
};

export const Pane = ({ id, x, y, width, title, children, bodyStyle = {} }) => {
	const show = useContext(Ctx);
	const ref = useRef(null);

	useLayoutEffect(() => { if (show) show.registerWindow(id, ref.current); }, [show, id]);

	const w = typeof width === "number" ? `${width}px` : width;
	return (
		<div ref={ref} className="show-pane win" style={{ "--x": `${x}%`, "--y": `${y}%`, "--w": w }}>
			<div className="win-title">
				<div className="win-close"><div className="win-close-inner" /></div>
				<span>{title}</span>
			</div>
			<div className="win-body" style={bodyStyle}>{children}</div>
		</div>
	);
};

const qbez = (p0, cp, p1, t) => {
	const u = 1 - t;
	return u * u * p0 + 2 * u * t * cp + t * t * p1;
};

// deterministic so scrubbing back and forth replays the same arc
const seededRand = (seed) => {
	const x = Math.sin(seed * 9301 + 49297) * 233280;
	return x - Math.floor(x);
};

const hashSeed = (str) => {
	let h = 0;
	for (let i = 0; i < str.length; i++) {
		h = ((h << 5) - h + str.charCodeAt(i)) | 0;
	}
	return Math.abs(h);
};

// edge ∈ {0,1,2,3} → top/right/bottom/left
const edgePoint = (edge, rand) => {
	const W = window.innerWidth;
	const H = window.innerHeight;
	const pad = 60;
	switch (edge % 4) {
		case 0: return { x: rand * W, y: -pad };
		case 1: return { x: W + pad, y: rand * H };
		case 2: return { x: rand * W, y: H + pad };
		case 3:
		default: return { x: -pad, y: rand * H };
	}
};

// single choreography function used at all breakpoints — only the
// scroll distance (`height` percent) and the pane positions (via CSS
// variables) differ between mobile and desktop.
const buildShow = ({ section, stage, ghost, icons, windows, sequence, height, id }) => {
	sequence.forEach(([, wid]) => {
		const w = windows[wid];
		if (w) gsap.set(w, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.96, transformOrigin: "0% 0%" });
	});

	const sceneSeed = hashSeed(id || "scene");
	const entryEdge = sceneSeed % 4;
	const exitEdge  = (entryEdge + 1 + ((sceneSeed >> 2) % 3)) % 4;
	const entryPos  = edgePoint(entryEdge, seededRand(sceneSeed + 1));
	const exitPos   = edgePoint(exitEdge,  seededRand(sceneSeed + 2));

	gsap.set(ghost, { x: entryPos.x, y: entryPos.y, opacity: 1 });

	const pos = { x: entryPos.x, y: entryPos.y };

	const humanMove = (targetFn, beatSeed, travelDuration = 1.1) => {
		let fromX = pos.x, fromY = pos.y;
		let toX = 0, toY = 0;
		let cpX = 0, cpY = 0;

		const computeEndpoints = () => {
			fromX = pos.x;
			fromY = pos.y;
			const { x: tx, y: ty } = targetFn();
			toX = tx;
			toY = ty;
			const mx = (fromX + toX) / 2;
			const my = (fromY + toY) / 2;
			const dx = toX - fromX;
			const dy = toY - fromY;
			const len = Math.hypot(dx, dy) || 1;
			const nx = -dy / len;
			const ny = dx / len;
			const arcR = (seededRand(beatSeed) - 0.5) * 0.45 * len;
			cpX = mx + nx * arcR;
			cpY = my + ny * arcR;
		};

		const proxy = { t: 0 };
		return gsap.to(proxy, {
			t: 1,
			duration: travelDuration,
			ease: "power2.inOut",
			onStart: computeEndpoints,
			onUpdate: () => {
				const t = proxy.t;
				const jitterAmp = (1 - t) * 1.3 + 0.2;
				const jx = (seededRand(beatSeed + t * 17) - 0.5) * jitterAmp;
				const jy = (seededRand(beatSeed + t * 31 + 5) - 0.5) * jitterAmp;
				const x = qbez(fromX, cpX, toX, t) + jx;
				const y = qbez(fromY, cpY, toY, t) + jy;
				pos.x = x;
				pos.y = y;
				ghost.style.transform = `translate3d(${x}px,${y}px,0)`;
			},
		});
	};

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: section,
			start: "top top",
			// ends when the section's bottom reaches the viewport bottom — so
			// the pin's active range is exactly the section's explicit height
			// minus one viewport. the section sets its own height via inline
			// style (100 + height)vh, meaning no pinSpacing math is needed
			// and no race between adjacent pins can happen.
			end: "bottom bottom",
			pin: stage,
			pinSpacing: false,
			scrub: 0.4,
			anticipatePin: 1,
			invalidateOnRefresh: true,
		},
	});

	tl.add(humanMove(() => ({
		x: window.innerWidth  * (0.35 + seededRand(sceneSeed + 11) * 0.25),
		y: window.innerHeight * (0.35 + seededRand(sceneSeed + 13) * 0.25),
	}), sceneSeed + 101, 0.9));

	sequence.forEach(([iconId, winId], i) => {
		const icon = icons[iconId];
		const win = windows[winId];
		if (!icon || !win) return;

		tl.add(humanMove(() => {
			const r = icon.getBoundingClientRect();
			return {
				x: r.left + r.width / 2 - 2,
				y: r.top + r.height / 2 - 6,
			};
		}, sceneSeed + i * 37 + 13, 1.1 + seededRand(sceneSeed + i * 5) * 0.35));

		tl.to({}, { duration: 0.12 });

		// directional class toggle — survives scroll-back
		tl.to({}, {
			duration: 0.001,
			onStart: () => {
				icon.classList.add("clicked");
				zoomRect(icon, win);
			},
			onReverseComplete: () => {
				icon.classList.remove("clicked");
				gsap.set(win, { opacity: 0, scale: 0.96, xPercent: -50, yPercent: -50, transformOrigin: "0% 0%" });
			},
		});

		tl.to({}, { duration: 0.22 });

		tl.to({}, {
			duration: 0.001,
			onStart: () => { icon.classList.remove("clicked"); },
			onReverseComplete: () => { icon.classList.add("clicked"); },
		});

		tl.fromTo(win,
			{ opacity: 0, scale: 0.96, xPercent: -50, yPercent: -50 },
			{ opacity: 1, scale: 1, xPercent: -50, yPercent: -50, duration: 0.2, ease: "steps(4)", immediateRender: false }
		);
		tl.to({}, { duration: 0.45 + i * 0.08 });
	});

	tl.add(humanMove(() => exitPos, sceneSeed + 777, 0.85));
};

const ShowScene = ({ id, title, subtitle, sequence, height = 320, children, className = "" }) => {
	const section = useRef(null);
	const stage = useRef(null);
	const ghost = useRef(null);
	const icons = useRef({});
	const windows = useRef({});

	const registerIcon = (iid, el) => { icons.current[iid] = el; };
	const registerWindow = (wid, el) => { windows.current[wid] = el; };

	useLayoutEffect(() => {
		const mm = gsap.matchMedia();
		const root = gsap.context(() => {

			mm.add("(min-width: 901px)", () => {
				buildShow({
					section: section.current,
					stage: stage.current,
					ghost: ghost.current,
					icons: icons.current,
					windows: windows.current,
					sequence,
					height,
					id,
				});
			});

			mm.add("(max-width: 900px)", () => {
				// no cursor choreography on mobile — a ghost arrow on a touch
				// device reads as weird, and arcs over narrow panes just flicker
				gsap.set(ghost.current, { opacity: 0 });
				Object.values(icons.current).forEach((el) => { if (el) el.style.display = "none"; });
				sequence.forEach(([, wid]) => {
					const w = windows.current[wid];
					if (!w) return;
					gsap.set(w, { opacity: 0, y: 40 });
					gsap.to(w, {
						opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
						scrollTrigger: { trigger: w, start: "top 85%", toggleActions: "play none none none" },
					});
				});
			});
		}, section);

		// ScrollTrigger auto-refreshes on resize/orientationchange via its
		// default autoRefreshEvents — no custom listener needed, and multiple
		// per-scene listeners caused duplicate refreshes that desynced pins.
		return () => {
			root.revert();
			mm.revert();
		};
	}, [sequence, height, id]);

	return (
		<Ctx.Provider value={{ registerIcon, registerWindow }}>
			<section
				id={id}
				ref={section}
				className={`show-scene ${className}`}
				style={{ height: `${100 + height}vh` }}
			>
				<div ref={stage} className="show-stage">
					<div className="show-title-wrap">
						<h1 className="scene-title">
							{title}
							{subtitle && <small>{subtitle}</small>}
						</h1>
					</div>
					{children}

					<div ref={ghost} className="show-ghost" aria-hidden>
						<svg width="22" height="30" viewBox="0 0 12 18" shapeRendering="crispEdges">
							<path d="M1 1 L1 13 L4 10 L6 14 L8 13 L6 9 L10 9 Z" fill="#fff" />
							<path d="M1 1 L1 13 L4 10 L6 14 L8 13 L6 9 L10 9 Z" fill="none" stroke="#000" strokeWidth="1" strokeLinejoin="miter" />
						</svg>
					</div>
				</div>
			</section>
		</Ctx.Provider>
	);
};

export default ShowScene;
