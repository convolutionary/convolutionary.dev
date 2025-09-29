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
			{}
			<div className="fixed top-0 left-0 right-0 z-50 bg-terminal-black/95 backdrop-blur-xl border-b border-terminal-muted font-mono">
				<div className="container mx-auto px-4 py-1.5 sm:py-2">
					<div className="flex items-center justify-between text-sm">
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
							<span className="text-terminal-primary hidden sm:inline">all systems operational</span>
							<span className="text-terminal-primary sm:hidden">online</span>
						</div>
						<div className="text-terminal-muted text-xs sm:text-sm">
							{new Date().toLocaleDateString('en-US', {
								month: 'short',
								day: 'numeric',
								year: window.innerWidth > 640 ? 'numeric' : '2-digit'
							})}
						</div>
					</div>
				</div>
			</div>

			{}
			<nav className={`fixed top-5 left-0 right-0 z-40 transition-all duration-300 mobile-menu-container font-mono ${
				isScrolled
					? "bg-terminal-black/90 backdrop-blur-xl border-b border-terminal-muted/50"
					: "bg-terminal-black/70 backdrop-blur-md border-b border-terminal-muted/30"
			}`}>
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between h-14 sm:h-16">
						{}
						<Link to="/" className="text-xl sm:text-2xl font-bold text-terminal-primary hover:text-terminal-secondary transition-colors relative">
							<span className="relative z-10">[AURORA]</span>
						</Link>

						{}
						<div className="hidden md:flex items-center space-x-1">
							{["home", "about", "blog", "contact"].map((item) => (
								<button
									key={item}
									onClick={() => handleNavClick(item)}
									className="relative px-3 lg:px-4 py-2 text-terminal-secondary hover:text-terminal-primary transition-all duration-300 font-medium group text-sm lg:text-base"
								>
									<span className="relative z-10">/{item}</span>
									<div className="absolute inset-0 bg-terminal-muted/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								</button>
							))}
						</div>

						{}
						<button
							onClick={toggleMobileMenu}
							className="md:hidden p-2 rounded border border-terminal-muted hover:bg-terminal-muted/10 transition-colors"
							aria-label="Toggle mobile menu"
						>
							<svg className={`w-5 h-5 text-terminal-secondary transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
								{mobileMenuOpen ? (
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								) : (
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
								)}
							</svg>
						</button>
					</div>

					{}
					<div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
						mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
					}`}>
						<div className="py-4 space-y-2 border-t border-terminal-muted/30 mt-2">
							{["home", "about", "blog", "contact"].map((item) => (
								<button
									key={item}
									onClick={() => handleNavClick(item)}
									className="block w-full text-left px-4 py-3 text-terminal-secondary hover:text-terminal-primary hover:bg-terminal-muted/10 transition-all duration-300 font-medium rounded"
								>
									/{item}
								</button>
							))}
						</div>
					</div>
				</div>
			</nav>

			{}
			{notification.show && (
				<div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 max-w-xs sm:max-w-md font-mono ${
					notification.animate ? "animate-fade-in" : "opacity-0 translate-y-2"
				}`}>
					<div className="bg-terminal-black/90 backdrop-blur-xl border border-terminal-muted rounded p-3 sm:p-4">
						<div className="flex items-start justify-between">
							<div className="flex-1 min-w-0">
								<p className="font-medium text-terminal-primary text-sm sm:text-base">
									[ERROR] {notification.message}
								</p>
								<p className="text-xs sm:text-sm text-terminal-muted mt-1">
									Please try again later
								</p>
							</div>
							<button
								onClick={() => setNotification(prev => ({ ...prev, animate: false }))}
								className="ml-2 sm:ml-4 text-terminal-dim hover:text-terminal-secondary transition-colors p-1 rounded hover:bg-terminal-muted/10 flex-shrink-0"
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