import React from "react";
import Socials from "./Socials";

const Home = () => {
	return (
		<div className="w-full min-h-screen mt-[80px] relative" name="home">
			{/* Background gradient circles */}
			<div className="absolute top-20 left-20 w-96 h-96 bg-[#7f08f7]/30 rounded-full blur-3xl"></div>
			<div className="absolute bottom-20 right-20 w-96 h-96 bg-[#b366ff]/20 rounded-full blur-3xl"></div>
			
			<div className="max-w-[1024px] mx-auto p-8 h-full relative">
				<div className="glass-card flex flex-col gap-y-8">
					<h1 className="text-4xl bg-gradient-to-r from-[#7f08f7] to-[#b366ff] bg-clip-text text-transparent font-bold"># Home</h1>
					<h1 className="text-5xl font-bold">
						Hi, I'm <span className="bg-gradient-to-r from-[#7f08f7] to-[#b366ff] bg-clip-text text-transparent">Noxia</span>
					</h1>
					<p className="text-xl text-white/80">
						I'm a self-taught software developer, passionate about creating elegant solutions. 
						I thrive on contributing to open-source projects and continuously expanding my knowledge 
						in software development.
					</p>
					<div className="flex flex-col gap-y-6">
						<p className="text-lg font-semibold text-white/90">
							Connect with me across the web:
						</p>
						<div className="glass p-4 rounded-xl">
							<Socials />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
