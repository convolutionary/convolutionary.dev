import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { bio, tagline, links, stack, yearsIn, SINCE } from "../data/content";
import { useRepos } from "../data/useRepos";
import { useMailForm, MAX_LEN } from "../data/useMailForm";
import { zoomRect } from "../utils/zoomRect";
import portrait from "../assets/manual/portrait-1bit.png";
import desktopShot from "../assets/manual/desktop-1bit.png";
import pgp from "../pgp.txt";
import NotFound from "../components/NotFound";
import "./manual.css";

const toc = [
	{ n: "1", id: "about", title: "About" },
	{ n: "2", id: "specs", title: "Specs" },
	{ n: "3", id: "projects", title: "Projects" },
	{ n: "4", id: "contact", title: "Contact" },
	{ n: "A", id: "appendix", title: "Desktop" },
];

const index = [
	["Codeberg", [["4", "#contact"]]],
	["contact form", [["4", "#send"]]],
	["desktop, Macintosh-style", [["A", "#appendix"]]],
	["email", [["4", "#contact"]]],
	["GitHub", [["3", "#projects"], ["4", "#contact"]]],
	["Go", [["2", "#specs"]]],
	["languages", [["2", "#specs"]]],
	["PGP key", [["4", "#contact"]]],
	["projects", [["3", "#projects"]]],
	["React", [["2", "#specs"]]],
	["Rust", [["2", "#specs"]]],
	["self-taught", [["1", "#about"]]],
	["TypeScript", [["2", "#specs"]]],
	["X (Twitter)", [["4", "#contact"]]],
];

// every in-page target is a route (#/projects), since the hash belongs to the router
const SECTIONS = new Set(["about", "specs", "projects", "contact", "send", "appendix", "index"]);

const when = (iso) =>
	new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });

const Chapter = ({ n, id, title, note, children }) => (
	<section className="ch" id={id} aria-labelledby={`${id}-h`}>
		<div className="ch-margin">
			<span className="ch-num" aria-hidden="true">{n}</span>
			{note && <div className="ch-note">{note}</div>}
		</div>
		<div className="ch-body">
			<h2 className="ch-title" id={`${id}-h`}>
				<span className="sr-only">{/^\d+$/.test(n) ? `Chapter ${n}: ` : `Appendix ${n}: `}</span>
				{title}
			</h2>
			{children}
		</div>
	</section>
);

const Repos = () => {
	const { status, repos } = useRepos();

	if (status === "loading") return <p className="caption" role="status">Reading the list from GitHub…</p>;
	if (status === "error") return (
		<p className="caption" role="status">
			GitHub didn't answer, most likely a rate limit. The full list is at{" "}
			<a href="https://github.com/convolutionary">github.com/convolutionary</a>.
		</p>
	);
	if (status === "empty") return <p className="caption">No public repositories at the moment.</p>;

	const shown = repos.slice(0, 10);
	return (
		<>
			<table className="tbl repos">
				<caption className="caption">
					<b>Table 3-1</b>&ensp;Public repositories, most recently pushed first. Read live from GitHub.
				</caption>
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Description</th>
						<th scope="col">Language</th>
						<th scope="col" className="num">Updated</th>
						<th scope="col" className="num"><span aria-label="Stars">Stars</span></th>
					</tr>
				</thead>
				<tbody>
					{shown.map((r) => (
						<tr key={r.id}>
							<th scope="row"><a href={r.html_url}>{r.name}</a></th>
							<td className="desc">{r.description || <span className="dim">No description.</span>}</td>
							<td>{r.language || <span className="dim">n/a</span>}</td>
							<td className="num">{when(r.pushed_at)}</td>
							<td className="num">{r.stargazers_count}<span className="unit">{r.stargazers_count === 1 ? " star" : " stars"}</span></td>
						</tr>
					))}
				</tbody>
			</table>
			{repos.length > shown.length && (
				<p className="after-tbl">
					{repos.length - shown.length} more on{" "}
					<a href="https://github.com/convolutionary?tab=repositories">GitHub</a>.
				</p>
			)}
		</>
	);
};

const MailForm = () => {
	const { form, upd, send, sent, setSent, sending, err } = useMailForm();

	if (sent) return (
		<div className="done" role="status">
			<p><b>Sent.</b> It's in my inbox now, and I'll get back to you soon.</p>
			<button type="button" className="mac-btn" onClick={() => setSent(false)}>Write another</button>
		</div>
	);

	return (
		<form className="proc" onSubmit={send} noValidate>
			<ol>
				<li>
					<label htmlFor="f-name">Type your name.</label>
					<input id="f-name" name="name" className="mac-field" autoComplete="name" value={form.name} onChange={upd} disabled={sending} />
				</li>
				<li>
					<label htmlFor="f-email">Type the address you'd like the reply sent to.</label>
					<input id="f-email" name="email" type="email" className="mac-field" autoComplete="email" spellCheck="false" value={form.email} onChange={upd} disabled={sending} />
				</li>
				<li>
					<label htmlFor="f-msg">Write your message.</label>
					<textarea id="f-msg" name="message" className="mac-field" rows={6} maxLength={MAX_LEN} value={form.message} onChange={upd} disabled={sending} aria-describedby="f-count" />
					<span className="count" id="f-count">{form.message.length} of {MAX_LEN} characters</span>
				</li>
				<li>
					<span className="step">Click Send.</span>
					<div className="send-row">
						<button type="submit" className="mac-btn mac-btn-default" disabled={sending}>
							{sending ? "Sending…" : "Send"}
						</button>
						{err && <p className="err" role="alert">{err}</p>}
					</div>
				</li>
			</ol>

			{/* honeypot — hidden from humans, bots fill it and get dropped */}
			<div className="hp" aria-hidden="true">
				<label>Website (leave blank)
					<input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={upd} />
				</label>
			</div>
		</form>
	);
};

const Manual = () => {
	const nav = useNavigate();
	const { section } = useParams();
	const loc = useLocation();
	const known = !section || SECTIONS.has(section);

	// scroll to the section named in the route. loc.key changes on every click,
	// so hitting the same link twice still scrolls
	useEffect(() => {
		if (!known) return;
		const first = loc.key === "default"; // fresh page load: jump, don't glide
		const calm = first || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const behavior = calm ? "auto" : "smooth";
		if (!section) {
			if (!first) window.scrollTo({ top: 0, behavior });
			return;
		}
		const go = () => document.getElementById(section)?.scrollIntoView({ behavior, block: "start" });
		go();
		if (!first) return;

		// deep link on a cold load: fonts and the repo table land after we scroll and
		// shove the target down. keep re-anchoring until the page settles or the user takes over
		const ro = new ResizeObserver(go);
		ro.observe(document.body);
		const quit = () => {
			ro.disconnect();
			["wheel", "touchstart", "keydown", "pointerdown"].forEach((ev) => window.removeEventListener(ev, quit));
		};
		["wheel", "touchstart", "keydown", "pointerdown"].forEach((ev) => window.addEventListener(ev, quit, { passive: true }));
		const t = setTimeout(quit, 2500);
		return () => { clearTimeout(t); quit(); };
	}, [section, loc.key, known]);
	const figRef = useRef(null);
	const fullRef = useRef(null);

	const startUp = () => {
		const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (calm) return nav("/desktop");
		zoomRect(figRef.current, fullRef.current, () => nav("/desktop"));
	};

	const year = new Date().getFullYear();

	if (!known) return <NotFound />;

	return (
		<div className="man">
			<Link className="skip" to="/about">Skip to contents</Link>

			<header className="run">
				<Link to="/" className="run-mark">Aurora</Link>
				<nav aria-label="Contents">
					<ul>
						{toc.map((c) => (
							<li key={c.id}><Link to={`/${c.id}`}><span className="run-n">{c.n}</span>{c.title}</Link></li>
						))}
					</ul>
				</nav>
			</header>

			<section className="cover" id="top" aria-label="Cover">
				<div className="cover-text">
					<h1 className="cover-title">Aurora</h1>
					<p className="cover-sub">{tagline}</p>
					<ul className="cover-links">
						{links.filter((l) => l.id !== "x").map((l) => (
							<li key={l.id}><a href={l.url}>{l.id === "email" ? "Email" : l.label}</a></li>
						))}
						<li><Link to="/contact">Write to me</Link></li>
					</ul>
				</div>

				<figure className="cover-fig">
					<div className="screen">
						<img src={portrait} alt="Aurora's avatar, a red-haired manga character wearing headphones, dithered to one-bit black and white" width="320" height="320" />
					</div>
					<figcaption><b>Figure 1</b>&ensp;The author, on a one-bit display.</figcaption>
				</figure>

				<p className="cover-foot">
					<span>convolutionary.dev</span>
					<span>Reference edition, {year}</span>
				</p>
			</section>

			<Chapter
				n="1" id="about" title="About Aurora"
				note={<p>In service since {SINCE}. That's {yearsIn()} years, all of it self-taught.</p>}
			>
				{bio.map((p, i) => <p key={i} className={i === 0 ? "lede" : undefined}>{p}</p>)}
				<p>
					This guide covers what I work with (<Link to="/specs">Chapter 2</Link>), what I've built
					(<Link to="/projects">Chapter 3</Link>), and how to reach me (<Link to="/contact">Chapter 4</Link>).
					There's also an older, stranger version of this site in <Link to="/appendix">Appendix A</Link>.
				</p>
			</Chapter>

			<Chapter
				n="2" id="specs" title="Specifications"
				note={<p>Grouped roughly by where in the stack it runs.</p>}
			>
				<table className="tbl specs">
					<caption className="caption"><b>Table 2-1</b>&ensp;Languages and tools in regular use.</caption>
					<tbody>
						<tr>
							<th scope="row">Experience</th>
							<td>{yearsIn()} years, since {SINCE}</td>
						</tr>
						{stack.map((g) => (
							<tr key={g.label}>
								<th scope="row">{g.label}</th>
								<td>{g.items.join(", ")}</td>
							</tr>
						))}
					</tbody>
				</table>
			</Chapter>

			<Chapter
				n="3" id="projects" title="Projects"
				note={<p>This table updates itself. It reads the GitHub API each time the page loads, so it's never out of date.</p>}
			>
				<Repos />
			</Chapter>

			<Chapter
				n="4" id="contact" title="Getting in touch"
				note={<p>Prefer encrypted mail? Grab the <a href={pgp} download="aurora-pgp.asc">PGP public key</a> first.</p>}
			>
				<table className="tbl where">
					<caption className="caption"><b>Table 4-1</b>&ensp;Where to find me.</caption>
					<tbody>
						{links.map((l) => (
							<tr key={l.id}>
								<th scope="row">{l.label}</th>
								<td><a href={l.url}>{l.id === "email" ? l.handle : `@${l.handle}`}</a></td>
							</tr>
						))}
						<tr>
							<th scope="row">PGP</th>
							<td><a href={pgp} download="aurora-pgp.asc">Public key (.asc)</a></td>
						</tr>
					</tbody>
				</table>

				<h3 className="proc-title" id="send">To send a message from this page</h3>
				<MailForm />
				<aside className="callout">
					<b>Note</b>
					<p>The form goes through web3forms. If it gives you trouble, plain <a href="mailto:cerfnet@anche.no">email</a> reaches the same inbox.</p>
				</aside>
			</Chapter>

			<Chapter
				n="A" id="appendix" title="The desktop"
				note={<p>Best on a real keyboard and mouse. On phones the windows stack instead.</p>}
			>
				<p>
					Before it was a manual, this site was a Macintosh desktop, complete with a startup screen, a row of
					extension icons, windows you can drag around, and a dithered sky. It still runs, and it has
					the same content as this page.
				</p>
				<button type="button" className="desk-fig" ref={figRef} onClick={startUp}>
					<span className="screen screen-wide">
						<img src={desktopShot} alt="" width="1280" height="800" />
					</span>
					<span className="desk-fig-cap">
						<span className="caption"><b>Figure A-1</b>&ensp;The desktop, as it looks after startup.</span>
						<span className="mac-btn mac-btn-default" aria-hidden="true">Start Up</span>
					</span>
					<span className="sr-only">Start up the Macintosh-style desktop</span>
				</button>
			</Chapter>

			<section className="ix" id="index" aria-labelledby="ix-h">
				<h2 id="ix-h" className="ix-title">Index</h2>
				<ul className="ix-list">
					{index.map(([term, refs]) => (
						<li key={term}>
							<span>{term}</span>
							<span className="ix-lead" aria-hidden="true" />
							<span className="ix-refs">
								{refs.map(([label, href], i) => (
									<React.Fragment key={href + label}>
										{i > 0 && ", "}
										<Link to={`/${href.slice(1)}`}>{label}</Link>
									</React.Fragment>
								))}
							</span>
						</li>
					))}
				</ul>
			</section>

			<footer className="colo">
				<p>© {year} Aurora</p>
				<p><a href="https://github.com/convolutionary/convolutionary.dev">Source on GitHub</a></p>
			</footer>

			{/* invisible full-viewport target for the zoom rect */}
			<div ref={fullRef} className="zoom-target" aria-hidden="true" />
		</div>
	);
};

export default Manual;
