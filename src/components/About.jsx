import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineGithub, AiOutlineLink } from "react-icons/ai";
import images from "./images";
import { aboutContent } from "../data/content";
import { TerminalPrompt, TerminalCard, SectionDivider, TerminalCursor } from "./terminal";

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
		<div className="bg-terminal-black font-mono text-terminal-primary scroll-mt-32" id="about">
			<div className="container mx-auto px-4 py-8 max-w-6xl">
				<div className="terminal-window">
					<div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">

					{/* intro header */}
					<div className="text-center">
						<div className="text-terminal-secondary text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 font-mono glitch-hover" data-text="NICE TO MEET YOU">
							NICE TO MEET YOU
						</div>
						<TerminalPrompt path="~/about" command="cat introduction.txt" className="mb-4 justify-center" />
						<p className="text-terminal-muted text-lg leading-relaxed max-w-4xl mx-auto">
							{aboutContent.intro}
						</p>
					</div>

					{/* bio grid */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
						<div className="space-y-4 sm:space-y-6">
							{/* story card */}
							<TerminalCard
								prompt={{ path: "~/about", command: "cat story.md" }}
								tag="[STORY]"
								title="MY STORY"
							>
								<div className="space-y-4 text-terminal-secondary leading-relaxed">
									{aboutContent.story.map((para, i) => (
										<p key={i}>{para}</p>
									))}
								</div>
							</TerminalCard>

							{/* skills card */}
							<TerminalCard
								prompt={{ path: "~/about", command: "ls skills/" }}
								tag="[SKILLS]"
								title="WHAT I DO"
							>
								<div className="space-y-4">
									{aboutContent.skills.map((skill, i) => (
										<div key={i} className="flex items-start gap-4">
											<span className="text-cyan-400">→</span>
											<div>
												<h4 className="text-terminal-secondary font-semibold">{skill.title}</h4>
												<p className="text-terminal-muted text-sm">{skill.desc}</p>
											</div>
										</div>
									))}
								</div>
							</TerminalCard>
						</div>

						{/* profile card */}
						<div className="text-center">
							<TerminalCard prompt={{ path: "~/about", command: "display profile.jpg" }}>
								<div className="w-48 h-48 bg-terminal-darker rounded border border-terminal-dim flex items-center justify-center mx-auto mb-4 overflow-hidden">
									<img
										src={require("../assets/discord/abjhfjljklks1.jpg")}
										alt="Aurora"
										className="w-full h-full object-cover rounded"
									/>
								</div>
								<p className="text-terminal-muted">Aurora • Developer</p>
							</TerminalCard>
						</div>
					</div>

					{/* tech stack */}
					<div>
						<TerminalPrompt path="~/about" command="cat tech-stack.json" className="mb-6" />
						<div className="grid md:grid-cols-2 gap-6">
							<TerminalCard tag="[LANG]" title="LANGUAGES">
								<div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
									{images.languages.map((item, i) => (
										<a
											key={i}
											href={item.link}
											target="_blank"
											rel="noopener noreferrer"
											className="bg-terminal-darker hover:bg-terminal-dark border border-terminal-dim hover:border-cyan-400/50 rounded p-3 transition-all duration-300 flex items-center justify-center aspect-square group"
										>
											<img
												src={item.img}
												alt={`Language ${i + 1}`}
												className="w-6 h-6 object-contain group-hover:scale-110 transition-transform"
											/>
										</a>
									))}
								</div>
							</TerminalCard>

							<TerminalCard tag="[TOOLS]" title="FRAMEWORKS & TOOLS">
								<div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
									{images.frameworks.map((item, i) => (
										<a
											key={i}
											href={item.link}
											target="_blank"
											rel="noopener noreferrer"
											className="bg-terminal-darker hover:bg-terminal-dark border border-terminal-dim hover:border-cyan-400/50 rounded p-3 transition-all duration-300 flex items-center justify-center aspect-square group"
										>
											<img
												src={item.img}
												alt={`Framework ${i + 1}`}
												className="w-6 h-6 object-contain group-hover:scale-110 transition-transform"
											/>
										</a>
									))}
								</div>
							</TerminalCard>
						</div>
					</div>

					{/* repos */}
					<div>
						<TerminalPrompt path="~/about" command="ls ~/projects/ -la" className="mb-6" />

						{loading ? (
							<div className="text-center py-8">
								<div className="text-terminal-primary">Loading repositories...</div>
								<TerminalCursor />
							</div>
						) : repos.length > 0 ? (
							<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								{repos.slice(0, 6).map((repo) => (
									<TerminalCard key={repo.id} hover={true} className="p-4">
										<div className="flex items-center gap-3 mb-3">
											<img
												className="w-8 h-8 rounded-full flex-shrink-0"
												src={repo.owner.avatar_url}
												alt={repo.owner.login}
											/>
											<div className="flex-1 min-w-0">
												<p className="text-terminal-muted text-sm truncate">{repo.owner.login}</p>
											</div>
											<div className="flex gap-2">
												<a
													href={repo.html_url}
													target="_blank"
													rel="noopener noreferrer"
													className="text-terminal-dim hover:text-cyan-400 transition-colors"
												>
													<AiOutlineGithub size={16} />
												</a>
												{repo.homepage && (
													<a
														href={repo.homepage}
														target="_blank"
														rel="noopener noreferrer"
														className="text-terminal-dim hover:text-cyan-400 transition-colors"
													>
														<AiOutlineLink size={16} />
													</a>
												)}
											</div>
										</div>
										<h4 className="text-terminal-secondary font-semibold mb-2 truncate">{repo.name}</h4>
										<p className="text-terminal-muted text-sm mb-4 line-clamp-3">
											{repo.description || "No description available"}
										</p>
										<div className="flex items-center justify-between text-sm text-terminal-dim">
											<div className="flex items-center gap-2">
												<AiFillStar className="text-term-accent-amber w-3 h-3" />
												<span>{repo.stargazers_count}</span>
											</div>
											{repo.language && (
												<span className="text-terminal-secondary truncate">{repo.language}</span>
											)}
										</div>
									</TerminalCard>
								))}
							</div>
						) : (
							<div className="text-center py-8">
								<div className="text-terminal-secondary">No repositories found</div>
								<p className="text-terminal-muted text-sm">Check back later for updates!</p>
							</div>
						)}
					</div>

					{/* section divider */}
					<SectionDivider fromPath="~/about" toSection="blog" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
