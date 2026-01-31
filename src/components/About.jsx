import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineGithub, AiOutlineLink } from "react-icons/ai";
import images from "./images";
import { aboutContent } from "../data/content";
import { BentoCard, BentoGrid } from "./bento";

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
		<section className="bg-bento-surface-alt py-16 scroll-mt-20" id="about">
			<div className="container mx-auto px-6 max-w-6xl">
				{/* header */}
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-semibold text-ink-primary mb-4">
						Nice to meet you
					</h2>
					<p className="text-ink-muted text-lg max-w-2xl mx-auto">
						{aboutContent.intro}
					</p>
				</div>

				<BentoGrid>
					{/* story card - wide */}
					<BentoCard span="wide">
						<h3 className="text-lg font-semibold text-ink-primary mb-4">My Story</h3>
						<div className="space-y-4 text-ink-secondary leading-relaxed">
							{aboutContent.story.map((para, i) => (
								<p key={i}>{para}</p>
							))}
						</div>
					</BentoCard>

					{/* profile image */}
					<BentoCard className="flex items-center justify-center">
						<div className="w-32 h-32 rounded-bento-lg bg-bento-surface-alt border border-line overflow-hidden">
							<img
								src={require("../assets/discord/abjhfjljklks1.jpg")}
								alt="Aurora"
								className="w-full h-full object-cover"
							/>
						</div>
					</BentoCard>

					{/* skills */}
					{aboutContent.skills.map((skill, i) => (
						<BentoCard key={i}>
							<div className="w-10 h-10 rounded-bento bg-clay-bg flex items-center justify-center mb-3">
								<span className="text-clay font-semibold">{i + 1}</span>
							</div>
							<h4 className="text-ink-primary font-semibold mb-1">{skill.title}</h4>
							<p className="text-ink-muted text-sm">{skill.desc}</p>
						</BentoCard>
					))}

					{/* languages */}
					<BentoCard span="wide">
						<h3 className="text-lg font-semibold text-ink-primary mb-4">Languages</h3>
						<div className="flex flex-wrap gap-3">
							{images.languages.map((item, i) => (
								<a
									key={i}
									href={item.link}
									target="_blank"
									rel="noopener noreferrer"
									className="w-12 h-12 rounded-bento bg-bento-surface-alt border border-line hover:border-clay hover:shadow-bento-sm transition-all duration-200 flex items-center justify-center"
								>
									<img
										src={item.img}
										alt={`Language ${i + 1}`}
										className="w-6 h-6 object-contain"
									/>
								</a>
							))}
						</div>
					</BentoCard>

					{/* frameworks */}
					<BentoCard span="full">
						<h3 className="text-lg font-semibold text-ink-primary mb-4">Frameworks & Tools</h3>
						<div className="flex flex-wrap gap-3">
							{images.frameworks.map((item, i) => (
								<a
									key={i}
									href={item.link}
									target="_blank"
									rel="noopener noreferrer"
									className="w-12 h-12 rounded-bento bg-bento-surface-alt border border-line hover:border-clay hover:shadow-bento-sm transition-all duration-200 flex items-center justify-center"
								>
									<img
										src={item.img}
										alt={`Framework ${i + 1}`}
										className="w-6 h-6 object-contain"
									/>
								</a>
							))}
						</div>
					</BentoCard>

					{/* repos */}
					<BentoCard span="full">
						<h3 className="text-lg font-semibold text-ink-primary mb-4">Recent Projects</h3>

						{loading ? (
							<div className="text-center py-8">
								<div className="text-ink-muted">Loading repositories...</div>
							</div>
						) : repos.length > 0 ? (
							<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
								{repos.slice(0, 6).map((repo) => (
									<div
										key={repo.id}
										className="p-4 rounded-bento bg-bento-surface-alt border border-line hover:border-line-hover hover:shadow-bento-sm transition-all duration-200"
									>
										<div className="flex items-center gap-3 mb-3">
											<img
												className="w-8 h-8 rounded-full"
												src={repo.owner.avatar_url}
												alt={repo.owner.login}
											/>
											<div className="flex-1 min-w-0">
												<p className="text-ink-muted text-sm truncate">{repo.owner.login}</p>
											</div>
											<div className="flex gap-2">
												<a
													href={repo.html_url}
													target="_blank"
													rel="noopener noreferrer"
													className="text-ink-subtle hover:text-clay transition-colors"
												>
													<AiOutlineGithub size={16} />
												</a>
												{repo.homepage && (
													<a
														href={repo.homepage}
														target="_blank"
														rel="noopener noreferrer"
														className="text-ink-subtle hover:text-clay transition-colors"
													>
														<AiOutlineLink size={16} />
													</a>
												)}
											</div>
										</div>
										<h4 className="text-ink-primary font-medium mb-2 truncate">{repo.name}</h4>
										<p className="text-ink-muted text-sm mb-3 line-clamp-2">
											{repo.description || "No description available"}
										</p>
										<div className="flex items-center justify-between text-sm text-ink-subtle">
											<div className="flex items-center gap-1">
												<AiFillStar className="text-clay-soft w-3 h-3" />
												<span>{repo.stargazers_count}</span>
											</div>
											{repo.language && (
												<span className="text-ink-muted truncate">{repo.language}</span>
											)}
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="text-center py-8">
								<div className="text-ink-secondary">No repositories found</div>
								<p className="text-ink-muted text-sm">Check back later for updates!</p>
							</div>
						)}
					</BentoCard>
				</BentoGrid>
			</div>
		</section>
	);
};

export default About;
