import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { smoothScrollTo } from "../utils/smoothScroll";
import { navItems } from "../data/navigation";

// classic mac menu bar — apple logo + nav items
const Navbar = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const isHome = location.pathname === "/";

	const go = (item) => {
		isHome ? smoothScrollTo(item, -24) : navigate('/', { state: { scrollTo: item } });
	};

	return (
		<div className="menubar">
			<span className="menubar-item bold">aurora.</span>
			{navItems.map((item) => (
				<button key={item} onClick={() => go(item)} className="menubar-item capitalize">
					{item}
				</button>
			))}
		</div>
	);
};

export default Navbar;
