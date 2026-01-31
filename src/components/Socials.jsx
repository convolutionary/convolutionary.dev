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
			icon: <FaGithub size={18} />,
			username: "convolutionary",
			url: "https://github.com/convolutionary",
		},
		{
			name: "Email",
			icon: <IoMdMail size={18} />,
			username: "cerfnet@anche.no",
			url: "mailto:cerfnet@anche.no",
		},
		{
			name: "X (Twitter)",
			icon: <FaXTwitter size={18} />,
			username: "Nocixa",
			url: "https://x.com/Nocixa",
		},
		{
			name: "Telegram",
			icon: <FaTelegramPlane size={18} />,
			username: "Contact me",
			url: "https://t.me/",
		},
		{
			name: "Codeberg",
			icon: <SiCodeberg size={18} />,
			username: "Dyslexic",
			url: "https://codeberg.org/Dyslexic",
		},
		{
			name: "PGP Key",
			icon: <IoMdKey size={18} />,
			username: "288A F8FD 6457 B638",
			url: Pgp,
		}
	];

	return (
		<div className="space-y-3">
			{socialLinks.map((link, index) => (
				<a
					key={index}
					href={link.url}
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-4 p-3 rounded-bento border border-line hover:border-clay hover:bg-clay-bg/30 transition-all duration-200 group"
				>
					<div className="text-ink-muted group-hover:text-clay transition-colors">
						{link.icon}
					</div>
					<div className="flex-1 min-w-0">
						<p className="font-medium text-ink-primary group-hover:text-clay transition-colors">
							{link.name}
						</p>
						<p className="text-sm text-ink-muted truncate">
							{link.username}
						</p>
					</div>
					<svg
						className="w-4 h-4 text-ink-subtle group-hover:text-clay group-hover:translate-x-0.5 transition-all"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
					</svg>
				</a>
			))}
		</div>
	);
};

export default Socials;
