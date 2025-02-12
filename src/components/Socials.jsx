import React from "react";
import { FaDiscord, FaGithub, FaTelegramPlane } from "react-icons/fa";
import Pgp from "../pgp.txt";
import { FaXTwitter } from "react-icons/fa6";
import { SiCodeberg } from "react-icons/si";
import { IoMdKey, IoMdMail } from "react-icons/io";
import discordBanner from "../assets/discord/banner.gif";
import discordPfp from "../assets/discord/pfp.png";

const Socials = () => {
	return (
		<div className="flex flex-col gap-y-4">
			<div className="w-full">
				<div className="bg-[#232627] rounded-lg relative">
					<div className="w-full">
						<img
							className="object-cover w-full h-[64px] rounded-t-lg"
							src={discordBanner}
							alt=""
						/>
					</div>
					<div className="flex items-center flex-row h-[72px] text-[#E5E5E5]">
						<img
							className="rounded-full m-[10px] w-[48px] h-[48px]"
							src={discordPfp}
							alt=""
						/>
						<p className="text-xl font-medium">pyrexcia</p>
						<FaDiscord className="absolute bottom-[8px] right-[8px] text-[#7f08f7] text-xl"></FaDiscord>
					</div>
				</div>
			</div>
			<div>
				<ul className="flex flex-col text-sm gap-y-2">
					<li className="inline-flex gap-x-2 items-center text-white">
						<FaGithub size={30} />
						<p className="hidden md:block font-bold min-w-20">Github</p>
						<div className="bg-[#29292b] px-2 rounded-full inline-block">
							<a href="https://github.com/convolutionary" target="blank">
								Aurora
							</a>
						</div>
					</li>
					<li className="inline-flex gap-x-2 items-center text-[#2fa6d9]">
						<FaTelegramPlane size={30} />
						<p className="hidden md:block font-bold min-w-20">Telegram</p>
						<div className="bg-[#29292b] px-2 rounded-full inline-block">
							<a href="https://t.me/" target="blank">
								redacted
							</a>
						</div>
					</li>
					<li className="inline-flex gap-x-2 items-center text-[#face39]">
						<IoMdMail size={30} />
						<p className="hidden md:block font-bold min-w-20">E-mail</p>
						<div className="bg-[#29292b] px-2 rounded-full inline-block">
							<a
								className="text-[12px] min-[234px]:text-md"
								href="mailto:cerfnet@anche.no"
								target="blank"
							>
								cerfnet@anche.no
							</a>
						</div>
					</li>
					<li className="inline-flex gap-x-2 items-center text-black">
						<FaXTwitter size={30} />
						<p className="hidden md:block font-bold min-w-20">X</p>
						<div className="bg-[#29292b] px-2 rounded-full inline-block">
							<a href="https://x.com/Nocixa" target="blank">
								Nocixa
							</a>
						</div>
					</li>
					<li className="inline-flex gap-x-2 items-center text-[#2285d1]">
						<SiCodeberg size={30} />
						<p className="hidden md:block font-bold min-w-20">Codeberg</p>
						<div className="bg-[#29292b] px-2 rounded-full inline-block">
							<a href="https://codeberg.org/Dyslexic" target="blank">
								Dyslexic
							</a>
						</div>
					</li>
					<li className="inline-flex gap-x-2 items-center text-white">
						<IoMdKey size={30} />
						<p className="hidden md:block font-bold min-w-20">PGP</p>
						<div className="bg-[#29292b] px-2 rounded-full inline-block">
							<a href={Pgp} target="blank">
								288A F8FD 6457 B638
							</a>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Socials;
