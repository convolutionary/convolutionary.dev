import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineGithub, AiOutlineLink } from "react-icons/ai";
import images from "./images";

const About = () => {
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(true);

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
	
	return (
		<div className="section" id="about">
			<div className="container mx-auto px-4">
				<div className="space-y-16">
					{/* About Header */}
					<div className="text-center">
						<span className="text-sm font-mono text-gray-400 bg-gray-800 px-3 py-1 rounded-full mb-4 inline-block">
							About
						</span>
						<h2 className="text-4xl font-bold text-white mb-6">
							Nice to meet you
						</h2>
						<p className="text-lg text-gray-300 max-w-2xl mx-auto">
							I'm a passionate developer who loves building things and solving complex problems. 
							My journey started in 2017, and I've been exploring the ever-evolving world of technology ever since.
						</p>
					</div>

					{/* About Content */}
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-6">
							<div className="card p-8 bg-gray-900">
								<h3 className="text-2xl font-bold text-white mb-4">My Story</h3>
								<p className="text-gray-300 leading-relaxed mb-4">
									I'm just someone who's genuinely enthusiastic about learning new things and developing creative solutions. 
									I've been programming since 2017, constantly expanding my knowledge and skills over the past 5+ years.
								</p>
								<p className="text-gray-300 leading-relaxed">
									The journey has been filled with curiosity, experimentation, and a fair share of schizo vibes. 
									I believe in clean code, elegant solutions, and the power of open-source collaboration.
								</p>
							</div>
							
							<div className="card p-8 bg-gray-900">
								<h3 className="text-2xl font-bold text-white mb-4">What I Do</h3>
								<div className="space-y-4">
									<div className="flex items-start gap-4">
										<div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
											<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
											</svg>
										</div>
										<div>
											<h4 className="font-semibold text-white">Full-Stack Development</h4>
											<p className="text-sm text-gray-300">Building modern web applications with clean architecture</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
											<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
											</svg>
										</div>
										<div>
											<h4 className="font-semibold text-white">Problem Solving</h4>
											<p className="text-sm text-gray-300">Tackling complex challenges with creative solutions</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
											<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
											</svg>
										</div>
										<div>
											<h4 className="font-semibold text-white">Continuous Learning</h4>
											<p className="text-sm text-gray-300">Always exploring new technologies and methodologies</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						
						<div className="text-center">
							<div className="inline-block">
								<div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
									{/* <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
									</svg> */}
									<img src={require("../assets/discord/abjhfjljklks1.jpg")} alt="Aurora" className="w-full h-full object-cover rounded-full" />
								</div>
								<p className="text-gray-500 text-sm">Aurora • Developer</p>
							</div>
						</div>
					</div>

					{/* Tech Stack */}
					<div>
						<div className="text-center mb-12">
							<h3 className="text-3xl font-bold text-white mb-4">Tech Stack</h3>
							<p className="text-gray-300">Technologies I work with on a regular basis</p>
						</div>
						
						<div className="grid md:grid-cols-2 gap-8">
							<div className="card p-8 bg-gray-900">
								<h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
									</svg>
									Languages
								</h4>
								<div className="tech-grid">
									{images.languages.map((item, index) => (
										<a 
											key={index} 
											href={item.link} 
											target="_blank" 
											rel="noopener noreferrer"
											className="tech-item"
										>
											<img
												src={item.img}
												alt={`Language ${index + 1}`}
												className="w-8 h-8 object-contain"
											/>
										</a>
									))}
								</div>
							</div>
							
							<div className="card p-8 bg-gray-900">
								<h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
									</svg>
									Frameworks & Tools
								</h4>
								<div className="tech-grid">
									{images.frameworks.map((item, index) => (
										<a 
											key={index} 
											href={item.link} 
											target="_blank" 
											rel="noopener noreferrer"
											className="tech-item"
										>
											<img
												src={item.img}
												alt={`Framework ${index + 1}`}
												className="w-8 h-8 object-contain"
											/>
										</a>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Projects */}
					<div>
						<div className="text-center mb-12">
							<h3 className="text-3xl font-bold text-white mb-4">Featured Projects</h3>
							<p className="text-gray-300">A selection of my work and contributions</p>
						</div>
						
						{loading ? (
							<div className="text-center py-12">
								<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
								<p className="text-gray-500 mt-4">Loading projects...</p>
							</div>
						) : repos.length > 0 ? (
							<div className="project-grid">
								{repos.slice(0, 6).map((repo) => (
									<div key={repo.id} className="project-card">
										<div className="project-card-header">
											<img
												className="project-avatar"
												src={repo.owner.avatar_url}
												alt={repo.owner.login}
											/>
											<div className="flex-1 min-w-0">
												<p className="text-sm text-gray-300 truncate">{repo.owner.login}</p>
											</div>
											<div className="flex gap-2">
												<a
													href={repo.html_url}
													target="_blank"
													rel="noopener noreferrer"
													className="text-gray-400 hover:text-white transition-colors"
												>
													<AiOutlineGithub size={20} />
												</a>
												{repo.homepage && (
													<a
														href={repo.homepage}
														target="_blank"
														rel="noopener noreferrer"
														className="text-gray-400 hover:text-white transition-colors"
													>
														<AiOutlineLink size={20} />
													</a>
												)}
											</div>
										</div>
										<h4 className="project-card-title">{repo.name}</h4>
										<p className="project-card-description">
											{repo.description || "No description available"}
										</p>
										<div className="project-card-footer">
											<div className="flex items-center gap-2">
												<AiFillStar className="text-white" />
												<span>{repo.stargazers_count}</span>
											</div>
											{repo.language && (
												<span className="text-gray-300">
													{repo.language}
												</span>
											)}
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="text-center py-12">
								<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
									</svg>
								</div>
								<p className="text-gray-300 mb-2">No projects available at the moment</p>
								<p className="text-sm text-gray-500">Check back later for updates!</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
