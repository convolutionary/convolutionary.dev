import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { smoothScrollTo } from "../utils/smoothScroll";
import { heroContent } from "../data/content";
import { CountUp } from "./bits";
import Window from "./Window";

const Home = () => {
	const location = useLocation();
	useEffect(() => {
		if (location.state?.scrollTo) setTimeout(() => smoothScrollTo(location.state.scrollTo, -24), 100);
	}, [location]);

	return (
		<section id="home" className="px-4 md:px-8 pt-8">
			<div className="flex flex-col lg:flex-row gap-4 items-start max-w-5xl mx-auto">

				{/* main welcome window */}
				<div className="flex-1 w-full">
					<Window title="Welcome to aurora.">
						<div className="flex flex-col sm:flex-row gap-4">
							{/* photo */}
							<div className="sm:w-40 shrink-0">
								<img
									src={require("../assets/discord/abjhfjljklks1.jpg")}
									alt="Aurora"
									className="w-full border border-black"
									style={{ imageRendering: 'auto' }}
								/>
							</div>

							{/* info */}
							<div>
								<p style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 6 }}>
									Aurora
								</p>
								<p style={{ marginBottom: 8 }}>
									{heroContent.bio.short}
								</p>
								<div className="os-hr" />
								<p style={{ color: '#666', fontSize: 11 }}>
									{heroContent.roles.join(' • ')}
								</p>
							</div>
						</div>
					</Window>
				</div>

				{/* stats window — small, sits beside */}
				<div className="w-full lg:w-56 shrink-0">
					<Window title="Stats">
						{heroContent.stats.slice(0, 3).map((stat, i) => {
							const numMatch = stat.value.match(/(\d+)/);
							const numValue = numMatch ? parseInt(numMatch[1]) : null;
							const suffix = stat.value.replace(/\d+/, '');
							return (
								<div key={i} style={{ marginBottom: i < 2 ? 8 : 0 }}>
									<span style={{ fontSize: 18, fontWeight: 'bold' }}>
										{numValue !== null ? (
											<><CountUp to={numValue} duration={2} delay={0.5 + i * 0.2} />{suffix}</>
										) : stat.value}
									</span>
									<br />
									<span style={{ fontSize: 10, color: '#666' }}>{stat.label}</span>
								</div>
							);
						})}
						<div className="os-hr" />
						<a href="https://github.com/convolutionary" target="_blank" rel="noopener noreferrer"
							style={{ fontSize: 11 }}>
							github.com/convolutionary
						</a>
					</Window>
				</div>
			</div>
		</section>
	);
};

export default Home;
