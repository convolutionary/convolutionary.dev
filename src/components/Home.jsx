import React from "react";
import Socials from "./Socials";

const Home = () => {
	return (
<<<<<<< HEAD
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
=======
		// <div className="w-full min-h-screen max-h-full bg-[#202021] mt-[80px]" name="home"> decidere
		<div className="w-full min-h-screen bg-[#202021] mt-[80px]" name="home">
			<div className="max-w-[1024px] mx-auto p-8 h-full">
				<div className="flex flex-col gap-y-8">
					<h1 className="text-4xl text-[#7f08f7] font-bold"># Home</h1>
					<h1 className="text-4xl text-[#E5E5E5] font-bold">
						Hello, I'm <span className="text-[#7f08f7]">Noxia</span>
					</h1>
					<p className="text-[#E5E5E5] text-xl">
						I'm a dedicated software developer with a passion for creating efficient and innovative solutions. 
						I actively contribute to open-source projects and am committed to continuous learning and 
						professional growth in software development.
					</p>
					<div className="flex flex-col gap-y-4 max-w-[340px]">
						<p className="text-[#E5E5E5] font-bold text-lg">
							Connect with me:
>>>>>>> 2787e87763407e4083da49d7858ecbef4cfc1f62
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
