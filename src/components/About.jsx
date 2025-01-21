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
		<div className="min-h-screen bg-[#202021]" name="about">
			<div className="max-w-[1024px] mx-auto p-8 h-full">
				<div className="flex flex-col gap-y-8">
					<h1 className="text-4xl text-[#7f08f7] font-bold">About Me</h1>
					<p className="text-[#E5E5E5] text-xl">
						I am a passionate software developer with a focus on web technologies and application development. Since 2017, 
						I have been dedicated to expanding my technical expertise and creating innovative solutions. 
						I enjoy tackling complex problems and continuously learning new technologies to enhance my skill set.
					</p>
					<h2 className="text-2xl text-[#7f08f7] font-bold">## Tech Stack</h2>
					<div className="flex flex-col gap-3 min-w-[160px]">
						<section className="flex flex-col md:flex-row items-center gap-2 text-[#E5E5E5]">
							<h3 className="min-w-[12em] text-center p-[.5em] bg-[#29292b] rounded-full font-bold">
								Languages
							</h3>
							<div className="about_tech">
								{images.languages.map((item) => (
									<a className="group" href={item.link}>
										<img
											className="group-hover:scale-110 transition-all"
											src={item.img}
											alt=""
										/>
									</a>
								))}
							</div>
						</section>
						<hr />
						<section className="flex flex-col md:flex-row items-center gap-2 text-[#E5E5E5]">
							<h3 className="min-w-[12em] text-center p-[.5em] bg-[#29292b] rounded-full font-bold">
								Technologies & Frameworks
							</h3>
							<div className="about_tech text-center md:text-left">
								{images.frameworks.map((item) => (
									<a className="group" href={item.link}>
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

					<h2 className="text-2xl text-[#7f08f7] font-bold">## Projects</h2>
					<div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-3">
						{repos.map((repo) => (
							<a
								href={repo.html_url}
								target="blank"
								className="bg-[#29292b] p-4 rounded-md border-2 border-gray-500 text-white hover:scale-105 hover:shadow-2xl hover:bg-[#1a1a1b] hover:border-gray-700 transition-all"
							>
								<div className="inline-flex gap-x-3">
									<img
										className="w-[24px] rounded-full"
										src={repo.owner.avatar_url}
										alt="avatar"
									/>
									<span>{repo.owner.login}</span>
								</div>
								<div>
									<h3 className="text-xl font-semibold">{repo.name}</h3>
									<p className="max-h-[24px] text-nowrap overflow-hidden text-ellipsis">
										{repo.description || "No description"}
									</p>
									<div className="flex items-center gap-x-2">
										<AiFillStar color="#7f08f7"/>
										<span>{repo.stargazers_count}</span>
									</div>
								</div>
							</a>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
