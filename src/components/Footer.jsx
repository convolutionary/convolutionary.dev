import React from "react";

// no footer — the menu bar IS the navigation
// just a tiny credit at the bottom
const Footer = () => (
	<div style={{
		textAlign: 'center',
		padding: '8px 0 12px',
		fontSize: 10,
		color: '#8a857e',
		fontFamily: "'Chicago', 'Geneva', sans-serif",
		position: 'relative',
		zIndex: 10,
	}}>
		© {new Date().getFullYear()} aurora
	</div>
);

export default Footer;
