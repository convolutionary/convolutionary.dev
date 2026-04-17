import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { heroContent, aboutContent, blogContent } from "../data/content";
import { CountUp } from "./bits";
import { Desktop, DesktopIcon, DesktopWindow } from "./desktop/Desktop";
import TechMarquee from "./TechMarquee";
import images from "./images";

// web3forms access key — public by design; spam is filtered by their
// honeypot (botcheck field) + our rate limit + domain restriction set
// on web3forms.com
const WEB3FORMS_KEY = "5f42e464-8296-475b-8331-8786d860fb15";
const COOLDOWN_MS = 60_000;
const COOLDOWN_KEY = "aurora:lastMail";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Home = () => {
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [submitted, setSubmitted] = useState(false);
	const [sending, setSending] = useState(false);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({ name: "", email: "", message: "", website: "" });
	const upd = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const sendMail = (e) => {
		e.preventDefault();
		setError("");

		// honeypot: real users can't see this field; bots fill every input
		if (formData.website) return;

		// validation
		if (formData.name.trim().length < 2) return setError("name is too short");
		if (!emailRe.test(formData.email)) return setError("that email doesn't look right");
		const msg = formData.message.trim();
		if (msg.length < 10) return setError("message is too short");
		if (msg.length > 2000) return setError("message is too long (max 2000 chars)");

		// rate limit — 60s between submissions per browser
		const last = Number(localStorage.getItem(COOLDOWN_KEY) || 0);
		const since = Date.now() - last;
		if (since < COOLDOWN_MS) {
			const wait = Math.ceil((COOLDOWN_MS - since) / 1000);
			return setError(`slow down — try again in ${wait}s`);
		}

		setSending(true);
		(async () => {
			try {
				const res = await fetch("https://api.web3forms.com/submit", {
					method: "POST",
					headers: { "Content-Type": "application/json", Accept: "application/json" },
					body: JSON.stringify({
						access_key: WEB3FORMS_KEY,
						subject: `aurora.dev — message from ${formData.name.trim()}`,
						from_name: "aurora.dev contact",
						name: formData.name.trim(),
						email: formData.email.trim(),
						message: msg,
						// web3forms' own botcheck — bots fill it, their API drops the req
						botcheck: formData.website,
					}),
				});
				const data = await res.json();
				if (!data.success) throw new Error(data.message || "send failed");
				localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
				setSubmitted(true);
				setFormData({ name: "", email: "", message: "", website: "" });
			} catch (err) {
				setError(err?.message || "send failed — try again");
			} finally {
				setSending(false);
			}
		})();
	};

	useEffect(() => {
		(async () => {
			try {
				const r = await fetch("https://api.github.com/users/convolutionary/repos");
				if (!r.ok) throw new Error(`${r.status}`);
				setRepos((await r.json()) || []);
			} catch { setRepos([]); }
			finally { setLoading(false); }
		})();
	}, []);

	const { featuredPost } = blogContent;

	const links = [
		{ label: "GitHub", url: "https://github.com/convolutionary" },
		{ label: "Email", url: "mailto:cerfnet@anche.no" },
		{ label: "X (Twitter)", url: "https://x.com/Nocixa" },
		{ label: "Telegram", url: "https://t.me/" },
		{ label: "Codeberg", url: "https://codeberg.org/Dyslexic" },
	];

	return (
		<Desktop>
			{/* column of icons along the left edge — classic finder desktop */}
			<div className="desk-icons">
				<DesktopIcon id="identity" label="identity.card" icon="card" />
				<DesktopIcon id="stats"    label="stats.txt"     icon="calculator" />
				<DesktopIcon id="readme"   label="readme.md"     icon="document" />
				<DesktopIcon id="extensions" label="extensions"  icon="puzzle" />
				<DesktopIcon id="projects" label="projects"      icon="hd" />
				<DesktopIcon id="writing"  label="writing.rtf"   icon="document" />
				<DesktopIcon id="drafts"   label="drafts"        icon="papers" />
				<DesktopIcon id="bookmarks" label="bookmarks"    icon="book" />
				<DesktopIcon id="mail"     label="mail.app"      icon="letter" />
			</div>

			{/* ── windows ────────────────────────────────────────────── */}

			<DesktopWindow id="identity" title="identity.card" width={460}>
				<div style={{ display: "flex", gap: 14 }}>
					<div style={{ flex: "0 0 140px" }}>
						<img
							src={require("../assets/discord/abjhfjljklks1.jpg")}
							alt="Aurora"
							className="w-full border border-black"
							style={{ display: "block" }}
						/>
					</div>
					<div style={{ flex: 1 }}>
						<p style={{ fontSize: 18, fontWeight: "bold", marginBottom: 6 }}>Aurora</p>
						<p style={{ fontSize: 12, marginBottom: 8, lineHeight: 1.45 }}>
							{heroContent.bio.short}
						</p>
						<div className="os-hr" />
						<p style={{ color: "#666", fontSize: 10 }}>
							{heroContent.roles.join(" • ")}
						</p>
					</div>
				</div>
			</DesktopWindow>

			<DesktopWindow id="stats" title="Stats" width={440}>
				<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
					{heroContent.stats.slice(0, 3).map((stat, i) => {
						const m = stat.value.match(/(\d+)/);
						const n = m ? parseInt(m[1]) : null;
						const suffix = stat.value.replace(/\d+/, "");
						return (
							<div
								key={i}
								style={{
									textAlign: "center",
									padding: "6px 4px",
									borderRight: i < 2 ? "1px dotted #999" : "none",
								}}
							>
								<div style={{ fontSize: 28, fontWeight: "bold", lineHeight: 1 }}>
									{n !== null ? <><CountUp to={n} duration={1.2} />{suffix}</> : stat.value}
								</div>
								<div style={{ fontSize: 10, color: "#666", marginTop: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>
									{stat.label}
								</div>
							</div>
						);
					})}
				</div>
			</DesktopWindow>

			<DesktopWindow id="readme" title="readme.md" width={480}>
				{aboutContent.story.map((p, i) => (
					<p key={i} style={{ marginBottom: 8, fontSize: 12, lineHeight: 1.55 }}>{p}</p>
				))}
				<div className="os-hr" />
				<div style={{ display: "grid", gap: 5 }}>
					{aboutContent.skills.map((s, i) => (
						<div key={i} style={{ fontSize: 11 }}>
							<b>▸ {s.title}</b>
							<br />
							<span style={{ color: "#666", marginLeft: 12 }}>{s.desc}</span>
						</div>
					))}
				</div>
			</DesktopWindow>

			<DesktopWindow id="extensions" title="Extensions Manager" width={480}>
				<div style={{ marginBottom: 10 }}>
					<p style={{ fontSize: 10, fontWeight: "bold", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>Languages</p>
					<TechMarquee items={images.languages} speed={45} />
				</div>
				<div>
					<p style={{ fontSize: 10, fontWeight: "bold", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>Frameworks</p>
					<TechMarquee items={images.frameworks} speed={30} reverse />
				</div>
			</DesktopWindow>

			<DesktopWindow id="projects" title="Projects — Finder" width={640}>
				{loading ? (
					<p style={{ color: "#666" }}>Loading…</p>
				) : repos.length > 0 ? (
					<div>
						<div style={{ display: "flex", justifyContent: "space-between", padding: "3px 8px", borderBottom: "1px solid #999", fontSize: 11, fontWeight: "bold", background: "#eee" }}>
							<span style={{ flex: 2 }}>Name</span>
							<span style={{ flex: 4 }}>Description</span>
							<span style={{ width: 90, textAlign: "right" }}>Language</span>
							<span style={{ width: 36, textAlign: "right" }}>★</span>
						</div>
						{repos.slice(0, 8).map((repo) => (
							<a
								key={repo.id}
								href={repo.html_url}
								target="_blank"
								rel="noopener noreferrer"
								className="finder-row"
							>
								<span style={{ flex: 2, fontWeight: "bold" }}>{repo.name}</span>
								<span style={{ flex: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 12 }}>
									{repo.description || "—"}
								</span>
								<span style={{ width: 90, textAlign: "right", fontSize: 10 }}>{repo.language || "—"}</span>
								<span style={{ width: 36, textAlign: "right" }}>{repo.stargazers_count}</span>
							</a>
						))}
						<div style={{ padding: "4px 8px", fontSize: 10, color: "#666" }}>
							{repos.length} items — <a href="https://github.com/convolutionary" target="_blank" rel="noopener noreferrer">View all</a>
						</div>
					</div>
				) : (
					<p style={{ color: "#666" }}>No repos found.</p>
				)}
			</DesktopWindow>

			<DesktopWindow id="writing" title="SimpleText — featured" width={560}>
				<Link to={`/blog/${featuredPost.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
					<div className="media-row">
						{featuredPost.imageUrl && (
							<div className="media-row-fig">
								<img
									src={featuredPost.imageUrl}
									alt={featuredPost.title}
									className="w-full border border-black"
									style={{ display: "block" }}
								/>
							</div>
						)}
						<div className="media-row-body">
							<p style={{ fontSize: 10, color: "#666", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>
								{featuredPost.tags.join(" / ")} — {featuredPost.date} — {featuredPost.readTime}
							</p>
							<p style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8, lineHeight: 1.2 }}>
								{featuredPost.title}
							</p>
							<p style={{ fontSize: 12, color: "#333", marginBottom: 10, lineHeight: 1.5 }}>
								{featuredPost.content.substring(0, 240)}…
							</p>
							<span style={{ color: "#3366cc", fontSize: 11, textDecoration: "underline" }}>Read more →</span>
						</div>
					</div>
				</Link>
			</DesktopWindow>

			<DesktopWindow id="drafts" title="drafts/" width={360}>
				<p style={{ fontSize: 11, color: "#666", marginBottom: 8 }}>in the pipeline:</p>
				{blogContent.upcomingPosts.map((p, i) => (
					<div
						key={i}
						style={{
							display: "flex",
							justifyContent: "space-between",
							padding: "4px 4px",
							borderBottom: "1px dotted #ccc",
							fontSize: 11,
						}}
					>
						<span style={{ fontFamily: "monospace" }}>{p.file}</span>
						<span style={{ color: "#999", fontStyle: "italic" }}>{p.status}</span>
					</div>
				))}
			</DesktopWindow>

			<DesktopWindow id="bookmarks" title="bookmarks/" width={340}>
				{links.map((link, i) => (
					<a
						key={i}
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						className="finder-row"
						style={{ borderBottom: i < links.length - 1 ? "1px dotted #ccc" : "none" }}
					>
						<span style={{ fontWeight: "bold" }}>{link.label}</span>
					</a>
				))}
			</DesktopWindow>

			<DesktopWindow id="mail" title="Send Message" width={520}>
				{submitted ? (
					<div style={{ textAlign: "center", padding: "24px 0" }}>
						<p style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>✓ Message sent!</p>
						<p style={{ fontSize: 11, color: "#666", marginBottom: 16 }}>I'll get back to you soon.</p>
						<button onClick={() => setSubmitted(false)} className="btn">Send Another</button>
					</div>
				) : (
					<form onSubmit={sendMail}>
						<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
							<div>
								<label className="os-label">Name:</label>
								<input type="text" name="name" value={formData.name} onChange={upd} required placeholder="Your name" className="os-input" disabled={sending} />
							</div>
							<div>
								<label className="os-label">Email:</label>
								<input type="email" name="email" value={formData.email} onChange={upd} required placeholder="you@example.com" className="os-input" disabled={sending} />
							</div>
						</div>
						<div style={{ marginBottom: 10 }}>
							<label className="os-label">Message:</label>
							<textarea name="message" value={formData.message} onChange={upd} required rows={5} placeholder="What's on your mind?" className="os-textarea" disabled={sending} maxLength={2000} />
						</div>

						{/* honeypot — hidden from real users but scraped by bots.
						    if it arrives filled we silently reject the submission. */}
						<div style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }} aria-hidden>
							<label>
								Website (leave blank)
								<input
									type="text"
									name="website"
									tabIndex={-1}
									autoComplete="off"
									value={formData.website}
									onChange={upd}
								/>
							</label>
						</div>

						{error && (
							<div style={{ fontSize: 11, color: "#a00", marginBottom: 8 }}>
								⚠ {error}
							</div>
						)}

						<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
							<span style={{ fontSize: 10, color: "#999" }}>
								{formData.message.length}/2000
							</span>
							<button type="submit" className="btn btn-primary" disabled={sending}>
								{sending ? "Sending…" : "Send"}
							</button>
						</div>
					</form>
				)}
			</DesktopWindow>
		</Desktop>
	);
};

export default Home;
