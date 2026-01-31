import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { smoothScrollTo } from "../utils/smoothScroll";
import { heroContent } from "../data/content";
import { BentoCard, BentoGrid } from "./bento";

const Home = () => {
	const location = useLocation();

	useEffect(() => {
		if (location.state?.scrollTo) {
			setTimeout(() => {
				smoothScrollTo(location.state.scrollTo, -80);
			}, 100);
		}
	}, [location]);

	return (
		<section className="min-h-screen bg-bento-bg pt-24 pb-16" id="home">
			<div className="container mx-auto px-6 max-w-6xl">
				{/* hero header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-ink-primary mb-4">
						aurora
					</h1>
					<p className="text-lg md:text-xl text-ink-muted max-w-xl mx-auto">
						{heroContent.roles.join(' / ')}
					</p>
				</div>

				{/* bento grid */}
				<BentoGrid>
					{/* profile card - tall */}
					<BentoCard span="tall" className="flex flex-col">
						<div className="w-20 h-20 rounded-full bg-bento-surface-alt border border-line overflow-hidden mb-4">
							<img
								src={require("../assets/discord/abjhfjljklks1.jpg")}
								alt="Aurora"
								className="w-full h-full object-cover"
							/>
						</div>
						<h2 className="text-xl font-semibold text-ink-primary mb-2">About Me</h2>
						<p className="text-ink-secondary leading-relaxed flex-1">
							{heroContent.bio.short}
						</p>
						<p className="text-ink-muted text-sm mt-4">
							{heroContent.bio.medium}
						</p>
					</BentoCard>

					{/* github card */}
					<BentoCard accent>
						<span className="text-clay text-sm font-medium">GitHub</span>
						<a
							href="https://github.com/convolutionary"
							target="_blank"
							rel="noopener noreferrer"
							className="block mt-2 text-ink-primary hover:text-clay transition-colors font-medium"
						>
							@convolutionary
						</a>
						<p className="text-ink-muted text-sm mt-1">Check out my projects</p>
					</BentoCard>

					{/* stats cards */}
					{heroContent.stats.slice(0, 2).map((stat, index) => (
						<BentoCard key={index}>
							<span className="text-3xl font-semibold text-ink-primary">{stat.value}</span>
							<span className="block text-ink-muted text-sm mt-1">{stat.label}</span>
						</BentoCard>
					))}

					{/* more stats */}
					{heroContent.stats.slice(2).map((stat, index) => (
						<BentoCard key={index + 2}>
							<span className="text-3xl font-semibold text-ink-primary">{stat.value}</span>
							<span className="block text-ink-muted text-sm mt-1">{stat.label}</span>
						</BentoCard>
					))}

					{/* projects card - wide */}
					<BentoCard span="wide">
						<h3 className="text-lg font-semibold text-ink-primary mb-4">Featured Work</h3>
						<div className="grid sm:grid-cols-2 gap-4">
							{heroContent.projects.map((project, index) => (
								<div
									key={index}
									className="p-4 rounded-bento bg-bento-surface-alt border border-line"
								>
									<span className="text-clay text-xs font-medium">{project.tag}</span>
									<h4 className="text-ink-primary font-medium mt-1">{project.title}</h4>
									<p className="text-ink-muted text-sm mt-1">{project.subtitle}</p>
								</div>
							))}
						</div>
					</BentoCard>
				</BentoGrid>

				{/* welcome message */}
				<div className="text-center mt-12 py-6 border-t border-line">
					<p className="text-ink-muted">
						Welcome to my portfolio - scroll down to learn more about what I do.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Home;
