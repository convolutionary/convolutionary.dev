import React, { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { smoothScrollTo } from "../utils/smoothScroll";
import { navItems } from "../data/navigation";
import { useActiveSection } from "../hooks/useActiveSection";

const Navbar = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const isHome = location.pathname === "/";
	const [active, setActive] = useState("home");

	const onSection = useCallback((id) => setActive(id), []);
	useActiveSection(onSection);

	const go = (item) => {
		isHome ? smoothScrollTo(item, -34) : navigate('/', { state: { scrollTo: item } });
	};

	return (
		<div className="menubar">
			<span className="menubar-item bold">aurora.</span>
			{navItems.map((item) => (
				<button
					key={item}
					onClick={() => go(item)}
					className={`menubar-item capitalize ${isHome && active === item ? 'active' : ''}`}
				>
					{item}
				</button>
			))}
		</div>
	);
};

export default Navbar;
