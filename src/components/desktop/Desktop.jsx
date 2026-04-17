import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { zoomRect } from "../../utils/zoomRect";
import MacIcon from "./MacIcon";

const Ctx = createContext(null);

const STACK_OFFSET = 24;

export const Desktop = ({ children }) => {
	// windowId -> { stack, z, dx, dy } — dx/dy is drag offset on top of stack
	const [open, setOpen] = useState({});
	const nextZ = useRef(10);
	const iconRefs = useRef({});
	const winRefs = useRef({});

	const registerIcon = useCallback((id, el) => { iconRefs.current[id] = el; }, []);
	const registerWindow = useCallback((id, el) => { winRefs.current[id] = el; }, []);

	const openWindow = useCallback((id) => {
		setOpen((prev) => {
			if (prev[id]) {
				return { ...prev, [id]: { ...prev[id], z: ++nextZ.current } };
			}
			const icon = iconRefs.current[id];
			const win = winRefs.current[id];
			if (icon && win) {
				win.style.visibility = "hidden";
				win.style.display = "flex";
				requestAnimationFrame(() => {
					zoomRect(icon, win);
					win.style.visibility = "";
				});
			}
			const count = Object.keys(prev).length;
			return {
				...prev,
				[id]: { stack: count, z: ++nextZ.current, dx: 0, dy: 0 },
			};
		});
	}, []);

	const closeWindow = useCallback((id) => {
		const icon = iconRefs.current[id];
		const win = winRefs.current[id];
		if (icon && win) zoomRect(win, icon);
		setTimeout(() => {
			setOpen((prev) => {
				const next = { ...prev };
				delete next[id];
				return next;
			});
		}, 150);
	}, []);

	const focusWindow = useCallback((id) => {
		setOpen((prev) => {
			if (!prev[id]) return prev;
			return { ...prev, [id]: { ...prev[id], z: ++nextZ.current } };
		});
	}, []);

	// called with relative deltas during a drag — we commit to state on drag end
	// to avoid React rerenders per mousemove
	const moveWindow = useCallback((id, dx, dy) => {
		setOpen((prev) => {
			if (!prev[id]) return prev;
			return { ...prev, [id]: { ...prev[id], dx, dy } };
		});
	}, []);

	return (
		<Ctx.Provider value={{ open, openWindow, closeWindow, focusWindow, moveWindow, registerIcon, registerWindow }}>
			<div className="desktop-surface">{children}</div>
		</Ctx.Provider>
	);
};

const useDesktop = () => useContext(Ctx);

export const DesktopIcon = ({ id, label, icon = "folder" }) => {
	const ctx = useDesktop();
	const ref = useRef(null);

	useEffect(() => {
		if (ctx) ctx.registerIcon(id, ref.current);
	}, [ctx, id]);

	const trigger = () => {
		ctx?.openWindow(id);
		ref.current?.blur();
	};

	return (
		<button
			ref={ref}
			type="button"
			className="desk-icon"
			onDoubleClick={trigger}
			onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); trigger(); } }}
			aria-label={`Open ${label}`}
		>
			<MacIcon name={icon} />
			<span className="desk-icon-label">{label}</span>
		</button>
	);
};

export const DesktopWindow = ({ id, title, width = 480, children, bodyStyle = {} }) => {
	const ctx = useDesktop();
	const ref = useRef(null);
	const state = ctx?.open[id];

	useEffect(() => {
		if (ctx) ctx.registerWindow(id, ref.current);
	}, [ctx, id]);

	// drag handlers — mousedown on title bar, track via window listeners.
	// we write the transform directly to the element during drag, and only
	// commit the final dx/dy to context state on mouseup. keeps the drag at
	// 60fps regardless of how expensive the rest of the tree is.
	const onTitleMouseDown = (e) => {
		if (e.button !== 0) return;
		// ignore close box clicks
		if (e.target.closest(".win-close")) return;
		e.preventDefault();

		const el = ref.current;
		if (!el) return;
		ctx?.focusWindow(id);

		const startX = e.clientX;
		const startY = e.clientY;
		const startDx = state?.dx ?? 0;
		const startDy = state?.dy ?? 0;
		const baseStack = (state?.stack ?? 0) * STACK_OFFSET;

		const onMove = (ev) => {
			const nx = startDx + (ev.clientX - startX);
			const ny = startDy + (ev.clientY - startY);
			el.style.transform = `translate(${baseStack + nx}px, ${baseStack + ny}px)`;
		};
		const onUp = (ev) => {
			window.removeEventListener("mousemove", onMove);
			window.removeEventListener("mouseup", onUp);
			const fx = startDx + (ev.clientX - startX);
			const fy = startDy + (ev.clientY - startY);
			ctx?.moveWindow(id, fx, fy);
		};
		window.addEventListener("mousemove", onMove);
		window.addEventListener("mouseup", onUp);
	};

	const w = typeof width === "number" ? `${width}px` : width;
	const visible = !!state;
	const stack = state?.stack ?? 0;
	const dx = state?.dx ?? 0;
	const dy = state?.dy ?? 0;
	const z = state?.z ?? 1;
	const baseStack = stack * STACK_OFFSET;

	return (
		<div
			ref={ref}
			className="desk-window win"
			style={{
				width: w,
				display: visible ? "flex" : "none",
				transform: `translate(${baseStack + dx}px, ${baseStack + dy}px)`,
				zIndex: z,
			}}
			onMouseDown={() => ctx?.focusWindow(id)}
		>
			<div className="win-title" onMouseDown={onTitleMouseDown}>
				<button
					type="button"
					className="win-close"
					onClick={(e) => { e.stopPropagation(); ctx?.closeWindow(id); }}
					onMouseDown={(e) => e.stopPropagation()}
					aria-label="Close"
				>
					<div className="win-close-inner" />
				</button>
				<span>{title}</span>
			</div>
			<div className="win-body" style={bodyStyle}>{children}</div>
		</div>
	);
};
