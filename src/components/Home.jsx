import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { smoothScrollTo } from "../utils/smoothScroll";
import { heroContent } from "../data/content";
import { BlurText, CountUp, Magnet } from "./bits";

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
		<section className="min-h-screen bg-bento-bg pt-20 pb-16 relative z-10" id="home">
			<div className="container mx-auto px-6 max-w-7xl">
				{/* hero - asymmetric split layout */}
				<div className="grid lg:grid-cols-12 gap-6 lg:gap-8 min-h-[85vh] items-center">

					{/* left column - big statement */}
					<div className="lg:col-span-7 space-y-8">
						{/* name with oversized typography */}
						<div className="space-y-4">
							<p className="text-clay font-mono text-sm tracking-wider">// hello world</p>
							<h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-none">
								<BlurText
									text="aurora"
									className="gradient-text"
									delay={100}
									animateBy="chars"
									direction="top"
								/>
							</h1>
							<div className="flex flex-wrap gap-3 text-ink-muted">
								{heroContent.roles.map((role, i) => (
									<span key={i} className="px-3 py-1 rounded-full border border-line text-sm">
										{role}
									</span>
								))}
							</div>
						</div>

						{/* bio - offset position */}
						<div className="max-w-xl pl-4 border-l-2 border-clay/30">
							<p className="text-ink-secondary text-lg leading-relaxed">
								{heroContent.bio.short}
							</p>
						</div>

						{/* stats row - horizontal strip */}
						<div className="flex flex-wrap gap-8 pt-4">
							{heroContent.stats.slice(0, 3).map((stat, i) => {
								// parse numeric value for countup
								const numMatch = stat.value.match(/(\d+)/);
								const numValue = numMatch ? parseInt(numMatch[1]) : null;
								const suffix = stat.value.replace(/\d+/, '');

								return (
									<div key={i} className="group">
										<span className="text-4xl lg:text-5xl font-bold text-ink-primary block group-hover:text-clay transition-colors">
											{numValue !== null ? (
												<>
													<CountUp to={numValue} duration={2} delay={i * 0.2} />
													{suffix}
												</>
											) : (
												stat.value
											)}
										</span>
										<span className="text-ink-muted text-sm">{stat.label}</span>
									</div>
								);
							})}
						</div>
					</div>

					{/* right column - stacked cards */}
					<div className="lg:col-span-5 space-y-5">
						{/* profile card - larger, more prominent */}
						<div className="bg-bento-surface rounded-2xl border border-line p-6 hover:border-line-hover transition-all group">
							<div className="flex items-start gap-5">
								<div className="w-20 h-20 rounded-xl bg-bento-surface-alt border border-line overflow-hidden shrink-0">
									<img
										src={require("../assets/discord/abjhfjljklks1.jpg")}
										alt="Aurora"
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									/>
								</div>
								<div className="flex-1 min-w-0">
									<h2 className="text-lg font-semibold text-ink-primary mb-1">About Me</h2>
									<p className="text-ink-muted text-sm leading-relaxed">
										{heroContent.bio.medium}
									</p>
								</div>
							</div>
						</div>

						{/* github card with magnet effect */}
						<Magnet padding={50} magnetStrength={3}>
							<a
								href="https://github.com/convolutionary"
								target="_blank"
								rel="noopener noreferrer"
								className="block bg-bento-surface rounded-2xl border border-line p-5 hover:border-clay/50 hover:bg-bento-surface-alt transition-all group"
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="w-2 h-2 rounded-full bg-clay animate-pulse" />
										<span className="text-clay font-medium">GitHub</span>
									</div>
									<svg className="w-5 h-5 text-ink-subtle group-hover:text-clay group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
									</svg>
								</div>
								<p className="text-xl text-ink-primary font-semibold mt-3 group-hover:text-clay transition-colors">
									@convolutionary
								</p>
							</a>
						</Magnet>

						{/* featured work - compact cards */}
						<div className="grid grid-cols-2 gap-4">
							{heroContent.projects.map((project, i) => (
								<div
									key={i}
									className="bg-bento-surface rounded-xl border border-line p-4 hover:border-line-hover transition-all group cursor-pointer"
								>
									<span className="text-clay text-xs font-mono">{project.tag}</span>
									<h3 className="text-ink-primary font-medium mt-2 group-hover:text-clay transition-colors">
										{project.title}
									</h3>
									<p className="text-ink-muted text-xs mt-1">{project.subtitle}</p>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* scroll hint - bottom left corner */}
				<div className="absolute bottom-8 left-8 hidden lg:flex items-center gap-3 text-ink-subtle">
					<div className="w-px h-16 bg-line" />
					<span className="text-xs rotate-180 writing-mode-vertical">scroll</span>
				</div>
			</div>
		</section>
	);
};

export default Home;
