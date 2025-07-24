import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
	const [notification, setNotification] = useState({ show: false, message: "", animate: false });
	const [isScrolled, setIsScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

	// Close mobile menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (mobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
				setMobileMenuOpen(false);
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	}, [mobileMenuOpen]);

	// Close mobile menu on route change
	useEffect(() => {
		setMobileMenuOpen(false);
	}, [location]);

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
		setMobileMenuOpen(false); // Close mobile menu
		if (isHomePage) {
			const element = document.getElementById(item);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		} else {
			navigate('/', { state: { scrollTo: item } });
		}
	};

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	return (
		<>
			{/* Status Bar */}
			<div className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-gray-800/50">
				<div className="container mx-auto px-4 py-2">
					<div className="flex items-center justify-between text-sm">
						<div className="flex items-center gap-2">
							<div className="status-dot online"></div>
							<span className="text-gray-300 font-mono hidden sm:inline">all systems operational</span>
							<span className="text-gray-300 font-mono sm:hidden">online</span>
						</div>
						<div className="text-gray-500 font-mono text-xs sm:text-sm">
							{new Date().toLocaleDateString('en-US', { 
								month: 'short', 
								day: 'numeric',
								year: window.innerWidth > 640 ? 'numeric' : '2-digit'
							})}
						</div>
					</div>
				</div>
			</div>

			{/* Main Navigation */}
			<nav className={`fixed top-5 left-0 right-0 z-40 transition-all duration-300 mobile-menu-container ${
				isScrolled 
					? "bg-black/80 backdrop-blur-xl border-b border-gray-800/30 shadow-lg shadow-black/20" 
					: "bg-black/60 backdrop-blur-md border-b border-gray-800/20"
			}`}>
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between h-12 sm:h-16">
						{/* Logo */}
						<Link to="/" className="text-xl sm:text-2xl font-bold text-white hover:text-gray-300 transition-colors relative">
							<span className="relative z-10">Aurora</span>
							<div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 -m-2"></div>
						</Link>

						{/* Desktop Navigation Links */}
						<div className="hidden md:flex items-center space-x-1">
							{["home", "about", "blog", "contact"].map((item) => (
								<button
									key={item}
									onClick={() => handleNavClick(item)}
									className="relative px-3 lg:px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 capitalize font-medium group text-sm lg:text-base"
								>
									<span className="relative z-10">{item}</span>
									<div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"></div>
									<div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								</button>
							))}
						</div>

						{/* Mobile Menu Button */}
						<button 
							onClick={toggleMobileMenu}
							className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm border border-gray-800/30"
							aria-label="Toggle mobile menu"
						>
							<svg className={`w-5 h-5 text-gray-300 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
								{mobileMenuOpen ? (
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								) : (
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
								)}
							</svg>
						</button>
					</div>

					{/* Mobile Menu */}
					<div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
						mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
					}`}>
						<div className="py-4 space-y-2 border-t border-gray-800/30 mt-2">
							{["home", "about", "blog", "contact"].map((item) => (
								<button
									key={item}
									onClick={() => handleNavClick(item)}
									className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 capitalize font-medium rounded-lg"
								>
									{item}
								</button>
							))}
						</div>
					</div>
				</div>
			</nav>

			{/* Notification Toast */}
			{notification.show && (
				<div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 max-w-xs sm:max-w-md ${
					notification.animate ? "animate-fade-in" : "opacity-0 translate-y-2"
				}`}>
					<div className="bg-black/80 backdrop-blur-xl border border-gray-800/50 rounded-lg p-3 sm:p-4 shadow-lg shadow-black/20">
						<div className="flex items-start justify-between">
							<div className="flex-1 min-w-0">
								<p className="font-medium text-white text-sm sm:text-base">
									{notification.message}
								</p>
								<p className="text-xs sm:text-sm text-gray-400 mt-1">
									Please try again later
								</p>
							</div>
							<button 
								onClick={() => setNotification(prev => ({ ...prev, animate: false }))}
								className="ml-2 sm:ml-4 text-gray-400 hover:text-gray-200 transition-colors p-1 rounded hover:bg-white/10 flex-shrink-0"
							>
								<svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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