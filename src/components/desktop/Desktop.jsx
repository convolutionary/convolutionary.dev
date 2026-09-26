import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { zoomRect } from "../../utils/zoomRect";
import MacIcon from "./MacIcon";

// tiny platinum window manager. state per window: { z, x, y, w, h, shade, zoom }
const Ctx = createContext(null);
export const useDesktop = () => useContext(Ctx);

const MENU_H = 20;
const narrow = () => window.matchMedia("(max-width: 700px)").matches;
const touchy = () => window.matchMedia("(pointer: coarse)").matches;

export const Desktop = ({ children, initial = [] }) => {
	const [wins, setWins] = useState({});
	const [sel, setSel] = useState(null);
	const z = useRef(10);
	const icons = useRef({});
	const defs = useRef({}); // default geometry, registered by each window
	const els = useRef({});
	const pendingZoom = useRef(new Set());

	const open = useCallback((id, { animate = true } = {}) => {
		setWins((prev) => {
			if (prev[id]) return { ...prev, [id]: { ...prev[id], z: ++z.current, shade: false } };
			const raw = defs.current[id] || { x: 40, y: 40, w: 420 };
			// x/y <= 1 are fractions of the free desktop (minus the icon column)
			const fx = (v) => (v <= 1 ? Math.round(v * Math.max(0, window.innerWidth - 110 - raw.w)) : v);
			const fy = (v) => (v <= 1 ? Math.round(MENU_H + 8 + v * Math.max(0, window.innerHeight - MENU_H - 40 - (raw.h || 320))) : v);
			const d = { ...raw, x: fx(raw.x), y: fy(raw.y) };
			// keep new windows on screen, cascade if something already sits there
			const taken = Object.values(prev).some((w) => w.x === d.x && w.y === d.y);
			const off = taken ? 22 : 0;
			const maxX = Math.max(8, window.innerWidth - d.w - 8);
			if (animate) pendingZoom.current.add(id);
			return {
				...prev,
				[id]: {
					z: ++z.current,
					x: Math.min(d.x + off, maxX),
					y: d.y + off,
					w: d.w,
					h: d.h,
					shade: false,
					zoom: false,
				},
			};
		});
	}, []);

	const close = useCallback((id) => {
		const done = () => setWins((prev) => {
			const next = { ...prev };
			delete next[id];
			return next;
		});
		const el = els.current[id];
		const icon = icons.current[id];
		if (el && icon && !narrow()) zoomRect(el, icon, done);
		else done();
	}, []);

	const focus = useCallback((id) => {
		setWins((prev) => {
			if (!prev[id]) return prev;
			if (prev[id].z === z.current) return prev; // already in front
			return { ...prev, [id]: { ...prev[id], z: ++z.current } };
		});
	}, []);

	const patch = useCallback((id, p) => {
		setWins((prev) => (prev[id] ? { ...prev, [id]: { ...prev[id], ...p } } : prev));
	}, []);

	const closeAll = useCallback(() => setWins({}), []);

	// open whatever the caller wants up after boot, without the zoom
	useEffect(() => {
		initial.forEach((id) => open(id, { animate: false }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const front = Object.entries(wins).sort((a, b) => b[1].z - a[1].z)[0]?.[0] || null;

	const ctx = {
		wins, front, sel, setSel, open, close, focus, patch, closeAll,
		icons, defs, els, pendingZoom,
	};

	return (
		<Ctx.Provider value={ctx}>
			<div
				className="desktop-surface"
				onPointerDown={(e) => { if (e.target === e.currentTarget) setSel(null); }}
			>
				{children}
			</div>
		</Ctx.Provider>
	);
};

export const DesktopIcon = ({ id, label, icon = "folder", alias = false, onOpen }) => {
	const ctx = useDesktop();
	const ref = useRef(null);
	const selected = ctx.sel === id;

	useEffect(() => { ctx.icons.current[id] = ref.current; }, [ctx.icons, id]);

	const go = () => (onOpen ? onOpen() : ctx.open(id));

	return (
		<button
			ref={ref}
			type="button"
			className={`desk-icon${selected ? " is-sel" : ""}${alias ? " is-alias" : ""}`}
			onClick={() => { ctx.setSel(id); if (touchy()) go(); }}
			onDoubleClick={go}
			onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); go(); } }}
			aria-label={`${label}. Double-click or press Enter to open`}
		>
			<MacIcon name={icon} />
			<span className="desk-icon-label">{label}</span>
		</button>
	);
};

export const DesktopWindow = ({
	id, title, x = 40, y = 40, w = 420, h, minW = 240, minH = 120,
	kind = "doc", status, info, children,
}) => {
	const ctx = useDesktop();
	const ref = useRef(null);
	const st = ctx.wins[id];
	const active = ctx.front === id;

	ctx.defs.current[id] = { x, y, w, h };

	useLayoutEffect(() => {
		if (!st) return;
		ctx.els.current[id] = ref.current;
		if (ctx.pendingZoom.current.has(id)) {
			ctx.pendingZoom.current.delete(id);
			const icon = ctx.icons.current[id];
			const el = ref.current;
			if (icon && el && !narrow()) {
				el.style.visibility = "hidden";
				zoomRect(icon, el, () => { el.style.visibility = ""; });
			} else if (el && narrow()) {
				// stacked layout — the new window might be way down the page
				el.scrollIntoView({ block: "start", behavior: "smooth" });
			}
		}
	}, [st, id, ctx.els, ctx.pendingZoom, ctx.icons]);

	if (!st) return null;

	// shared pointer-drag helper: fn gets dx/dy, commit writes final state
	const drag = (e, onMove, onEnd) => {
		if (e.button !== 0 || narrow()) return;
		e.preventDefault();
		ctx.focus(id);
		const sx = e.clientX, sy = e.clientY;
		const target = e.currentTarget;
		target.setPointerCapture(e.pointerId);
		const move = (ev) => onMove(ev.clientX - sx, ev.clientY - sy);
		const up = (ev) => {
			target.removeEventListener("pointermove", move);
			target.removeEventListener("pointerup", up);
			target.removeEventListener("pointercancel", up);
			onEnd(ev.clientX - sx, ev.clientY - sy);
		};
		target.addEventListener("pointermove", move);
		target.addEventListener("pointerup", up);
		target.addEventListener("pointercancel", up);
	};

	const clampPos = (nx, ny) => [
		Math.min(Math.max(nx, 40 - st.w), window.innerWidth - 40),
		Math.min(Math.max(ny, MENU_H + 2), window.innerHeight - 24),
	];

	const onTitleDown = (e) => {
		if (e.target.closest(".wbox")) return;
		const el = ref.current;
		drag(e,
			(dx, dy) => {
				const [nx, ny] = clampPos(st.x + dx, st.y + dy);
				el.style.left = `${nx}px`;
				el.style.top = `${ny}px`;
			},
			(dx, dy) => {
				const [nx, ny] = clampPos(st.x + dx, st.y + dy);
				ctx.patch(id, { x: nx, y: ny, zoom: false });
			});
	};

	const onGrowDown = (e) => {
		const el = ref.current;
		const bw = el.offsetWidth, bh = el.offsetHeight;
		drag(e,
			(dx, dy) => {
				el.style.width = `${Math.max(minW, bw + dx)}px`;
				el.style.height = `${Math.max(minH, bh + dy)}px`;
			},
			(dx, dy) => ctx.patch(id, { w: Math.max(minW, bw + dx), h: Math.max(minH, bh + dy), zoom: false }));
	};

	const zoomed = st.zoom;
	const style = zoomed
		? { left: 6, top: MENU_H + 6, width: `calc(100vw - 12px - 84px)`, height: `calc(100vh - ${MENU_H + 12}px)`, zIndex: st.z }
		: { left: st.x, top: st.y, width: st.w, height: st.shade ? undefined : st.h, zIndex: st.z };

	return (
		<section
			ref={ref}
			className={`pw pw-${kind}${active ? " is-active" : ""}${st.shade ? " is-shade" : ""}`}
			style={style}
			onPointerDown={() => ctx.focus(id)}
			aria-label={title}
		>
			<header className="pw-title" onPointerDown={onTitleDown} onDoubleClick={() => ctx.patch(id, { shade: !st.shade })}>
				<button type="button" className="wbox wbox-close" onClick={() => ctx.close(id)} aria-label={`Close ${title}`} />
				<h2 className="pw-name"><span>{title}</span></h2>
				<button type="button" className="wbox wbox-zoom" onClick={() => ctx.patch(id, { zoom: !zoomed, shade: false })} aria-label={zoomed ? "Restore size" : "Zoom window"} />
				<button type="button" className="wbox wbox-shade" onClick={() => ctx.patch(id, { shade: !st.shade })} aria-label={st.shade ? "Expand window" : "Collapse window"} />
			</header>
			{!st.shade && (
				<>
					{info && <div className="pw-info">{info}</div>}
					<div className="pw-body">{children}</div>
					{status !== undefined && <footer className="pw-status">{status}</footer>}
					<span className="pw-grow" onPointerDown={onGrowDown} aria-hidden="true" />
				</>
			)}
		</section>
	);
};
