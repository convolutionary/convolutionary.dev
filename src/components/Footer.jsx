import React from "react";
import { FaRegHeart } from "react-icons/fa6";

const Footer = () => {
	return (
		<div className="w-full bg-[#232627] mt-[80px]" name="home">
			<div className="max-w-[1024px] mx-auto p-8 h-full flex items-center justify-center">
				<p className="text-white">
					Made with <FaRegHeart color="#f00" size={20} className="inline"/> by Noxcia
				</p>
			</div>
		</div>
	);
};

export default Footer;
