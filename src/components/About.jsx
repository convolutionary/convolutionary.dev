import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import images from "./images";

const About = () => {
	const [repos, setRepos] = useState([]);

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
			}
		};

		fetchRepos();
	}, []);
	
	return (
		<div className="w-full pt-4 pb-[24px]" id="about">
			<div className="max-w-[1024px] mx-auto px-8">
				<div className="flex flex-col gap-4">
					<div className="glass-card">
						<div className="sparkle-wrapper" />
						<div className="flex items-center gap-2 mb-4">
							<span className="text-[#7f08f7] text-2xl animate-pulse-slow">#</span>
							<h1 className="text-2xl">
								<span className="bg-gradient-to-r from-[#7f08f7] to-[#b366ff] bg-clip-text text-transparent">
									About me
								</span>
							</h1>
						</div>
						<div className="bg-[#16161e] border-2 border-[#1f1f2e] rounded-lg p-4 hover:border-[#7f08f7]/30 transition-colors">
							<p className="text-sm text-white/80 hover:text-white/90 transition-colors">
								I'm just bored, enthusiastic about learning new things and developing random funnies. 
								I've been programming since 2017, and trying to expand my knowledge and skills in the 
								last 5 years. :) schizo vibes
							</p>
						</div>
					</div>

					<div className="glass-card">
						<div className="sparkle-wrapper" />
						<div className="flex items-center gap-2 mb-4">
							<span className="text-[#7f08f7] text-2xl animate-pulse-slow">#</span>
							<h2 className="text-2xl">
								<span className="bg-gradient-to-r from-[#7f08f7] to-[#b366ff] bg-clip-text text-transparent">
									Tech Stack
								</span>
							</h2>
						</div>
						<div className="flex flex-col gap-4">
							<section className="flex flex-col md:flex-row items-center gap-4">
								<h3 className="min-w-[12em] text-center p-2 bg-[#16161e] border-2 border-[#1f1f2e] rounded-lg text-sm hover:border-[#7f08f7]/30 transition-colors">
									Languages
								</h3>
								<div className="about_tech bg-[#16161e] border-2 border-[#1f1f2e] p-4 rounded-lg hover:border-[#7f08f7]/30 transition-colors">
									{images.languages.map((item) => (
										<a key={item.link} className="group" href={item.link} target="_blank" rel="noopener noreferrer">
											<img
												className="group-hover:scale-110 transition-all"
												src={item.img}
												alt=""
											/>
										</a>
									))}
								</div>
							</section>
							<section className="flex flex-col md:flex-row items-center gap-4">
								<h3 className="min-w-[12em] text-center p-2 bg-[#16161e] border-2 border-[#1f1f2e] rounded-lg text-sm hover:border-[#7f08f7]/30 transition-colors">
									Technologies & Frameworks
								</h3>
								<div className="about_tech bg-[#16161e] border-2 border-[#1f1f2e] p-4 rounded-lg hover:border-[#7f08f7]/30 transition-colors">
									{images.frameworks.map((item) => (
										<a key={item.link} className="group" href={item.link} target="_blank" rel="noopener noreferrer">
											<img
												className="group-hover:scale-110 transition-all"
												src={item.img}
												alt=""
											/>
										</a>
									))}
								</div>
							</section>
						</div>
					</div>

					<div className="glass-card">
						<div className="sparkle-wrapper" />
						<div className="flex items-center gap-2 mb-4">
							<span className="text-[#7f08f7] text-2xl animate-pulse-slow">#</span>
							<h2 className="text-2xl">
								<span className="bg-gradient-to-r from-[#7f08f7] to-[#b366ff] bg-clip-text text-transparent">
									Projects
								</span>
							</h2>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{repos.map((repo) => (
								<a
									key={repo.id}
									href={repo.html_url}
									target="_blank"
									rel="noopener noreferrer"
									className="bg-[#16161e] border-2 border-[#1f1f2e] p-4 rounded-lg hover:border-[#7f08f7] transition-all hover:scale-[1.02]"
								>
									<div className="inline-flex gap-x-3 items-center mb-2">
										<img
											className="w-6 h-6 rounded-full"
											src={repo.owner.avatar_url}
											alt="avatar"
										/>
										<span className="text-sm text-white/60">{repo.owner.login}</span>
									</div>
									<div>
										<h3 className="text-base mb-1 text-white/90 hover:text-white transition-colors">{repo.name}</h3>
										<p className="text-sm text-white/60 max-h-[20px] text-nowrap overflow-hidden text-ellipsis">
											{repo.description || "No description"}
										</p>
										<div className="flex items-center gap-x-2 mt-2">
											<AiFillStar className="text-[#7f08f7] group-hover:text-[#b366ff] transition-colors"/>
											<span className="text-sm text-white/40">{repo.stargazers_count}</span>
										</div>
									</div>
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
