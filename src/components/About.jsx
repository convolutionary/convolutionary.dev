import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import images from "./images";

const About = () => {
	const [repos, setRepos] = useState([]);

	useEffect(() => {
		const fetchRepos = async () => {
			try {
				const response = await fetch(
					"https://api.github.com/users/xoncia/repos"
				);
				const data = await response.json();
				setRepos(data);
			} catch (error) {
				console.error("Error fetching repos:", error);
				setRepos([]);
			}
		};

		fetchRepos();
	}, []);
	
	return (
		<div className="min-h-screen relative" name="about">
			{/* Background gradient circles */}
			<div className="absolute top-40 left-20 w-96 h-96 bg-[#7f08f7]/20 rounded-full blur-3xl"></div>
			<div className="absolute bottom-40 right-20 w-96 h-96 bg-[#b366ff]/20 rounded-full blur-3xl"></div>
			
			<div className="max-w-[1024px] mx-auto p-8 h-full relative">
				<div className="flex flex-col gap-y-12">
					<div className="glass-card">
						<h1 className="text-4xl bg-gradient-to-r from-[#7f08f7] to-[#b366ff] bg-clip-text text-transparent font-bold mb-6"># About me</h1>
						<p className="text-xl text-white/80">
							I'm just bored, enthusiastic about learning new things and developing random funnies. I've been programming since 2017,
							and trying to expand my knowledge and skills in the last 5 years. :)
							schizo vibes
						</p>
					</div>

					<div className="glass-card">
						<h2 className="text-2xl bg-gradient-to-r from-[#7f08f7] to-[#b366ff] bg-clip-text text-transparent font-bold mb-6">## Tech Stack</h2>
						<div className="flex flex-col gap-6">
							<section className="flex flex-col md:flex-row items-center gap-4">
								<h3 className="min-w-[12em] text-center p-[.5em] glass rounded-full font-bold text-white/90">
									Languages
								</h3>
								<div className="about_tech glass p-4 rounded-xl">
									{images.languages.map((item) => (
										<a key={item.link} className="group" href={item.link}>
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
								<h3 className="min-w-[12em] text-center p-[.5em] glass rounded-full font-bold text-white/90">
									Technologies & Frameworks
								</h3>
								<div className="about_tech glass p-4 rounded-xl text-center md:text-left">
									{images.frameworks.map((item) => (
										<a key={item.link} className="group" href={item.link}>
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
						<h2 className="text-2xl bg-gradient-to-r from-[#7f08f7] to-[#b366ff] bg-clip-text text-transparent font-bold mb-6">## Projects</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{repos.map((repo) => (
								<a
									key={repo.id}
									href={repo.html_url}
									target="blank"
									className="glass p-4 rounded-xl hover:bg-white/[0.15] hover:scale-[1.02] transition-all"
								>
									<div className="inline-flex gap-x-3 items-center mb-2">
										<img
											className="w-[24px] rounded-full"
											src={repo.owner.avatar_url}
											alt="avatar"
										/>
										<span className="text-white/90">{repo.owner.login}</span>
									</div>
									<div>
										<h3 className="text-xl font-semibold mb-1">{repo.name}</h3>
										<p className="max-h-[24px] text-nowrap overflow-hidden text-ellipsis text-white/70">
											{repo.description || "No description"}
										</p>
										<div className="flex items-center gap-x-2 mt-2">
											<AiFillStar className="text-[#7f08f7]"/>
											<span className="text-white/60">{repo.stargazers_count}</span>
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
