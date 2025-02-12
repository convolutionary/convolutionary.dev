import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";

const Navbar = () => {
	const [notification, setNotification] = useState({ show: false, message: "", animate: false });
	const [isScrolled, setIsScrolled] = useState(false);
	const timeoutRef = React.useRef(null);
	const lastScrollY = React.useRef(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const scrollThreshold = 5;
			
			if (Math.abs(currentScrollY - lastScrollY.current) > scrollThreshold) {
				setIsScrolled(currentScrollY > 10);
				lastScrollY.current = currentScrollY;
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleNotification = (message) => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setNotification({ show: true, message, animate: true });
		timeoutRef.current = setTimeout(() => {
			setNotification((prev) => ({ ...prev, animate: false }));
			setTimeout(() => {
				setNotification({ show: false, message: "", animate: false });
			}, 300);
		}, 3000);
	};

	return (
		<div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out will-change-transform ${
			isScrolled ? "nav-scrolled" : "nav-top"
		}`}>
			{/* Status bar */}
			<div className={`bg-[#16161e]/95 text-sm px-4 transition-all duration-700 ease-in-out flex items-center justify-between border-b border-[#1f1f2e]/30 ${
				isScrolled ? "h-6 opacity-90" : "h-7"
			}`}>
				<div className="flex items-center gap-2">
					<span className="status-dot online transition-all duration-700 ease-in-out"></span>
					<span className="text-white/50 transition-all duration-700 ease-in-out text-xs tracking-wide">
						all systems operational ✨
					</span>
				</div>
			</div>

			{/* Main navbar */}
			<div className="bg-[#16161e]/95 border-b border-[#1f1f2e]/30 transition-all duration-700 ease-in-out backdrop-blur-lg">
				<div className="max-w-[1024px] mx-auto">
					{/* Logo section */}
					<div className={`transition-all duration-700 ease-in-out border-b border-[#1f1f2e]/30 overflow-hidden flex items-center justify-center ${
						isScrolled ? "h-8" : "h-11"
					}`}>
						<h1 className={`text-2xl transition-all duration-700 ease-in-out transform-gpu ${
							isScrolled ? "scale-90 -translate-y-0.5" : "scale-100"
						}`}>
							<span className="bg-gradient-to-r from-[#7f08f7] to-[#b366ff] bg-clip-text text-transparent hover:to-[#7f08f7] transition-all duration-500 cursor-pointer font-medium">
								Aurora
							</span>
						</h1>
					</div>
					
					{/* Navigation */}
					<nav className={`flex justify-center transition-all duration-700 ease-in-out overflow-hidden ${
						isScrolled ? "h-7" : "h-9"
					}`}>
						{["home", "about", "contact", "blog"].map((item) => (
							<Link
								key={item}
								to={item}
								spy={true}
								offset={-60}
								className={`relative mx-4 transition-all duration-700 ease-in-out text-white/50 hover:text-white group ${
									isScrolled ? "text-sm py-1" : "text-base py-1.5"
								}`}
								smooth={true}
								duration={700}
								onClick={(e) => {
									if (item === "blog") {
										e.preventDefault();
										handleNotification("Blog not implemented");
									}
								}}
							>
								{item}
								<span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-[#7f08f7] to-[#b366ff] transition-all duration-300 ease-in-out opacity-0 group-hover:w-full group-hover:opacity-100"></span>
							</Link>
						))}
					</nav>
				</div>
			</div>

			{/* Notification */}
			{notification.show && (
				<div
					className={`fixed bottom-4 right-4 bg-[#16161e]/95 border border-[#1f1f2e] px-6 py-4 rounded-lg flex items-center justify-between max-w-md z-50 backdrop-blur-lg ${
						notification.animate ? "animate-slide-up" : "animate-slide-down"
					}`}
				>
					<div>
						<p className="font-medium bg-gradient-to-r from-[#7f08f7] to-[#b366ff] bg-clip-text text-transparent">
							{notification.message}
						</p>
						<p className="text-sm text-white/40">Please try again later ✨</p>
					</div>
					<button 
						onClick={() => setNotification(prev => ({ ...prev, animate: false }))}
						className="ml-4 px-4 py-2 rounded-lg text-white/50 hover:text-white bg-[#1f1f2e]/50 hover:bg-[#7f08f7]/20 border border-[#1f1f2e]/50 hover:border-[#7f08f7]/50 transition-all duration-300"
					>
						Close
					</button>
				</div>
			)}
		</div>
	);
};

export default Navbar;