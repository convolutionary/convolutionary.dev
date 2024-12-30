import React from "react";
import { PiBrain } from "react-icons/pi";

const Footer = () => {
	return (
		<div className="w-full bg-[#232627] mt-[80px]" name="home">
			<div className="max-w-[1024px] mx-auto p-8 h-full flex items-center justify-center">
				<p className="text-white">
					Made with <PiBrain color="#7f08f7" size={20} className="inline"/> by Noxcia
				</p>
			</div>
		</div>
	);
};

export default Footer;
