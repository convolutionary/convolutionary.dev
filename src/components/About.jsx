import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { AiFillStar, AiOutlineGithub } from "react-icons/ai";
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
		<section className="py-32" id="about">
			<div className="container mx-auto px-6 max-w-6xl">

				{/* header */}
				<div className="mb-20">
					<motion.span
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className="text-clay font-mono text-sm"
					>
						{"// about"}
					</motion.span>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-5xl md:text-6xl font-bold text-ink-primary tracking-tight mt-2"
					>
						Nice to meet you<span className="text-clay">.</span>
					</motion.h2>
				</div>

				{/* story + skills */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
					{/* story */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="bg-bento-bg/95 border border-line p-8 backdrop-blur-sm"
					>
						<h3 className="text-lg font-bold text-ink-primary mb-6 flex items-center gap-3">
							<span className="w-8 h-px bg-clay" />
							My Story
						</h3>
						<div className="space-y-4 text-ink-secondary leading-relaxed">
							{aboutContent.story.map((para, i) => (
								<p key={i}>{para}</p>
							))}
						</div>
					</motion.div>

					{/* skills */}
					<div className="space-y-4">
						{aboutContent.skills.map((skill, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.1 }}
								className="bg-bento-bg/95 border border-line p-6 backdrop-blur-sm group hover:border-line-hover transition-colors"
							>
								<div className="flex items-start gap-4">
									<span className="text-2xl font-bold text-ink-subtle group-hover:text-clay transition-colors font-mono">
										{String(i + 1).padStart(2, '0')}
									</span>
									<div>
										<h4 className="text-ink-primary font-semibold">{skill.title}</h4>
										<p className="text-ink-muted text-sm mt-1">{skill.desc}</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>

				{/* tech stack */}
				<div className="mb-24">
					<div className="flex items-center gap-4 mb-8">
						<h3 className="text-lg font-bold text-ink-primary">Languages</h3>
						<div className="flex-1 h-px bg-line" />
					</div>
					<div className="flex flex-wrap gap-3">
						{images.languages.map((item, i) => (
							<motion.a
								key={i}
								href={item.link}
								target="_blank"
								rel="noopener noreferrer"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.03 }}
								className="w-14 h-14 bg-bento-surface border border-line flex items-center justify-center hover:border-clay transition-colors"
							>
								<img src={item.img} alt="" className="w-7 h-7 object-contain" />
							</motion.a>
						))}
					</div>
				</div>

				<div className="mb-24">
					<div className="flex items-center gap-4 mb-8">
						<h3 className="text-lg font-bold text-ink-primary">Frameworks & Tools</h3>
						<div className="flex-1 h-px bg-line" />
					</div>
					<div className="flex flex-wrap gap-3">
						{images.frameworks.map((item, i) => (
							<motion.a
								key={i}
								href={item.link}
								target="_blank"
								rel="noopener noreferrer"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.03 }}
								className="w-14 h-14 bg-bento-surface border border-line flex items-center justify-center hover:border-clay transition-colors"
							>
								<img src={item.img} alt="" className="w-7 h-7 object-contain" />
							</motion.a>
						))}
					</div>
				</div>

				{/* repos */}
				<div>
					<div className="flex items-center justify-between gap-4 mb-8">
						<div className="flex items-center gap-4">
							<h3 className="text-lg font-bold text-ink-primary">Recent Projects</h3>
							<div className="hidden sm:block w-16 h-px bg-line" />
						</div>
						<a
							href="https://github.com/convolutionary"
							target="_blank"
							rel="noopener noreferrer"
							className="text-clay text-sm hover:underline font-mono"
						>
							view all →
						</a>
					</div>

					{loading ? (
						<div className="text-center py-16 text-ink-muted font-mono">loading...</div>
					) : repos.length > 0 ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{repos.slice(0, 6).map((repo, i) => (
								<motion.a
									key={repo.id}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.05 }}
									href={repo.html_url}
									target="_blank"
									rel="noopener noreferrer"
									className="bg-bento-bg/95 border border-line p-6 backdrop-blur-sm group hover:border-line-hover transition-colors"
								>
									<div className="flex items-center justify-between mb-3">
										<span className="text-ink-muted text-xs font-mono">{repo.owner.login}</span>
										<AiOutlineGithub className="w-4 h-4 text-ink-subtle group-hover:text-clay transition-colors" />
									</div>
									<h4 className="text-ink-primary font-semibold mb-2 group-hover:text-clay transition-colors truncate">
										{repo.name}
									</h4>
									<p className="text-ink-muted text-sm line-clamp-2 mb-4">
										{repo.description || "No description"}
									</p>
									<div className="flex items-center gap-4 text-xs text-ink-subtle">
										<span className="flex items-center gap-1">
											<AiFillStar className="text-clay" />
											{repo.stargazers_count}
										</span>
										{repo.language && (
											<span className="px-2 py-0.5 border border-line text-ink-muted font-mono">
												{repo.language}
											</span>
										)}
									</div>
								</motion.a>
							))}
						</div>
					) : (
						<div className="text-center py-16 text-ink-muted font-mono">no repos found</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default About;
