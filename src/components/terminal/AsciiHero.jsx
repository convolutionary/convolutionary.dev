import React from 'react';
import useMobileDetect from '../../hooks/useMobileDetect';

// responsive ASCII art with that fresh cyberpunk frame
const AsciiHero = ({ className = '' }) => {
	const isMobile = useMobileDetect(768);

	const desktopArt = `
╔════════════════════════════════════════════════════╗
║  █████╗ ██╗   ██╗██████╗  ██████╗ ██████╗  █████╗  ║
║ ██╔══██╗██║   ██║██╔══██╗██╔═══██╗██╔══██╗██╔══██╗ ║
║ ███████║██║   ██║██████╔╝██║   ██║██████╔╝███████║ ║
║ ██╔══██║██║   ██║██╔══██╗██║   ██║██╔══██╗██╔══██║ ║
║ ██║  ██║╚██████╔╝██║  ██║╚██████╔╝██║  ██║██║  ██║ ║
║ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ║
╚════════════════════════════════════════════════════╝`;

	const tabletArt = `
╔═════════════════════════════════════╗
║   █████╗ ██╗   ██╗██████╗  ██████╗  ║
║  ██╔══██╗██║   ██║██╔══██╗██╔═══██╗ ║
║  ███████║██║   ██║██████╔╝██║   ██║ ║
║  ██╔══██║██║   ██║██╔══██╗██║   ██║ ║
║  ██║  ██║╚██████╔╝██║  ██║╚██████╔╝ ║
║  ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝  ║
╚═════════════════════════════════════╝`;

	const mobileArt = `
╔══════════════════════╗
║      A U R O R A     ║
║   ═══════════════    ║
║    [ DEVELOPER ]     ║
╚══════════════════════╝`;

	const getArt = () => {
		if (isMobile) return mobileArt;
		if (window.innerWidth < 1024) return tabletArt;
		return desktopArt;
	};

	return (
		<div className={`relative ${className}`}>
			{/* glow effect behind the ascii */}
			<div className="absolute inset-0 blur-3xl opacity-20 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500" />

			<pre className={`
				relative
				text-terminal-primary
				font-mono
				font-bold
				whitespace-pre
				leading-tight
				${isMobile ? 'text-xs' : 'text-[10px] sm:text-xs md:text-sm lg:text-base'}
				text-center
				ascii-glow
			`}>
				{getArt()}
			</pre>
		</div>
	);
};

export default AsciiHero;
