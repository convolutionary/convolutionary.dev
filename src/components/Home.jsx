import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bio, tagline, links, stack, yearsIn, SINCE } from "../data/content";
import { useRepos } from "../data/useRepos";
import { useMailForm, MAX_LEN } from "../data/useMailForm";
import { Desktop, DesktopIcon, DesktopWindow, useDesktop } from "./desktop/Desktop";
import MenuBar from "./desktop/MenuBar";
import MacIcon from "./desktop/MacIcon";
import images from "./images";
import pfp from "../assets/discord/abjhfjljklks1.jpg";

export const PATTERNS = [
	{ id: "macos", label: "Mac OS Default" },
	{ id: "dither", label: "Dithered Sky" },
	{ id: "gray", label: "Classic Gray" },
	{ id: "teal", label: "Solid Teal" },
];

const logos = Object.fromEntries([...images.languages, ...images.frameworks].map((x) => [x.name, x.img]));
const toolCount = stack.slice(1).reduce((n, g) => n + g.items.length, 0);
const when = (iso) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

// ─── windows ─────────────────────────────────────────────────────────────

const ReadMe = () => (
	<DesktopWindow id="readme" title="Read Me" x={0.02} y={0.02} w={430} h={330}>
		<div className="st-doc">
			{bio.map((p, i) => <p key={i}>{p}</p>)}
			<hr />
			<p className="st-hint">
				Double-click an icon to open it (one tap on a phone). Drag windows by their title bar. The box on
				the left closes a window, the ones on the right zoom and collapse it.
			</p>
			<p className="st-hint">Special ▸ Shut Down takes you back to the manual.</p>
		</div>
	</DesktopWindow>
);

const Info = () => (
	<DesktopWindow id="info" title="Aurora Info" x={0.64} y={0.04} w={290} minW={260} kind="panel">
		<div className="gi">
			<div className="gi-head">
				<img src={pfp} alt="" width="40" height="40" />
				<b>Aurora</b>
			</div>
			<dl className="gi-rows">
				<dt>Kind:</dt><dd>software developer</dd>
				<dt>Where:</dt><dd>convolutionary.dev</dd>
				<dt>Created:</dt><dd>{SINCE}</dd>
				<dt>Modified:</dt><dd>{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</dd>
				<dt>Version:</dt><dd>{yearsIn()}.0, self-taught</dd>
			</dl>
			<p className="gi-label">Comments:</p>
			<div className="gi-comments">{tagline}</div>
			<label className="gi-lock"><input type="checkbox" checked disabled readOnly /> Locked</label>
		</div>
	</DesktopWindow>
);

const HD = ({ items }) => {
	const d = useDesktop();
	return (
		<DesktopWindow id="hd" title="Aurora HD" x={0.30} y={0.12} w={440} h={250} kind="finder" info={`${items.length} items`}>
			<div className="fi-grid">
				{items.map((it) => (
					<button key={it.id} type="button" className="fi-icon" onDoubleClick={() => d.open(it.id)} onKeyDown={(e) => e.key === "Enter" && d.open(it.id)} onClick={(e) => { if (window.matchMedia("(pointer: coarse)").matches) d.open(it.id); else e.currentTarget.focus(); }}>
						<MacIcon name={it.icon} />
						<span>{it.label}</span>
					</button>
				))}
			</div>
		</DesktopWindow>
	);
};

const cols = [
	{ key: "name", label: "Name", get: (r) => r.name.toLowerCase() },
	{ key: "date", label: "Date Modified", get: (r) => -new Date(r.pushed_at) },
	{ key: "kind", label: "Kind", get: (r) => (r.language || "~").toLowerCase() },
	{ key: "stars", label: "Stars", get: (r) => -r.stargazers_count },
];

const Projects = () => {
	const { status, repos } = useRepos();
	const [by, setBy] = useState("date");
	const col = cols.find((c) => c.key === by);
	const rows = [...repos].sort((a, b) => (col.get(a) < col.get(b) ? -1 : col.get(a) > col.get(b) ? 1 : 0));

	const info = status === "ok" ? `${repos.length} items, read live from GitHub` : status === "loading" ? "Reading…" : "0 items";

	return (
		<DesktopWindow id="projects" title="Projects" x={0.20} y={0.62} w={600} h={300} minW={380} kind="finder" info={info}>
			{status === "loading" && <p className="fl-msg">Reading the disk…</p>}
			{status === "error" && (
				<p className="fl-msg">GitHub didn't answer, probably a rate limit. <a href="https://github.com/convolutionary" target="_blank" rel="noopener noreferrer">Open the list on GitHub</a>.</p>
			)}
			{status === "empty" && <p className="fl-msg">No public repositories.</p>}
			{status === "ok" && (
				<table className="fl">
					<thead>
						<tr>
							{cols.map((c) => (
								<th key={c.key} scope="col" className={by === c.key ? "is-sort" : undefined} aria-sort={by === c.key ? "ascending" : "none"}>
									<button type="button" onClick={() => setBy(c.key)}>{c.label}</button>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map((r) => (
							<tr key={r.id}>
								<th scope="row">
									<a href={r.html_url} target="_blank" rel="noopener noreferrer">
										<MacIcon name="folder" width="18" height="15" aria-hidden="true" />
										{r.name}
									</a>
									{r.description && <span className="fl-desc">{r.description}</span>}
								</th>
								<td>{when(r.pushed_at)}</td>
								<td>{r.language || "—"}</td>
								<td className="fl-num">{r.stargazers_count}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</DesktopWindow>
	);
};

const Extensions = ({ onRestart }) => {
	const all = stack.flatMap((g) => g.items);
	const [on, setOn] = useState(() => new Set(all));
	const [shut, setShut] = useState(() => new Set());

	const flip = (set, setter, k) => {
		const n = new Set(set);
		n.has(k) ? n.delete(k) : n.add(k);
		setter(n);
	};

	return (
		<DesktopWindow id="extensions" title="Extensions Manager" x={0.56} y={0.40} w={420} h={380} minW={340} kind="panel"
			status={<><span>{on.size} of {all.length} items enabled</span><span className="em-btns"><button type="button" className="btn" onClick={() => setOn(new Set(all))}>Revert</button><button type="button" className="btn btn-primary" onClick={onRestart}>Restart</button></span></>}
		>
			<div className="em">
				<div className="em-head"><span>On/Off</span><span>Name</span><span>Items</span></div>
				{stack.map((g) => {
					const open = !shut.has(g.label);
					return (
						<div key={g.label} className="em-group">
							<button type="button" className="em-folder" aria-expanded={open} onClick={() => flip(shut, setShut, g.label)}>
								<span className={`tri${open ? " is-open" : ""}`} aria-hidden="true" />
								<MacIcon name="folder" width="18" height="15" aria-hidden="true" />
								<b>{g.label}</b>
								<span className="em-n">{g.items.length}</span>
							</button>
							{open && g.items.map((it) => (
								<label key={it} className="em-row">
									<input type="checkbox" checked={on.has(it)} onChange={() => flip(on, setOn, it)} />
									{logos[it] ? <img src={logos[it]} alt="" width="16" height="16" /> : <span className="em-noimg" />}
									<span>{it}</span>
								</label>
							))}
						</div>
					);
				})}
			</div>
		</DesktopWindow>
	);
};

const Bookmarks = () => (
	<DesktopWindow id="links" title="Bookmarks" x={0.08} y={0.78} w={470} h={170} kind="finder" info={`${links.length} items`}>
		<div className="fi-grid">
			{links.map((l) => (
				<a key={l.id} className="fi-icon is-alias" href={l.url} target="_blank" rel="noopener noreferrer">
					<MacIcon name={l.id === "email" ? "letter" : "globe"} />
					<span>{l.label}</span>
				</a>
			))}
		</div>
	</DesktopWindow>
);

const Mail = () => {
	const { form, upd, send, sent, setSent, sending, err } = useMailForm();
	return (
		<DesktopWindow id="mail" title="New Message" x={0.42} y={0.22} w={460} minW={360} kind="dialog">
			{sent ? (
				<div className="dlg-done">
					<MacIcon name="letter" />
					<div>
						<p><b>Your message was sent.</b></p>
						<p>It's in my inbox now. I'll get back to you soon.</p>
						<button type="button" className="btn btn-primary" onClick={() => setSent(false)}>OK</button>
					</div>
				</div>
			) : (
				<form className="dlg-form" onSubmit={send} noValidate>
					<span className="dlg-lbl">To:</span>
					<span className="dlg-static">Aurora &lt;cerfnet@anche.no&gt;</span>
					<label htmlFor="d-name">From:</label>
					<input id="d-name" name="name" className="os-input" placeholder="your name" autoComplete="name" value={form.name} onChange={upd} disabled={sending} />
					<label htmlFor="d-email">Reply to:</label>
					<input id="d-email" name="email" type="email" className="os-input" placeholder="you@example.com" autoComplete="email" value={form.email} onChange={upd} disabled={sending} />
					<textarea aria-label="Message" name="message" className="os-textarea dlg-msg" rows={7} maxLength={MAX_LEN} value={form.message} onChange={upd} disabled={sending} />
					<div className="hp" aria-hidden="true">
						<input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={upd} />
					</div>
					<div className="dlg-foot">
						<span className="dlg-err" role="alert">{err}</span>
						<span className="dlg-count">{form.message.length}/{MAX_LEN}</span>
						<button type="submit" className="btn btn-primary" disabled={sending}>{sending ? "Sending…" : "Send"}</button>
					</div>
				</form>
			)}
		</DesktopWindow>
	);
};

const Trash = ({ full }) => (
	<DesktopWindow id="trash" title="Trash" x={0.78} y={0.92} w={380} h={200} kind="finder" info={full ? "1 item" : "0 items"}>
		{full ? (
			<div className="fi-grid">
				<span className="fi-icon fi-wide" title="Placeholder post, thrown out during the redesign">
					<MacIcon name="simpletext" />
					<span>first blog post (idk what to put here).txt</span>
				</span>
			</div>
		) : (
			<p className="fl-msg">The Trash is empty.</p>
		)}
	</DesktopWindow>
);

const About = () => {
	const max = Math.max(...stack.map((g) => g.items.length));
	return (
		<DesktopWindow id="about" title="About This Computer" x={0.34} y={0.06} w={460} kind="panel">
			<div className="atc">
				<div className="atc-top">
					<MacIcon name="mac" width="64" height="51" aria-hidden="true" />
					<div>
						<p className="atc-os">aurora OS {yearsIn()}.0</p>
						<p>In service since {SINCE}</p>
						<p>{stack[0].items.length} languages, {toolCount} frameworks and tools</p>
					</div>
				</div>
				<table className="atc-mem">
					<thead><tr><th scope="col">Stack</th><th scope="col">Items</th><th scope="col"><span className="sr-only">share</span></th></tr></thead>
					<tbody>
						{stack.map((g) => (
							<tr key={g.label}>
								<th scope="row"><MacIcon name="folder" width="16" height="13" aria-hidden="true" /> {g.label}</th>
								<td>{g.items.length}</td>
								<td><span className="atc-bar"><span style={{ width: `${(g.items.length / max) * 100}%` }} /></span></td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</DesktopWindow>
	);
};

const Appearance = ({ pattern, setPattern }) => (
	<DesktopWindow id="appearance" title="Appearance" x={0.50} y={0.30} w={380} kind="panel">
		<fieldset className="ap">
			<legend>Desktop pattern</legend>
			<div className="ap-list">
				{PATTERNS.map((p) => (
					<label key={p.id} className={`ap-opt${pattern === p.id ? " is-on" : ""}`}>
						<input type="radio" name="pattern" value={p.id} checked={pattern === p.id} onChange={() => setPattern(p.id)} />
						<span className={`ap-swatch pat-${p.id}`} aria-hidden="true" />
						<span>{p.label}</span>
					</label>
				))}
			</div>
		</fieldset>
	</DesktopWindow>
);

// ─── the desktop ─────────────────────────────────────────────────────────

const deskItems = [
	{ id: "readme", label: "Read Me", icon: "simpletext" },
	{ id: "info", label: "Aurora Info", icon: "card" },
	{ id: "projects", label: "Projects", icon: "folder" },
	{ id: "extensions", label: "Extensions", icon: "puzzle" },
	{ id: "links", label: "Bookmarks", icon: "book" },
	{ id: "mail", label: "Mail", icon: "letter" },
];
const hdItems = [...deskItems, { id: "about", label: "About This Computer", icon: "mac" }, { id: "appearance", label: "Appearance", icon: "controls" }];

const Menus = ({ onRestart, trashFull, emptyTrash }) => {
	const d = useDesktop();
	const nav = useNavigate();
	const menus = [
		{ id: "aurora", label: "aurora.", bold: true, items: [
			{ label: "About This Computer", run: () => d.open("about") },
			{ sep: true },
			{ label: "Appearance…", run: () => d.open("appearance") },
			{ label: "Bookmarks", run: () => d.open("links") },
			{ sep: true },
			{ label: "Back to the Manual", run: () => nav("/") },
		] },
		{ id: "file", label: "File", items: [
			{ label: "New Message", run: () => d.open("mail") },
			{ label: "Open", off: !d.sel, run: () => d.sel && d.open(d.sel) },
			{ label: "Close Window", off: !d.front, run: () => d.front && d.close(d.front) },
			{ sep: true },
			{ label: "Get Info", run: () => d.open("info") },
		] },
		{ id: "edit", label: "Edit", items: ["Undo", "Cut", "Copy", "Paste", "Clear"].map((l) => ({ label: l, off: true })) },
		{ id: "view", label: "View", items: [
			{ label: "Collapse All Windows", off: !d.front, run: () => Object.keys(d.wins).forEach((id) => d.patch(id, { shade: true })) },
			{ label: "Expand All Windows", off: !d.front, run: () => Object.keys(d.wins).forEach((id) => d.patch(id, { shade: false })) },
			{ label: "Close All Windows", off: !d.front, run: d.closeAll },
		] },
		{ id: "special", label: "Special", items: [
			{ label: "Empty Trash", off: !trashFull, run: emptyTrash },
			{ sep: true },
			{ label: "Restart", run: onRestart },
			{ label: "Shut Down", run: () => nav("/") },
		] },
	];
	return <MenuBar menus={menus} />;
};

const Home = ({ onRestart, pattern, setPattern }) => {
	const [trashFull, setTrashFull] = useState(true);

	return (
		<Desktop initial={["readme"]}>
			<Menus onRestart={onRestart} trashFull={trashFull} emptyTrash={() => setTrashFull(false)} />

			<div className="desk-icons">
				<DesktopIcon id="hd" label="Aurora HD" icon="disk" />
				{deskItems.map((it) => <DesktopIcon key={it.id} {...it} />)}
			</div>
			<div className="desk-trash">
				<DesktopIcon id="trash" label="Trash" icon={trashFull ? "trashFull" : "trash"} />
			</div>

			<ReadMe />
			<Info />
			<HD items={hdItems} />
			<Projects />
			<Extensions onRestart={onRestart} />
			<Bookmarks />
			<Mail />
			<Trash full={trashFull} />
			<About />
			<Appearance pattern={pattern} setPattern={setPattern} />
		</Desktop>
	);
};

export default Home;
