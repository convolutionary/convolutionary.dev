import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";

const Navbar = () => {
	const [nav, setNav] = useState(false);
	const handleClick = () => setNav(!nav);

	return (
		<div className="fixed top-0 z-10 w-full h-[80px] flex justify-between items-center px-4 bg-[#1e1e1f] text-gray-300">
			<h2>Noxia</h2>
			<ul className="hidden md:flex gap-x-4 nav">
				<li>
					<Link to="home" smooth={true} duration={500} offset={-80}>
						Home
					</Link>
				</li>
				<li>
					<Link to="about" smooth={true} duration={500} offset={-80}>
						About
					</Link>
				</li>
				<li>
					<Link to="contact" smooth={true} duration={500} offset={-80}>
						Contact
					</Link>
				</li>
				<li>
					<Link to="blog" smooth={true} duration={500} offset={-80}>
						Blog
					</Link>
				</li>
			</ul>

			<div onClick={handleClick} className="md:hidden z-10">
				{!nav ? <FaBars /> : <FaTimes />}
			</div>

			<ul
				className={
					!nav
						? "hidden"
						: "nav absolute top-0 left-0 w-full h-screen bg-[#1e1e1f] flex flex-col justify-center items-center"
				}
			>
				<li className="py-6 text-4xl">
					<Link onClick={handleClick} to="home" smooth={true} duration={500} offset={-80}>
						Home
					</Link>
				</li>
				<li className="py-6 text-4xl">
					<Link onClick={handleClick} to="about" smooth={true} duration={500} offset={-80}>
						About
					</Link>
				</li>
				<li className="py-6 text-4xl">
					<Link
						onClick={handleClick}
						to="contact"
						offset={-80}
						smooth={true}
						duration={500}
					>
						Contact
					</Link>
				</li>
				<li className="py-6 text-4xl">
					<Link onClick={handleClick} to="work" smooth={true} duration={500} offset={-80}>
						Blog
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
