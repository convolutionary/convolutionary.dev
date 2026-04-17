import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { smoothScrollTo } from "../utils/smoothScroll";
import { heroContent } from "../data/content";
import { CountUp } from "./bits";
import ShowScene, { SceneIcon, Pane } from "./show/ShowScene";

const Home = () => {
	const location = useLocation();
	useEffect(() => {
		if (location.state?.scrollTo) setTimeout(() => smoothScrollTo(location.state.scrollTo, -34), 100);
	}, [location]);

	const sequence = [
		["id-icon", "id-pane"],
		["welcome-icon", "welcome-pane"],
		["stats-icon", "stats-pane"],
	];

	return (
		<ShowScene
			id="home"
			title="aurora."
			subtitle="self-taught · open-source · web"
			sequence={sequence}
			height={320}
		>
			<SceneIcon id="id-icon"      x={10} y={34} label="identity.card" icon="card" />
			<SceneIcon id="welcome-icon" x={10} y={56} label="welcome.rtf"  icon="document" />
			<SceneIcon id="stats-icon"   x={10} y={78} label="stats.txt"    icon="calculator" />

			<Pane id="id-pane" x={38} y={42} width={420} title="identity.card">
				<div style={{ display: 'flex', gap: 14 }}>
					<div style={{ flex: '0 0 140px' }}>
						<img src={require("../assets/discord/abjhfjljklks1.jpg")} alt="Aurora"
							className="w-full border border-black" style={{ display: 'block' }} />
					</div>
					<div style={{ flex: 1 }}>
						<p style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 6 }}>Aurora</p>
						<p style={{ fontSize: 12, marginBottom: 8, lineHeight: 1.45 }}>{heroContent.bio.short}</p>
						<div className="os-hr" />
						<p style={{ color: '#666', fontSize: 10 }}>{heroContent.roles.join(' • ')}</p>
					</div>
				</div>
			</Pane>

			<Pane id="welcome-pane" x={70} y={36} width={460} title="Welcome to aurora.">
				<p style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1.15, marginBottom: 10 }}>
					hi, i'm aurora — i build tiny, elegant, open things.
				</p>
				<p style={{ fontSize: 12, color: '#333', marginBottom: 10, lineHeight: 1.5 }}>
					{heroContent.bio.medium}
				</p>
				<div className="os-hr" />
				<p style={{ fontSize: 10, color: '#666' }}>
					⌘ scroll to continue — each folder opens as you go.
				</p>
			</Pane>

			<Pane id="stats-pane" x={62} y={72} width={520} title="Stats">
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
					{heroContent.stats.slice(0, 3).map((stat, i) => {
						const numMatch = stat.value.match(/(\d+)/);
						const numValue = numMatch ? parseInt(numMatch[1]) : null;
						const suffix = stat.value.replace(/\d+/, '');
						return (
							<div key={i} style={{ textAlign: 'center', padding: '6px 4px', borderRight: i < 2 ? '1px dotted #999' : 'none' }}>
								<div style={{ fontSize: 30, fontWeight: 'bold', lineHeight: 1 }}>
									{numValue !== null ? (
										<><CountUp to={numValue} duration={2} delay={0.2 + i * 0.2} />{suffix}</>
									) : stat.value}
								</div>
								<div style={{ fontSize: 10, color: '#666', marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
									{stat.label}
								</div>
							</div>
						);
					})}
				</div>
			</Pane>
		</ShowScene>
	);
};

export default Home;
