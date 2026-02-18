import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "motion/react";
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
		<section className="min-h-screen pt-32 pb-20" id="home">
			<div className="container mx-auto px-6 max-w-6xl">

				{/* hero */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[70vh]">

					{/* left - text */}
					<div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
							className="mb-6"
						>
							<span className="text-clay font-mono text-sm">{"// hello world"}</span>
						</motion.div>

						<h1 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85] mb-8 flex items-baseline">
							<BlurText
								text="aurora"
								className="text-ink-primary"
								delay={50}
								animateBy="chars"
								direction="top"
							/>
							<span className="text-clay">.</span>
						</h1>

						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.4 }}
							className="text-ink-secondary text-lg max-w-md mb-8 leading-relaxed"
						>
							{heroContent.bio.short}
						</motion.p>

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 }}
							className="flex flex-wrap gap-3"
						>
							{heroContent.roles.map((role, i) => (
								<span
									key={i}
									className="px-4 py-2 border border-line text-ink-muted text-sm font-mono hover:border-clay hover:text-clay transition-colors"
								>
									{role}
								</span>
							))}
						</motion.div>
					</div>

					{/* right - card */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
					>
						<div className="bg-bento-bg/95 border border-line backdrop-blur-sm">
							{/* image */}
							<div className="aspect-[4/3] relative overflow-hidden">
								<img
									src={require("../assets/discord/abjhfjljklks1.jpg")}
									alt="Aurora"
									className="w-full h-full object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-bento-bg via-transparent to-transparent" />

								{/* status */}
								<div className="absolute top-4 right-4">
									<div className="flex items-center gap-2 px-3 py-1.5 bg-bento-bg/90 border border-line text-xs font-mono">
										<div className="w-2 h-2 bg-green-500 animate-pulse" />
										<span className="text-ink-muted">online</span>
									</div>
								</div>

								{/* name overlay */}
								<div className="absolute bottom-4 left-4">
									<h2 className="text-2xl font-bold text-white">Aurora</h2>
									<p className="text-white/60 text-sm font-mono">developer</p>
								</div>
							</div>

							{/* stats */}
							<div className="grid grid-cols-3 divide-x divide-line border-t border-line">
								{heroContent.stats.slice(0, 3).map((stat, i) => {
									const numMatch = stat.value.match(/(\d+)/);
									const numValue = numMatch ? parseInt(numMatch[1]) : null;
									const suffix = stat.value.replace(/\d+/, '');

									return (
										<div key={i} className="p-4 text-center">
											<span className="text-xl font-bold text-ink-primary font-mono block">
												{numValue !== null ? (
													<>
														<CountUp to={numValue} duration={2} delay={0.8 + i * 0.1} />
														{suffix}
													</>
												) : stat.value}
											</span>
											<span className="text-ink-muted text-xs mt-1 block">{stat.label}</span>
										</div>
									);
								})}
							</div>
						</div>
					</motion.div>
				</div>

				{/* bottom links */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.7 }}
					>
						<Magnet padding={40} magnetStrength={2}>
							<a
								href="https://github.com/convolutionary"
								target="_blank"
								rel="noopener noreferrer"
								className="block p-6 bg-bento-bg/95 border border-line backdrop-blur-sm group hover:border-clay transition-colors"
							>
								<div className="flex items-center gap-2 mb-3">
									<div className="w-2 h-2 bg-clay" />
									<span className="text-clay font-mono text-sm">github</span>
								</div>
								<p className="text-xl font-bold text-ink-primary group-hover:text-clay transition-colors font-mono">
									@convolutionary
								</p>
								<p className="text-ink-muted text-sm mt-1">projects & code</p>
							</a>
						</Magnet>
					</motion.div>

					{heroContent.projects.slice(0, 2).map((project, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.8 + i * 0.1 }}
						>
							<div className="p-6 bg-bento-bg/95 border border-line backdrop-blur-sm group hover:border-line-hover transition-colors h-full">
								<span className="text-clay text-xs font-mono">{project.tag}</span>
								<h3 className="text-lg font-bold text-ink-primary mt-2 group-hover:text-clay transition-colors">
									{project.title}
								</h3>
								<p className="text-ink-muted text-sm mt-1">{project.subtitle}</p>
							</div>
						</motion.div>
					))}
				</div>

				{/* scroll indicator */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.2 }}
					className="flex justify-center mt-20"
				>
					<motion.div
						animate={{ y: [0, 8, 0] }}
						transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
						className="text-ink-muted"
					>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
						</svg>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default Home;
