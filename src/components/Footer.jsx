import React from "react";
import { PiBrain } from "react-icons/pi";

const Footer = () => {
	return (
		<div className="w-full mt-[80px] relative" name="home">
			<div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
			<div className="max-w-[1024px] mx-auto p-8 h-full relative">
				<div className="glass-card flex items-center justify-center">
					<p className="text-white/90 flex items-center gap-2">
						Made with <PiBrain className="text-[#7f08f7] hover:scale-110 transition-all" size={24}/> by 
						<span className="bg-gradient-to-r from-[#7f08f7] to-[#b366ff] bg-clip-text text-transparent font-medium">
							Noxcia
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
