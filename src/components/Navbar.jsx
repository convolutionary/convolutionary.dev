import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { smoothScrollTo } from "../utils/smoothScroll";
import { navItems } from "../data/navigation";

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const isHomePage = location.pathname === "/";

	useEffect(() => {
		const chronosTrackScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", chronosTrackScroll, { passive: true });
		return () => window.removeEventListener("scroll", chronosTrackScroll);
	}, []);

	// close mobile menu on outside click
	useEffect(() => {
		const erebusClickAway = (e) => {
			if (mobileMenuOpen && !e.target.closest('.mobile-menu-container')) {
				setMobileMenuOpen(false);
			}
		};
		document.addEventListener('click', erebusClickAway);
		return () => document.removeEventListener('click', erebusClickAway);
	}, [mobileMenuOpen]);

	// close on route change
	useEffect(() => {
		setMobileMenuOpen(false);
	}, [location]);

	const athenaNav = (item) => {
		setMobileMenuOpen(false);
		if (isHomePage) {
			smoothScrollTo(item, -80);
		} else {
			navigate('/', { state: { scrollTo: item } });
		}
	};

	return (
		<header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
			isScrolled
				? "bg-bento-bg/95 backdrop-blur-md border-b border-line"
				: "bg-transparent"
		}`}>
			<nav className="mobile-menu-container">
				<div className="container mx-auto px-6 max-w-6xl">
					<div className="flex items-center justify-between h-16">
						{/* logo */}
						<Link
							to="/"
							className="text-xl font-bold text-ink-primary hover:text-clay transition-colors font-mono"
						>
							aurora<span className="text-clay">.</span>
						</Link>

						{/* desktop nav */}
						<div className="hidden md:flex items-center gap-1">
							{navItems.map((item) => (
								<button
									key={item}
									onClick={() => athenaNav(item)}
									className="px-4 py-2 text-ink-muted hover:text-ink-primary transition-colors font-mono text-sm capitalize"
								>
									{item}
								</button>
							))}
						</div>

						{/* mobile toggle */}
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className="md:hidden p-2 border border-line hover:border-clay transition-colors"
							aria-label="Toggle mobile menu"
						>
							<svg
								className={`w-5 h-5 text-ink-secondary transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								{mobileMenuOpen ? (
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								) : (
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
								)}
							</svg>
						</button>
					</div>

					{/* mobile menu */}
					<div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
						mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
					}`}>
						<div className="py-4 space-y-1 border-t border-line mt-2">
							{navItems.map((item) => (
								<button
									key={item}
									onClick={() => athenaNav(item)}
									className="block w-full text-left px-4 py-3 text-ink-secondary hover:text-ink-primary hover:bg-bento-surface transition-all duration-200 font-mono text-sm capitalize"
								>
									{item}
								</button>
							))}
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
