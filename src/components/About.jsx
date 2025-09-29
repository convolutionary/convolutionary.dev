import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineGithub, AiOutlineLink } from "react-icons/ai";
import images from "./images";

const About = () => {
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showCursor, setShowCursor] = useState(true);

	useEffect(() => {
		const fetchRepos = async () => {
			try {
				const response = await fetch(
					"https://api.github.com/users/convolutionary/repos"
				);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setRepos(data || []);
			} catch (error) {
				console.error("Error fetching repos:", error);
				setRepos([]);
			} finally {
				setLoading(false);
			}
		};

		fetchRepos();
	}, []);

	// Cursor blink effect
	useEffect(() => {
		const interval = setInterval(() => {
			setShowCursor(prev => !prev);
		}, 530);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="bg-terminal-black font-mono text-terminal-primary scroll-mt-32" id="about">
			<div className="container mx-auto px-4 py-8 max-w-6xl">
				{}
				<div className="bg-terminal-black border-l border-r border-terminal-muted p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">

					{}
					<div className="text-center">
						<div className="text-terminal-secondary text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 font-mono">
							NICE TO MEET YOU
						</div>
						<div className="text-terminal-secondary mb-4">
							<span className="text-terminal-muted">aurora@portfolio</span><span className="text-white">:</span><span className="text-blue-400">~/about</span><span className="text-white">$ </span>cat introduction.txt
						</div>
						<p className="text-terminal-muted text-lg leading-relaxed max-w-4xl mx-auto">
							I'm a passionate developer who loves building things and solving complex problems.
							My journey started in 2017, and I've been exploring the ever-evolving world of technology ever since.
						</p>
					</div>

					{}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
						<div className="space-y-4 sm:space-y-6">
							{}
							<div className="border border-terminal-dim p-6 rounded">
								<div className="text-terminal-secondary mb-4">
									<span className="text-terminal-muted">aurora@portfolio</span><span className="text-white">:</span><span className="text-blue-400">~/about</span><span className="text-white">$ </span>cat story.md
								</div>
								<h3 className="text-terminal-primary font-bold text-xl mb-4">MY STORY</h3>
								<p className="text-terminal-secondary leading-relaxed mb-4">
									I'm just someone who's genuinely enthusiastic about learning new things and developing creative solutions.
									I've been programming since 2017, constantly expanding my knowledge and skills over the past 5+ years.
								</p>
								<p className="text-terminal-secondary leading-relaxed">
									The journey has been filled with curiosity, experimentation, and a fair share of schizo vibes.
									I believe in clean code, elegant solutions, and the power of open-source collaboration.
								</p>
							</div>

							{}
							<div className="border border-terminal-dim p-6 rounded">
								<div className="text-terminal-secondary mb-4">
									<span className="text-terminal-muted">aurora@portfolio</span><span className="text-white">:</span><span className="text-blue-400">~/about</span><span className="text-white">$ </span>ls skills/
								</div>
								<h3 className="text-terminal-primary font-bold text-xl mb-4">WHAT I DO</h3>
								<div className="space-y-4">
									<div className="flex items-start gap-4">
										<span className="text-terminal-primary">→</span>
										<div>
											<h4 className="text-terminal-secondary font-semibold">Full-Stack Development</h4>
											<p className="text-terminal-muted text-sm">Building modern web applications with clean architecture</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<span className="text-terminal-primary">→</span>
										<div>
											<h4 className="text-terminal-secondary font-semibold">Problem Solving</h4>
											<p className="text-terminal-muted text-sm">Tackling complex challenges with creative solutions</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<span className="text-terminal-primary">→</span>
										<div>
											<h4 className="text-terminal-secondary font-semibold">Continuous Learning</h4>
											<p className="text-terminal-muted text-sm">Always exploring new technologies and methodologies</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{}
						<div className="text-center">
							<div className="border border-terminal-dim p-6 rounded">
								<div className="text-terminal-secondary mb-4">
									<span className="text-terminal-muted">aurora@portfolio</span><span className="text-white">:</span><span className="text-blue-400">~/about</span><span className="text-white">$ </span>display profile.jpg
								</div>
								<div className="w-48 h-48 bg-terminal-darker rounded border border-terminal-dim flex items-center justify-center mx-auto mb-4">
									<img src={require("../assets/discord/abjhfjljklks1.jpg")} alt="Aurora" className="w-full h-full object-cover rounded" />
								</div>
								<p className="text-terminal-muted">Aurora • Developer</p>
							</div>
						</div>
					</div>

					{}
					<div>
						<div className="text-terminal-secondary mb-6">
							<span className="text-terminal-muted">aurora@portfolio</span><span className="text-white">:</span><span className="text-blue-400">~/about</span><span className="text-white">$ </span>cat tech-stack.json
						</div>

						<div className="grid md:grid-cols-2 gap-6">
							<div className="border border-terminal-dim p-6 rounded">
								<h4 className="text-terminal-primary font-bold text-lg mb-4 flex items-center gap-3">
									<span className="text-terminal-primary">[LANG]</span>
									LANGUAGES
								</h4>
								<div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
									{images.languages.map((item, index) => (
										<a
											key={index}
											href={item.link}
											target="_blank"
											rel="noopener noreferrer"
											className="bg-terminal-darker hover:bg-terminal-dark border border-terminal-dim hover:border-terminal-muted rounded p-3 transition-all duration-300 flex items-center justify-center aspect-square"
										>
											<img
												src={item.img}
												alt={`Language ${index + 1}`}
												className="w-6 h-6 object-contain"
											/>
										</a>
									))}
								</div>
							</div>

							<div className="border border-terminal-dim p-6 rounded">
								<h4 className="text-terminal-primary font-bold text-lg mb-4 flex items-center gap-3">
									<span className="text-terminal-primary">[TOOLS]</span>
									FRAMEWORKS & TOOLS
								</h4>
								<div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
									{images.frameworks.map((item, index) => (
										<a
											key={index}
											href={item.link}
											target="_blank"
											rel="noopener noreferrer"
											className="bg-terminal-darker hover:bg-terminal-dark border border-terminal-dim hover:border-terminal-muted rounded p-3 transition-all duration-300 flex items-center justify-center aspect-square"
										>
											<img
												src={item.img}
												alt={`Framework ${index + 1}`}
												className="w-6 h-6 object-contain"
											/>
										</a>
									))}
								</div>
							</div>
						</div>
					</div>

					{}
					<div>
						<div className="text-terminal-secondary mb-6">
							<span className="text-terminal-muted">aurora@portfolio</span><span className="text-white">:</span><span className="text-blue-400">~/about</span><span className="text-white">$ </span>ls ~/projects/ -la
						</div>

						{loading ? (
							<div className="text-center py-8">
								<div className="text-terminal-primary">Loading repositories...</div>
								<div className={`text-terminal-cursor ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>_</div>
							</div>
						) : repos.length > 0 ? (
							<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								{repos.slice(0, 6).map((repo) => (
									<div key={repo.id} className="border border-terminal-dim bg-terminal-darker p-4 rounded hover:border-terminal-muted transition-all duration-300">
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
													className="text-terminal-dim hover:text-terminal-primary transition-colors"
												>
													<AiOutlineGithub size={16} />
												</a>
												{repo.homepage && (
													<a
														href={repo.homepage}
														target="_blank"
														rel="noopener noreferrer"
														className="text-terminal-dim hover:text-terminal-primary transition-colors"
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
												<AiFillStar className="text-terminal-primary w-3 h-3" />
												<span>{repo.stargazers_count}</span>
											</div>
											{repo.language && (
												<span className="text-terminal-secondary truncate">
													{repo.language}
												</span>
											)}
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="text-center py-8">
								<div className="text-terminal-secondary">No repositories found</div>
								<p className="text-terminal-muted text-sm">Check back later for updates!</p>
							</div>
						)}
					</div>

					{}
					<div className="relative">
						<div className="absolute inset-0 flex items-center" aria-hidden="true">
							<div className="w-full border-t border-terminal-muted"></div>
						</div>
						<div className="relative flex justify-center">
							<div className="bg-terminal-black px-4 py-2">
								<div className="text-terminal-secondary text-sm mb-1">
									<span className="text-terminal-muted">aurora@portfolio</span><span className="text-white">:</span><span className="text-blue-400">~/about</span><span className="text-white">$ </span>cd ../blog
								</div>
								<div className="text-terminal-dim text-xs text-center">
									Entering directory 'blog'...
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
};

export default About;