import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { Link } from "react-scroll";

const Navbar = () => {
	const [nav, setNav] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [notification, setNotification] = useState({ show: false, message: "", animate: false });
	const timeoutRef = useRef(null);

	const handleClick = () => setNav(!nav);

	const handleNotification = (message) => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		setNotification({ show: true, message, animate: true });

		timeoutRef.current = setTimeout(() => {
			setNotification((prev) => ({ ...prev, animate: false }));
			setTimeout(() => {
				setNotification({ show: false, message: "", animate: false });
			}, 300);
		}, 3000);
	};

	const closeNotification = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		setNotification((prev) => ({ ...prev, animate: false }));
		setTimeout(() => {
			setNotification({ show: false, message: "", animate: false });
		}, 300);
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div>
			<div
				className={`fixed top-0 z-10 w-full h-[80px] flex justify-between items-center px-4 ${
					isScrolled ? "bg-[#1e1e1f] bg-opacity-80 shadow-lg" : "bg-[#1e1e1f]"
				} text-gray-300 transition-all duration-300 ease-in-out`}
			>
				{/* Left Side - Logo/Icon */}
				<div className="flex items-center">
					<FaBars className="text-2xl cursor-pointer md:hidden" onClick={handleClick} />
					<h2 className="text-xl font-bold ml-4">Noxia</h2>
				</div>

				{/* Center - Navigation Links */}
				<ul className="hidden md:flex gap-x-4 nav">
					{["home", "about", "contact", "blog"].map((item) => (
						<li
							key={item}
							className="hover:text-white transition-colors duration-200"
							onClick={(e) => {
								if (item === "blog") {
									e.preventDefault();
									handleNotification("Blog not implemented");
								}
							}}
						>
							{item !== "blog" ? (
								<Link to={item} smooth={true} duration={500} offset={-80}>
									{item.charAt(0).toUpperCase() + item.slice(1)}
								</Link>
							) : (
								<span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
							)}
						</li>
					))}
				</ul>

				{/* Right Side - Profile Link */}
				<div
					className="hidden md:flex items-center cursor-pointer"
					onClick={() => handleNotification("Profile not implemented")}
				>
					<FaUserCircle className="text-2xl" />
					<span className="ml-2">Profile</span>
				</div>

				{/* Mobile Menu */}
				<ul
					className={
						!nav
							? "hidden"
							: "nav absolute top-0 left-0 w-full h-screen bg-[#1e1e1f] bg-opacity-80 flex flex-col justify-center items-center"
					}
				>
					{["home", "about", "contact", "blog", "profile"].map((item) => (
						<li
							key={item}
							className="py-6 text-4xl"
							onClick={(e) => {
								handleClick();
								if (item === "blog" || item === "profile") {
									e.preventDefault();
									handleNotification(`${item.charAt(0).toUpperCase() + item.slice(1)} not implemented`);
								}
							}}
						>
							{item !== "blog" && item !== "profile" ? (
								<Link to={item} smooth={true} duration={500} offset={-80}>
									{item.charAt(0).toUpperCase() + item.slice(1)}
								</Link>
							) : (
								<span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
							)}
						</li>
					))}
				</ul>
			</div>

			{/* Notification */}
			{notification.show && (
				<div
					className={`fixed bottom-4 right-4 bg-[#1e1e1f] text-white px-6 py-4 rounded-lg shadow-lg flex items-center justify-between w-96 ${
						notification.animate ? "animate-slide-up" : "animate-slide-down"
					}`}
				>
					<div>
						<p className="font-semibold">{notification.message}</p>
						<p className="text-gray-400">Please try again later.</p>
					</div>
					<button onClick={closeNotification} className="ml-4 bg-white text-black px-3 py-1 rounded">
						Close
					</button>
				</div>
			)}
		</div>
	);
};

export default Navbar;