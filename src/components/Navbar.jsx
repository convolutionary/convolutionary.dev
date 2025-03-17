import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
	const [notification, setNotification] = useState({ show: false, message: "", animate: false });
	const [isScrolled, setIsScrolled] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);
	const timeoutRef = React.useRef(null);
	const lastScrollY = React.useRef(0);
	const location = useLocation();
	const navigate = useNavigate();
	const isHomePage = location.pathname === "/";

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const maxScroll = 20;
			
			const progress = Math.min(currentScrollY / maxScroll, 1);
			setScrollProgress(progress);
			setIsScrolled(progress > 0);
			lastScrollY.current = currentScrollY;
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

	const statusBarHeight = 28 - (scrollProgress * 8);
	const logoHeight = 44 - (scrollProgress * 12);
	const navHeight = 36 - (scrollProgress * 8);
	const scale = 1 - (scrollProgress * 0.1);

	return (
		<div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out will-change-transform ${
			isScrolled ? "nav-scrolled" : "nav-top"
		}`}>
			<div className="bg-[#16161e]/95 text-sm px-4 transition-all duration-300 ease-in-out flex items-center justify-between border-b border-[#1f1f2e]/30"
				style={{ height: `${statusBarHeight}px` }}>
				<div className="flex items-center gap-2">
					<span className="status-dot online transition-all duration-300 ease-in-out"></span>
					<span className="text-white/50 transition-all duration-300 ease-in-out text-xs tracking-wide">
						all systems operational ✨
					</span>
				</div>
			</div>

			<div className="bg-[#16161e]/95 border-b border-[#1f1f2e]/30 transition-all duration-300 ease-in-out backdrop-blur-lg">
				<div className="max-w-[1024px] mx-auto">
					<div className="transition-all duration-300 ease-in-out border-b border-[#1f1f2e]/30 overflow-hidden flex items-center justify-center"
						style={{ height: `${logoHeight}px` }}>
						<Link to="/">
							<h1 className="text-2xl transition-all duration-300 ease-in-out transform-gpu"
								style={{ transform: `scale(${scale})` }}>
								<span className="bg-gradient-to-r from-[#7f08f7] to-[#b366ff] bg-clip-text text-transparent hover:to-[#7f08f7] transition-all duration-500 cursor-pointer font-medium">
									Aurora
								</span>
							</h1>
						</Link>
					</div>
					
					<nav className="flex justify-center transition-all duration-300 ease-in-out overflow-hidden"
						style={{ height: `${navHeight}px` }}>
						{["home", "about", "blog", "contact"].map((item) => (
							<button
								key={item}
								onClick={() => handleNavClick(item)}
								className={`relative mx-4 transition-all duration-300 ease-in-out text-white/50 hover:text-white group flex items-center`}
								style={{ 
									fontSize: `${14 - (scrollProgress * 2)}px`,
									padding: `${6 - (scrollProgress * 2)}px 0`
								}}
							>
								{item}
								<span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-[#7f08f7] to-[#b366ff] transition-all duration-300 ease-in-out opacity-0 group-hover:w-full group-hover:opacity-100"></span>
							</button>
						))}
					</nav>
				</div>
			</div>

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