import React from "react";
import Socials from "./Socials";

const Home = () => {
	return (
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
						</p>
						<Socials />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
