import React from "react";
import { FaGithub, FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiCodeberg } from "react-icons/si";
import { IoMdKey, IoMdMail } from "react-icons/io";
import Pgp from "../pgp.txt";

const Socials = () => {
	const links = [
		{ name: "GitHub", icon: <FaGithub size={14} />, sub: "convolutionary", url: "https://github.com/convolutionary" },
		{ name: "Email", icon: <IoMdMail size={14} />, sub: "cerfnet@anche.no", url: "mailto:cerfnet@anche.no" },
		{ name: "X", icon: <FaXTwitter size={14} />, sub: "Nocixa", url: "https://x.com/Nocixa" },
		{ name: "Telegram", icon: <FaTelegramPlane size={14} />, sub: "Contact me", url: "https://t.me/" },
		{ name: "Codeberg", icon: <SiCodeberg size={14} />, sub: "Dyslexic", url: "https://codeberg.org/Dyslexic" },
		{ name: "PGP", icon: <IoMdKey size={14} />, sub: "288A F8FD 6457 B638", url: Pgp },
	];

	return (
		<div className="space-y-1">
			{links.map((l, i) => (
				<a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
					className="flex items-center gap-3 py-2 text-tx-dim font-mono text-sm hover:text-accent transition-colors">
					{l.icon} {l.name}
					<span className="text-tx-faint text-xs ml-auto truncate max-w-[180px]">{l.sub}</span>
				</a>
			))}
		</div>
	);
};

export default Socials;
