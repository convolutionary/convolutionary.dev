import React from "react";
import { FaGithub, FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiCodeberg } from "react-icons/si";
import { IoMdKey, IoMdMail } from "react-icons/io";
import Pgp from "../pgp.txt";

const Socials = () => {
	const socialLinks = [
		{
			name: "GitHub",
			icon: <FaGithub size={20} className="text-white" />,
			username: "convolutionary",
			url: "https://github.com/convolutionary",
			color: "text-white"
		},
		{
			name: "Email",
			icon: <IoMdMail size={20} className="text-white" />,
			username: "cerfnet@anche.no",
			url: "mailto:cerfnet@anche.no",
			color: "text-white"
		},
		{
			name: "X (Twitter)",
			icon: <FaXTwitter size={20} className="text-white" />,
			username: "Nocixa",
			url: "https://x.com/Nocixa",
			color: "text-white"
		},
		{
			name: "Telegram",
			icon: <FaTelegramPlane size={20} className="text-white" />,
			username: "Contact me",
			url: "https://t.me/",
			color: "text-white"
		},
		{
			name: "Codeberg",
			icon: <SiCodeberg size={20} className="text-white" />,
			username: "Dyslexic",
			url: "https://codeberg.org/Dyslexic",
			color: "text-white"
		},
		{
			name: "PGP Key",
			icon: <IoMdKey size={20} className="text-white" />,
			username: "288A F8FD 6457 B638",
			url: Pgp,
			color: "text-white"
		}
	];

	return (
		<div className="space-y-4">
			{socialLinks.map((link, index) => (
				<a
					key={index}
					href={link.url}
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-4 p-3 rounded-lg border border-gray-700 hover:border-gray-600 hover:bg-gray-800 transition-all group"
				>
					<div className={`${link.color} group-hover:text-gray-200 transition-colors`}>
						{link.icon}
					</div>
					<div className="flex-1 min-w-0">
						<p className="font-medium text-white group-hover:text-gray-200 transition-colors">
							{link.name}
						</p>
						<p className="text-sm text-gray-400 truncate">
							{link.username}
						</p>
					</div>
					<div className="text-gray-500 group-hover:text-gray-400 transition-colors">
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
						</svg>
					</div>
				</a>
			))}
		</div>
	);
};

export default Socials;
