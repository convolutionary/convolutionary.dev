import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineGithub, AiOutlineLink } from "react-icons/ai";
import images from "./images";
import { aboutContent } from "../data/content";

const About = () => {
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const hermesGrabRepos = async () => {
			try {
				const response = await fetch("https://api.github.com/users/convolutionary/repos");
				if (!response.ok) throw new Error(`flatlined: ${response.status}`);
				const data = await response.json();
				setRepos(data || []);
			} catch (err) {
				console.error("repo fetch went sideways:", err);
				setRepos([]);
			} finally {
				setLoading(false);
			}
		};
		hermesGrabRepos();
	}, []);

	return (
		<section className="bg-bento-bg py-20 scroll-mt-20" id="about">
			<div className="container mx-auto px-6 max-w-7xl">

				{/* header - left aligned, bold */}
				<div className="flex items-end justify-between mb-16">
					<div>
						<p className="text-clay font-mono text-sm mb-2">// about</p>
						<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink-primary tracking-tight">
							Nice to meet you
						</h2>
					</div>
					<div className="hidden md:block w-32 h-32 rounded-2xl overflow-hidden border border-line">
						<img
							src={require("../assets/discord/abjhfjljklks1.jpg")}
							alt="Aurora"
							className="w-full h-full object-cover"
						/>
					</div>
				</div>

				{/* story section - offset layout */}
				<div className="grid lg:grid-cols-12 gap-8 mb-20">
					<div className="lg:col-span-7">
						<div className="bg-bento-surface rounded-2xl border border-line p-8">
							<h3 className="text-xl font-semibold text-ink-primary mb-6">My Story</h3>
							<div className="space-y-4 text-ink-secondary leading-relaxed">
								{aboutContent.story.map((para, i) => (
									<p key={i}>{para}</p>
								))}
							</div>
						</div>
					</div>

					{/* skills - stacked on right */}
					<div className="lg:col-span-5 space-y-4">
						{aboutContent.skills.map((skill, i) => (
							<div
								key={i}
								className="bg-bento-surface rounded-xl border border-line p-5 hover:border-clay/30 transition-colors group"
							>
								<div className="flex items-start gap-4">
									<span className="text-3xl font-bold text-clay/30 group-hover:text-clay transition-colors">
										0{i + 1}
									</span>
									<div>
										<h4 className="text-ink-primary font-semibold">{skill.title}</h4>
										<p className="text-ink-muted text-sm mt-1">{skill.desc}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* tech stack - horizontal scroll feel */}
				<div className="mb-20">
					<div className="flex items-center gap-4 mb-6">
						<h3 className="text-lg font-semibold text-ink-primary">Languages</h3>
						<div className="flex-1 h-px bg-line" />
					</div>
					<div className="flex flex-wrap gap-3">
						{images.languages.map((item, i) => (
							<a
								key={i}
								href={item.link}
								target="_blank"
								rel="noopener noreferrer"
								className="w-14 h-14 rounded-xl bg-bento-surface border border-line hover:border-clay hover:scale-105 transition-all flex items-center justify-center"
							>
								<img src={item.img} alt="" className="w-7 h-7 object-contain" />
							</a>
						))}
					</div>
				</div>

				<div className="mb-20">
					<div className="flex items-center gap-4 mb-6">
						<h3 className="text-lg font-semibold text-ink-primary">Frameworks & Tools</h3>
						<div className="flex-1 h-px bg-line" />
					</div>
					<div className="flex flex-wrap gap-3">
						{images.frameworks.map((item, i) => (
							<a
								key={i}
								href={item.link}
								target="_blank"
								rel="noopener noreferrer"
								className="w-14 h-14 rounded-xl bg-bento-surface border border-line hover:border-clay hover:scale-105 transition-all flex items-center justify-center"
							>
								<img src={item.img} alt="" className="w-7 h-7 object-contain" />
							</a>
						))}
					</div>
				</div>

				{/* repos - masonry-ish grid */}
				<div>
					<div className="flex items-center gap-4 mb-6">
						<h3 className="text-lg font-semibold text-ink-primary">Recent Projects</h3>
						<div className="flex-1 h-px bg-line" />
						<a
							href="https://github.com/convolutionary"
							target="_blank"
							rel="noopener noreferrer"
							className="text-clay text-sm hover:underline"
						>
							View all →
						</a>
					</div>

					{loading ? (
						<div className="text-center py-12 text-ink-muted">Loading...</div>
					) : repos.length > 0 ? (
						<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{repos.slice(0, 6).map((repo, i) => (
								<a
									key={repo.id}
									href={repo.html_url}
									target="_blank"
									rel="noopener noreferrer"
									className={`group bg-bento-surface rounded-xl border border-line p-5 hover:border-clay/50 transition-all ${
										i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
									}`}
								>
									<div className="flex items-center justify-between mb-3">
										<span className="text-ink-muted text-sm font-mono">{repo.owner.login}</span>
										<AiOutlineGithub className="w-4 h-4 text-ink-subtle group-hover:text-clay transition-colors" />
									</div>
									<h4 className="text-ink-primary font-semibold mb-2 group-hover:text-clay transition-colors">
										{repo.name}
									</h4>
									<p className="text-ink-muted text-sm line-clamp-2 mb-4">
										{repo.description || "No description"}
									</p>
									<div className="flex items-center gap-4 text-xs text-ink-subtle">
										<span className="flex items-center gap-1">
											<AiFillStar className="text-clay-soft" />
											{repo.stargazers_count}
										</span>
										{repo.language && (
											<span className="px-2 py-0.5 rounded-full bg-bento-surface-alt">
												{repo.language}
											</span>
										)}
									</div>
								</a>
							))}
						</div>
					) : (
						<div className="text-center py-12 text-ink-muted">No repos found</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default About;
