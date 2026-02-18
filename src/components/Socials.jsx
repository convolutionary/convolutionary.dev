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
			icon: <FaGithub size={16} />,
			username: "convolutionary",
			url: "https://github.com/convolutionary",
		},
		{
			name: "Email",
			icon: <IoMdMail size={16} />,
			username: "cerfnet@anche.no",
			url: "mailto:cerfnet@anche.no",
		},
		{
			name: "X (Twitter)",
			icon: <FaXTwitter size={16} />,
			username: "Nocixa",
			url: "https://x.com/Nocixa",
		},
		{
			name: "Telegram",
			icon: <FaTelegramPlane size={16} />,
			username: "Contact me",
			url: "https://t.me/",
		},
		{
			name: "Codeberg",
			icon: <SiCodeberg size={16} />,
			username: "Dyslexic",
			url: "https://codeberg.org/Dyslexic",
		},
		{
			name: "PGP Key",
			icon: <IoMdKey size={16} />,
			username: "288A F8FD 6457 B638",
			url: Pgp,
		}
	];

	return (
		<div className="space-y-2">
			{socialLinks.map((link, index) => (
				<a
					key={index}
					href={link.url}
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-3 p-3 border border-line hover:border-clay transition-colors group"
				>
					<div className="text-ink-muted group-hover:text-clay transition-colors">
						{link.icon}
					</div>
					<div className="flex-1 min-w-0">
						<p className="font-medium text-ink-primary text-sm group-hover:text-clay transition-colors">
							{link.name}
						</p>
						<p className="text-xs text-ink-muted truncate font-mono">
							{link.username}
						</p>
					</div>
					<span className="text-ink-subtle group-hover:text-clay transition-colors">→</span>
				</a>
			))}
		</div>
	);
};

export default Socials;
