import React, { useState, useEffect } from "react";
import images from "./images";
import { aboutContent } from "../data/content";
import ShowScene, { SceneIcon, Pane } from "./show/ShowScene";
import TechMarquee from "./TechMarquee";

const About = () => {
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const r = await fetch("https://api.github.com/users/convolutionary/repos");
				if (!r.ok) throw new Error(`${r.status}`);
				setRepos(await r.json() || []);
			} catch { setRepos([]); }
			finally { setLoading(false); }
		})();
	}, []);

	const sequence = [
		["readme-icon", "readme-pane"],
		["ext-icon", "ext-pane"],
		["projects-icon", "projects-pane"],
	];

	return (
		<ShowScene
			id="about"
			title="about/"
			subtitle="readme · extensions · projects"
			sequence={sequence}
			height={360}
		>
			<SceneIcon id="readme-icon"   x={8}  y={36} label="readme.md"   icon="document" />
			<SceneIcon id="ext-icon"      x={8}  y={58} label="extensions" icon="puzzle" />
			<SceneIcon id="projects-icon" x={8}  y={80} label="projects"   icon="hd" />

			<Pane id="readme-pane" x={40} y={42} width={480} title="readme.md">
				{aboutContent.story.map((para, i) => (
					<p key={i} style={{ marginBottom: 8, fontSize: 12, lineHeight: 1.55 }}>{para}</p>
				))}
				<div className="os-hr" />
				<div style={{ display: 'grid', gap: 5 }}>
					{aboutContent.skills.map((s, i) => (
						<div key={i} style={{ fontSize: 11 }}>
							<b>▸ {s.title}</b><br />
							<span style={{ color: '#666', marginLeft: 12 }}>{s.desc}</span>
						</div>
					))}
				</div>
			</Pane>

			<Pane id="ext-pane" x={70} y={40} width={460} title="Extensions Manager">
				<div style={{ marginBottom: 10 }}>
					<p style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Languages</p>
					<TechMarquee items={images.languages} speed={45} />
				</div>
				<div>
					<p style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Frameworks</p>
					<TechMarquee items={images.frameworks} speed={30} reverse />
				</div>
			</Pane>

			<Pane id="projects-pane" x={55} y={76} width={720} title="Projects — Finder">
				{loading ? (
					<p style={{ color: '#666' }}>Loading...</p>
				) : repos.length > 0 ? (
					<div>
						<div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 8px', borderBottom: '1px solid #999', fontSize: 11, fontWeight: 'bold', background: '#eee' }}>
							<span style={{ flex: 2 }}>Name</span>
							<span style={{ flex: 4 }}>Description</span>
							<span style={{ width: 90, textAlign: 'right' }}>Language</span>
							<span style={{ width: 36, textAlign: 'right' }}>★</span>
						</div>
						{repos.slice(0, 6).map((repo) => (
							<a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
								style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 8px', borderBottom: '1px solid #ddd', fontSize: 11, textDecoration: 'none', color: '#000' }}
								onMouseEnter={(e) => { e.currentTarget.style.background = '#3366cc'; e.currentTarget.style.color = '#fff'; }}
								onMouseLeave={(e) => { e.currentTarget.style.background = ''; e.currentTarget.style.color = '#000'; }}
							>
								<span style={{ flex: 2, fontWeight: 'bold' }}>{repo.name}</span>
								<span style={{ flex: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 12 }}>
									{repo.description || '—'}
								</span>
								<span style={{ width: 90, textAlign: 'right', fontSize: 10 }}>{repo.language || '—'}</span>
								<span style={{ width: 36, textAlign: 'right' }}>{repo.stargazers_count}</span>
							</a>
						))}
						<div style={{ padding: '4px 8px', fontSize: 10, color: '#666' }}>
							{repos.length} items — <a href="https://github.com/convolutionary" target="_blank" rel="noopener noreferrer">View all on GitHub</a>
						</div>
					</div>
				) : (
					<p style={{ color: '#666' }}>No repos found.</p>
				)}
			</Pane>
		</ShowScene>
	);
};

export default About;
