import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
	const [notification, setNotification] = useState({ show: false, message: "", animate: false });
	const [isScrolled, setIsScrolled] = useState(false);
	const timeoutRef = React.useRef(null);
	const location = useLocation();
	const navigate = useNavigate();
	const isHomePage = location.pathname === "/";

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			setIsScrolled(scrollTop > 20);
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

	const handleNavClick = (item) => {
		if (isHomePage) {
			const element = document.getElementById(item);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		} else {
			navigate('/', { state: { scrollTo: item } });
		}
	};

	return (
		<>
			{/* Status Bar */}
			<div className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-gray-800/50">
				<div className="container mx-auto px-4 py-2">
					<div className="flex items-center justify-between text-sm">
						<div className="flex items-center gap-2">
							<div className="status-dot online"></div>
							<span className="text-gray-300 font-mono">all systems operational</span>
						</div>
						<div className="text-gray-500 font-mono">
							{new Date().toLocaleDateString()}
						</div>
					</div>
				</div>
			</div>

			{/* Main Navigation */}
			<nav className={`fixed top-5 left-0 right-0 z-40 transition-all duration-300 ${
				isScrolled 
					? "bg-black/80 backdrop-blur-xl border-b border-gray-800/30 shadow-lg shadow-black/20" 
					: "bg-black/60 backdrop-blur-md border-b border-gray-800/20"
			}`}>
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between h-16">
						{/* Logo */}
						<Link to="/" className="text-2xl font-bold text-white hover:text-gray-300 transition-colors relative">
							<span className="relative z-10">Aurora</span>
							<div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 -m-2"></div>
						</Link>

						{/* Navigation Links */}
						<div className="hidden md:flex items-center space-x-1">
							{["home", "about", "blog", "contact"].map((item) => (
								<button
									key={item}
									onClick={() => handleNavClick(item)}
									className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 capitalize font-medium group"
								>
									<span className="relative z-10">{item}</span>
									<div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"></div>
									<div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								</button>
							))}
						</div>

						{/* Mobile Menu Button */}
						<button className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm border border-gray-800/30">
							<svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
					</div>
				</div>
			</nav>

			{/* Notification Toast */}
			{notification.show && (
				<div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
					notification.animate ? "animate-fade-in" : "opacity-0 translate-y-2"
				}`}>
					<div className="bg-black/80 backdrop-blur-xl border border-gray-800/50 rounded-lg p-4 max-w-md shadow-lg shadow-black/20">
						<div className="flex items-start justify-between">
							<div>
								<p className="font-medium text-white">
									{notification.message}
								</p>
								<p className="text-sm text-gray-400 mt-1">
									Please try again later
								</p>
							</div>
							<button 
								onClick={() => setNotification(prev => ({ ...prev, animate: false }))}
								className="ml-4 text-gray-400 hover:text-gray-200 transition-colors p-1 rounded hover:bg-white/10"
							>
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Navbar;