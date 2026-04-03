import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import images from "./images";
import { aboutContent } from "../data/content";
import Window from "./Window";

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

	// triple so there's always enough content to fill the viewport during scroll
	const langItems = [...images.languages, ...images.languages, ...images.languages];
	const fwItems = [...images.frameworks, ...images.frameworks, ...images.frameworks];

	return (
		<section id="about" className="px-4 md:px-8 pt-4">
			<div className="max-w-5xl mx-auto space-y-4">

				{/* about window */}
				<Window title="About Me">
					{aboutContent.story.map((para, i) => (
						<p key={i} style={{ marginBottom: 8 }}>{para}</p>
					))}
					<div className="os-hr" />
					<p style={{ fontSize: 11, color: '#666' }}>
						<b>Skills:</b> {aboutContent.skills.map(s => s.title).join(', ')}
					</p>
				</Window>

				{/* tech stack window — marquee inside */}
				<Window title="Extensions Manager">
					{[
						{ label: 'Languages', items: langItems, dur: '20s', dir: 'normal' },
						{ label: 'Frameworks', items: fwItems, dur: '40s', dir: 'reverse' },
					].map(({ label, items, dur, dir }) => (
						<div key={label} style={{ marginBottom: 8 }}>
							<p style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 4 }}>{label}</p>
							<div style={{ overflow: 'hidden', position: 'relative', background: '#f5f5f5', border: '1px inset #999', padding: '4px 0' }}>
								<div className="marquee-track" style={{ animationDuration: dur, animationDirection: dir }}>
									{items.map((item, i) => (
										<a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
											style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 10px', whiteSpace: 'nowrap', fontSize: 11, textDecoration: 'none', color: '#000' }}>
											<img src={item.img} alt="" style={{ width: 14, height: 14, objectFit: 'contain' }} />
											{item.name}
										</a>
									))}
								</div>
							</div>
						</div>
					))}
				</Window>

				{/* projects window — list view like a finder window */}
				<Window title="Projects">
					{loading ? (
						<p style={{ color: '#666' }}>Loading...</p>
					) : repos.length > 0 ? (
						<div>
							{/* header row */}
							<div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 4px', borderBottom: '1px solid #999', fontSize: 11, fontWeight: 'bold', background: '#eee' }}>
								<span style={{ flex: 2 }}>Name</span>
								<span style={{ flex: 3, display: 'none' }} className="hidden sm:block">Description</span>
								<span style={{ width: 70, textAlign: 'right' }}>Language</span>
								<span style={{ width: 30, textAlign: 'right' }}>★</span>
							</div>
							{repos.slice(0, 8).map((repo) => (
								<a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
									style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 4px', borderBottom: '1px solid #ddd', fontSize: 11, textDecoration: 'none', color: '#000' }}
									onMouseEnter={(e) => { e.currentTarget.style.background = '#3366cc'; e.currentTarget.style.color = '#fff'; }}
									onMouseLeave={(e) => { e.currentTarget.style.background = ''; e.currentTarget.style.color = '#000'; }}
								>
									<span style={{ flex: 2, fontWeight: 'bold' }}>{repo.name}</span>
									<span style={{ flex: 3, color: 'inherit', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'none' }} className="hidden sm:block">
										{repo.description || '—'}
									</span>
									<span style={{ width: 70, textAlign: 'right', fontSize: 10 }}>{repo.language || '—'}</span>
									<span style={{ width: 30, textAlign: 'right' }}>{repo.stargazers_count}</span>
								</a>
							))}
							<div style={{ padding: '4px', fontSize: 10, color: '#666' }}>
								{repos.length} items — <a href="https://github.com/convolutionary" target="_blank" rel="noopener noreferrer">View all</a>
							</div>
						</div>
					) : (
						<p style={{ color: '#666' }}>No repos found.</p>
					)}
				</Window>
			</div>
		</section>
	);
};

export default About;
