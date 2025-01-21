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
				className={`fixed top-0 z-10 w-full h-[80px] flex justify-between items-center px-8 ${
					isScrolled ? "glass shadow-lg" : "bg-transparent"
				} transition-all duration-300 ease-in-out`}
			>
				{/* Left Side - Logo/Icon */}
				<div className="flex items-center">
					<FaBars className="text-2xl cursor-pointer md:hidden hover:text-[#7f08f7] transition-colors" onClick={handleClick} />
					<h2 className="text-2xl font-bold ml-4 bg-gradient-to-r from-[#7f08f7] to-[#b366ff] bg-clip-text text-transparent">Noxia</h2>
				</div>

				{/* Center - Navigation Links */}
				<ul className="hidden md:flex gap-x-8 nav">
					{["home", "about", "contact", "blog"].map((item) => (
						<li
							key={item}
							className="nav-link"
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
					className="hidden md:flex items-center cursor-pointer hover:text-[#7f08f7] transition-colors"
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
							: "nav absolute top-0 left-0 w-full h-screen glass backdrop-blur-lg flex flex-col justify-center items-center gap-y-8"
					}
				>
					{["home", "about", "contact", "blog", "profile"].map((item) => (
						<li
							key={item}
							className="text-3xl hover:text-[#7f08f7] transition-colors"
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
					className={`fixed bottom-4 right-4 glass px-6 py-4 rounded-xl flex items-center justify-between max-w-md ${
						notification.animate ? "animate-slide-up" : "animate-slide-down"
					}`}
				>
					<div>
						<p className="font-semibold">{notification.message}</p>
						<p className="text-white/60">Please try again later.</p>
					</div>
					<button onClick={closeNotification} className="ml-4 glass-card px-4 py-2 hover:text-[#7f08f7]">
						Close
					</button>
				</div>
			)}
		</div>
	);
};

export default Navbar;