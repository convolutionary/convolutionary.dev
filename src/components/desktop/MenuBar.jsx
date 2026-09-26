import React, { useEffect, useRef, useState } from "react";

const clock = () =>
	new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

// menus: [{ id, label, items: [{ label, run, off, sep }] }]
const MenuBar = ({ menus }) => {
	const [openId, setOpenId] = useState(null);
	const [time, setTime] = useState(clock);
	const bar = useRef(null);

	useEffect(() => {
		const t = setInterval(() => setTime(clock()), 15_000);
		return () => clearInterval(t);
	}, []);

	useEffect(() => {
		if (!openId) return;
		const away = (e) => { if (!bar.current?.contains(e.target)) setOpenId(null); };
		const esc = (e) => { if (e.key === "Escape") setOpenId(null); };
		window.addEventListener("pointerdown", away);
		window.addEventListener("keydown", esc);
		return () => {
			window.removeEventListener("pointerdown", away);
			window.removeEventListener("keydown", esc);
		};
	}, [openId]);

	const pick = (it) => {
		if (it.off) return;
		setOpenId(null);
		it.run?.();
	};

	return (
		<nav className="menubar" ref={bar} aria-label="Menu bar">
			<ul className="menubar-menus" role="menubar">
				{menus.map((m) => (
					<li key={m.id} className="mb-menu" role="none">
						<button
							type="button"
							role="menuitem"
							aria-haspopup="true"
							aria-expanded={openId === m.id}
							className={`menubar-item${m.bold ? " bold" : ""}${openId === m.id ? " is-open" : ""}`}
							onPointerDown={(e) => { e.preventDefault(); setOpenId(openId === m.id ? null : m.id); }}
							onPointerEnter={() => { if (openId && openId !== m.id) setOpenId(m.id); }}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
									e.preventDefault();
									setOpenId(m.id);
									requestAnimationFrame(() => bar.current?.querySelector(".mb-drop button:not(:disabled)")?.focus());
								}
							}}
						>
							{m.label}
						</button>
						{openId === m.id && (
							<ul className="mb-drop" role="menu" aria-label={m.id}>
								{m.items.map((it, i) =>
									it.sep ? (
										<li key={i} className="mb-sep" role="separator" />
									) : (
										<li key={i} role="none">
											<button
												type="button"
												role="menuitem"
												disabled={it.off}
												onPointerUp={() => pick(it)}
												onKeyDown={(e) => {
													if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(it); }
													if (e.key === "ArrowDown" || e.key === "ArrowUp") {
														e.preventDefault();
														const all = [...bar.current.querySelectorAll(".mb-drop button:not(:disabled)")];
														const n = all.indexOf(e.currentTarget) + (e.key === "ArrowDown" ? 1 : -1);
														all[(n + all.length) % all.length]?.focus();
													}
												}}
											>
												{it.label}
											</button>
										</li>
									)
								)}
							</ul>
						)}
					</li>
				))}
			</ul>
			<div className="menubar-right">
				<span className="menubar-clock" aria-label={`Time: ${time}`}>{time}</span>
				<span className="menubar-app"><span className="menubar-app-ico" aria-hidden="true" />Finder</span>
			</div>
		</nav>
	);
};

export default MenuBar;
