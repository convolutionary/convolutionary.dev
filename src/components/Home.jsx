import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { smoothScrollTo } from "../utils/smoothScroll";
import useTypingEffect from "../hooks/useTypingEffect";
import { heroContent } from "../data/content";
import { TerminalPrompt, TerminalCard, SectionDivider, TerminalCursor, AsciiHero } from "./terminal";

const Home = () => {
	const location = useLocation();
	const currentText = useTypingEffect(heroContent.roles);

	useEffect(() => {
		if (location.state?.scrollTo) {
			setTimeout(() => {
				smoothScrollTo(location.state.scrollTo, -80);
			}, 100);
		}
	}, [location]);

	return (
		<section className="min-h-screen bg-terminal-black font-mono text-terminal-primary pt-24 sm:pt-28 md:pt-32" id="home">
			<div className="container mx-auto px-4 py-8 max-w-6xl">
				{/* terminal window */}
				<div className="terminal-window">
					{/* window header */}
					<div className="terminal-header">
						<div className="flex gap-2">
							<div className="terminal-dot red" />
							<div className="terminal-dot yellow" />
							<div className="terminal-dot green" />
						</div>
						<div className="flex-1 text-center text-terminal-muted text-sm font-mono">
							aurora@portfolio:~$
						</div>
					</div>

					{/* terminal body */}
					<div className="p-4 sm:p-6 md:p-8 space-y-8">
						{/* ascii hero with glow */}
						<AsciiHero className="mb-6" />

						{/* bio grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
							{/* whoami */}
							<div>
								<TerminalPrompt path="~" command="whoami" className="mb-4" />
								<div className="space-y-3">
									<div className="flex items-center gap-3 flex-wrap">
										<span className="text-cyan-400 font-mono">[GIT]</span>
										<span className="text-terminal-secondary">GitHub</span>
										<span className="text-terminal-muted">→</span>
										<a
											href="https://github.com/convolutionary"
											target="_blank"
											rel="noopener noreferrer"
											className="text-terminal-primary hover:text-cyan-400 transition-colors underline decoration-terminal-dim hover:decoration-cyan-400"
										>
											github/convolutionary
										</a>
									</div>
								</div>
							</div>

							{/* about.txt */}
							<div>
								<TerminalPrompt path="~" command="cat about.txt" className="mb-4" />
								<div className="text-terminal-muted leading-relaxed space-y-3">
									<p>{heroContent.bio.short}</p>
									<p>{heroContent.bio.medium}</p>
									<p>
										Currently working as a{" "}
										<span className="text-terminal-primary">{currentText}</span>
										<TerminalCursor />
									</p>
								</div>
							</div>
						</div>

						{/* welcome message */}
						<div className="py-4 border-y border-terminal-dim/30">
							<p className="text-terminal-secondary text-center">
								Welcome to my portfolio! - Type{" "}
								<span className="text-cyan-400 font-bold">help</span>{" "}
								for a list of supported commands.
							</p>
						</div>

						{/* stats grid */}
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
							{heroContent.stats.map((stat, index) => (
								<div
									key={index}
									className="text-center p-4 rounded-lg bg-terminal-darker/50 border border-terminal-dim/30 hover:border-terminal-muted/50 transition-all duration-300"
								>
									<div className="text-terminal-primary font-bold text-xl sm:text-2xl mb-1 glitch-hover" data-text={stat.value}>
										{stat.value}
									</div>
									<div className="text-terminal-muted text-xs sm:text-sm">
										{stat.label}
									</div>
								</div>
							))}
						</div>

						{/* projects */}
						<div>
							<TerminalPrompt path="~" command="ls projects/" className="mb-6" />
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
								{heroContent.projects.map((project, index) => (
									<TerminalCard
										key={index}
										tag={project.tag}
										title={project.title}
										hover={true}
									>
										<p className="text-terminal-muted text-sm mb-2">{project.subtitle}</p>
										<p className="text-terminal-secondary text-sm">{project.description}</p>
									</TerminalCard>
								))}
							</div>
						</div>

						{/* section divider */}
						<SectionDivider fromPath="~" toSection="about" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Home;
