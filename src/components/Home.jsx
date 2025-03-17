import React from "react";

const Home = () => {
	return (
		<div className="w-full pt-[140px]" id="home">
			<div className="max-w-[1024px] mx-auto px-8">
				<div className="flex flex-col gap-6">
					<div className="glass-card">
						<div className="sparkle-wrapper" />
						<div className="flex items-center gap-2 mb-4">
							<span className="text-[#7f08f7] text-2xl animate-pulse-slow">#</span>
							<h1 className="text-2xl group">
								<span className="bg-gradient-to-r from-[#7f08f7] to-[#b366ff] bg-clip-text text-transparent hover:text-white transition-all duration-300">
									Aurora
								</span>
							</h1>
							<div className="ml-2 w-2 h-4 bg-[#7f08f7] animate-blink"></div>
						</div>

						<div className="text-sm text-white/80 space-y-3">
							<div className="flex items-center gap-2">
								<p className="typing-animation inline-block">Hi, I'm</p>
								<span className="bg-gradient-to-r from-[#7f08f7] to-[#b366ff] bg-clip-text text-transparent hover:text-white transition-all duration-300">
									Aurora
								</span>
							</div>
							<p className="leading-relaxed max-w-[600px] hover:text-white/90 transition-colors">
								I'm a self-taught software developer, passionate about creating elegant solutions. 
								I thrive on contributing to open-source projects and continuously expanding my knowledge 
								in software development.
							</p>
						</div>
					</div>

				</div>
			</div>

			<div className="news-scroll fixed bottom-0 left-0 right-0 w-full">
				<span className="text-white/60">
					Latest Projects (you'll never find em) • Welcome to my digital space
				</span>
			</div>
		</div>
	);
};

export default Home;
