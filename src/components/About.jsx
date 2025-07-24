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
			<div className="container mx-auto px-4 sm:px-6">
				<div className="space-y-12 sm:space-y-16">
					{/* About Header */}
					<div className="text-center">
						<span className="text-xs sm:text-sm font-mono text-gray-400 bg-gray-800 px-2 sm:px-3 py-1 rounded-full mb-4 inline-block">
							About
						</span>
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
							Nice to meet you
						</h2>
						<p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
							I'm a passionate developer who loves building things and solving complex problems. 
							My journey started in 2017, and I've been exploring the ever-evolving world of technology ever since.
						</p>
					</div>

					{/* About Content */}
					<div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
						<div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
							<div className="card p-4 sm:p-6 md:p-8 bg-gray-900">
								<h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">My Story</h3>
								<p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4">
									I'm just someone who's genuinely enthusiastic about learning new things and developing creative solutions. 
									I've been programming since 2017, constantly expanding my knowledge and skills over the past 5+ years.
								</p>
								<p className="text-sm sm:text-base text-gray-300 leading-relaxed">
									The journey has been filled with curiosity, experimentation, and a fair share of schizo vibes. 
									I believe in clean code, elegant solutions, and the power of open-source collaboration.
								</p>
							</div>
							
							<div className="card p-4 sm:p-6 md:p-8 bg-gray-900">
								<h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">What I Do</h3>
								<div className="space-y-3 sm:space-y-4">
									<div className="flex items-start gap-3 sm:gap-4">
										<div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
											<svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
											</svg>
										</div>
										<div className="min-w-0">
											<h4 className="font-semibold text-white text-sm sm:text-base">Full-Stack Development</h4>
											<p className="text-xs sm:text-sm text-gray-300">Building modern web applications with clean architecture</p>
										</div>
									</div>
									<div className="flex items-start gap-3 sm:gap-4">
										<div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
											<svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
											</svg>
										</div>
										<div className="min-w-0">
											<h4 className="font-semibold text-white text-sm sm:text-base">Problem Solving</h4>
											<p className="text-xs sm:text-sm text-gray-300">Tackling complex challenges with creative solutions</p>
										</div>
									</div>
									<div className="flex items-start gap-3 sm:gap-4">
										<div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
											<svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
											</svg>
										</div>
										<div className="min-w-0">
											<h4 className="font-semibold text-white text-sm sm:text-base">Continuous Learning</h4>
											<p className="text-xs sm:text-sm text-gray-300">Always exploring new technologies and methodologies</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						
						<div className="text-center order-1 lg:order-2">
							<div className="inline-block">
								<div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
									<img src={require("../assets/discord/abjhfjljklks1.jpg")} alt="Aurora" className="w-full h-full object-cover rounded-full" />
								</div>
								<p className="text-gray-500 text-xs sm:text-sm">Aurora • Developer</p>
							</div>
						</div>
					</div>

					{/* Tech Stack */}
					<div>
						<div className="text-center mb-8 sm:mb-12">
							<h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Tech Stack</h3>
							<p className="text-sm sm:text-base md:text-lg text-gray-300 px-4">Technologies I work with on a regular basis</p>
						</div>
						
						<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
							<div className="card p-4 sm:p-6 md:p-8 bg-gray-900">
								<h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
									<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
									</svg>
									Languages
								</h4>
								<div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
									{images.languages.map((item, index) => (
										<a 
											key={index} 
											href={item.link} 
											target="_blank" 
											rel="noopener noreferrer"
											className="tech-item p-2 sm:p-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-300 flex items-center justify-center aspect-square"
										>
											<img
												src={item.img}
												alt={`Language ${index + 1}`}
												className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain"
											/>
										</a>
									))}
								</div>
							</div>
							
							<div className="card p-4 sm:p-6 md:p-8 bg-gray-900">
								<h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
									<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
									</svg>
									Frameworks & Tools
								</h4>
								<div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
									{images.frameworks.map((item, index) => (
										<a 
											key={index} 
											href={item.link} 
											target="_blank" 
											rel="noopener noreferrer"
											className="tech-item p-2 sm:p-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-300 flex items-center justify-center aspect-square"
										>
											<img
												src={item.img}
												alt={`Framework ${index + 1}`}
												className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain"
											/>
										</a>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Projects */}
					<div>
						<div className="text-center mb-8 sm:mb-12">
							<h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Featured Projects</h3>
							<p className="text-sm sm:text-base md:text-lg text-gray-300 px-4">A selection of my work and contributions</p>
						</div>
						
						{loading ? (
							<div className="text-center py-8 sm:py-12">
								<div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-white"></div>
								<p className="text-gray-500 mt-4 text-sm sm:text-base">Loading projects...</p>
							</div>
						) : repos.length > 0 ? (
							<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
								{repos.slice(0, 6).map((repo) => (
									<div key={repo.id} className="project-card bg-gray-900 border border-gray-800 p-4 sm:p-6 rounded-lg hover:border-gray-700 transition-all duration-300">
										<div className="flex items-center gap-3 mb-3 sm:mb-4">
											<img
												className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
												src={repo.owner.avatar_url}
												alt={repo.owner.login}
											/>
											<div className="flex-1 min-w-0">
												<p className="text-xs sm:text-sm text-gray-300 truncate">{repo.owner.login}</p>
											</div>
											<div className="flex gap-2">
												<a
													href={repo.html_url}
													target="_blank"
													rel="noopener noreferrer"
													className="text-gray-400 hover:text-white transition-colors"
												>
													<AiOutlineGithub size={18} className="sm:w-5 sm:h-5" />
												</a>
												{repo.homepage && (
													<a
														href={repo.homepage}
														target="_blank"
														rel="noopener noreferrer"
														className="text-gray-400 hover:text-white transition-colors"
													>
														<AiOutlineLink size={18} className="sm:w-5 sm:h-5" />
													</a>
												)}
											</div>
										</div>
										<h4 className="text-base sm:text-lg font-semibold text-white mb-2 truncate">{repo.name}</h4>
										<p className="text-xs sm:text-sm text-gray-300 mb-4 line-clamp-3">
											{repo.description || "No description available"}
										</p>
										<div className="flex items-center justify-between text-xs sm:text-sm text-gray-400">
											<div className="flex items-center gap-1 sm:gap-2">
												<AiFillStar className="text-white w-3 h-3 sm:w-4 sm:h-4" />
												<span>{repo.stargazers_count}</span>
											</div>
											{repo.language && (
												<span className="text-gray-300 truncate ml-2">
													{repo.language}
												</span>
											)}
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="text-center py-8 sm:py-12">
								<div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
									</svg>
								</div>
								<p className="text-gray-300 mb-2 text-sm sm:text-base">No projects available at the moment</p>
								<p className="text-xs sm:text-sm text-gray-500">Check back later for updates!</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
