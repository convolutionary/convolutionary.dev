import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { smoothScrollTo } from "../utils/smoothScroll";

const Home = () => {
	const [currentText, setCurrentText] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);
	const [showCursor, setShowCursor] = useState(true);
	const location = useLocation();

	const texts = ["software developer", "problem solver", "open source contributor", "digital creator"];

	
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 640);
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	useEffect(() => {
		const typeSpeed = isDeleting ? 100 : 150;
		const pauseTime = isDeleting ? 1000 : 2000;

		const timeout = setTimeout(() => {
			const current = texts[currentIndex];

			if (!isDeleting && currentText === current) {
				setTimeout(() => setIsDeleting(true), pauseTime);
			} else if (isDeleting && currentText === "") {
				setIsDeleting(false);
				setCurrentIndex((prev) => (prev + 1) % texts.length);
			} else {
				setCurrentText(prev =>
					isDeleting
						? prev.slice(0, -1)
						: current.slice(0, prev.length + 1)
				);
			}
		}, typeSpeed);

		return () => clearTimeout(timeout);
	}, [currentText, currentIndex, isDeleting]);

	useEffect(() => {
		const interval = setInterval(() => {
			setShowCursor(prev => !prev);
		}, 530);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (location.state?.scrollTo) {
			setTimeout(() => {
				smoothScrollTo(location.state.scrollTo, -80);
			}, 100);
		}
	}, [location]);

	const asciiArt = `
 █████╗ ██╗   ██╗██████╗  ██████╗ ██████╗  █████╗
██╔══██╗██║   ██║██╔══██╗██╔═══██╗██╔══██╗██╔══██╗
███████║██║   ██║██████╔╝██║   ██║██████╔╝███████║
██╔══██║██║   ██║██╔══██╗██║   ██║██╔══██╗██╔══██║
██║  ██║╚██████╔╝██║  ██║╚██████╔╝██║  ██║██║  ██║
╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝`;

	const mobileAsciiArt = `
AURORA
[DEV]`;

	const bioCommands = [
		{ icon: "[GIT]", label: "GitHub", command: "github/convolutionary", link: "https://github.com/convolutionary" }
	];

	return (
		<div className="min-h-screen bg-terminal-black font-mono text-terminal-primary pt-24 sm:pt-28 md:pt-32" id="home">
			{}
			<div className="container mx-auto px-4 py-8 max-w-6xl">
				{}
				<div className="bg-terminal-dark border border-terminal-muted rounded-t-lg p-2 flex items-center gap-2">
					<div className="flex gap-1">
						<div className="w-3 h-3 rounded-full bg-red-500"></div>
						<div className="w-3 h-3 rounded-full bg-yellow-500"></div>
						<div className="w-3 h-3 rounded-full bg-green-500"></div>
					</div>
					<div className="flex-1 text-center text-terminal-muted text-sm">
						aurora@portfolio:~$
					</div>
				</div>

				{}
				<div className="bg-terminal-black border-l border-r border-terminal-muted p-3 sm:p-6 md:p-8 min-h-[70vh] sm:min-h-[80vh] overflow-hidden">

					{}
					<div className="mb-4 sm:mb-6 md:mb-8 overflow-x-auto">
						<pre className="text-terminal-primary text-2xl sm:text-sm md:text-lg lg:text-xl xl:text-2xl leading-tight font-bold whitespace-pre inline-block min-w-full text-center sm:text-left">
{isMobile ? mobileAsciiArt : asciiArt}
						</pre>
					</div>

					{}
					<div className="mb-6 sm:mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
						<div>
							<div className="text-terminal-secondary mb-4">
								<span className="text-terminal-muted">aurora@portfolio</span><span className="text-white">:</span><span className="text-blue-400">~</span><span className="text-white">$ </span>whoami
							</div>
							{bioCommands.map((cmd, index) => (
								<div key={index} className="mb-2 flex items-center gap-3">
									<span className="text-lg">{cmd.icon}</span>
									<span className="text-terminal-secondary">{cmd.label}</span>
									<span className="text-terminal-muted">→</span>
									<a
										href={cmd.link}
										target="_blank"
										rel="noopener noreferrer"
										className="text-terminal-primary hover:text-terminal-secondary transition-colors underline"
									>
										{cmd.command}
									</a>
								</div>
							))}
						</div>
						<div>
							<div className="text-terminal-secondary mb-4">
								<span className="text-terminal-muted">aurora@portfolio</span><span className="text-white">:</span><span className="text-blue-400">~</span><span className="text-white">$ </span>cat about.txt
							</div>
							<div className="text-terminal-muted leading-relaxed">
								<p className="mb-3">Self-taught developer passionate about creating elegant solutions and contributing to open-source projects.</p>
								<p className="mb-3">I thrive on learning new technologies and solving complex problems.</p>
								<p>Currently working as a <span className="text-terminal-primary">{currentText}</span><span className={`text-terminal-cursor ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span></p>
							</div>
						</div>
					</div>

					{}
					<div className="mb-6">
						<p className="text-terminal-secondary">
							Welcome to my portfolio! - Type <span className="text-terminal-primary font-bold">help</span> for a list of supported commands.
						</p>
					</div>

					{}
					<div className="mb-6 sm:mb-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
						{[
							{ label: "Years Experience", value: "7+" },
							{ label: "Technologies", value: "15+" },
							{ label: "Coffee Cups", value: "∞" },
							{ label: "Learning Mode", value: "24/7" }
						].map((stat, index) => (
							<div key={index} className="text-center">
								<div className="text-terminal-primary font-bold text-lg sm:text-xl md:text-2xl mb-1">{stat.value}</div>
								<div className="text-terminal-muted text-xs sm:text-sm">{stat.label}</div>
							</div>
						))}
					</div>

					{}
					<div className="mb-8">
						<div className="text-terminal-secondary mb-4">
							<span className="text-terminal-muted">aurora@portfolio</span><span className="text-white">:</span><span className="text-blue-400">~</span><span className="text-white">$ </span>ls projects/
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
							<div className="border border-terminal-dim p-3 sm:p-4 rounded">
								<div className="flex items-center gap-3 mb-3">
									<span className="text-terminal-primary font-bold">[WEB]</span>
									<div>
										<h3 className="text-terminal-primary font-bold">Web Applications</h3>
										<p className="text-terminal-muted text-sm">Modern, responsive solutions</p>
									</div>
								</div>
								<p className="text-terminal-secondary text-sm">
									Building scalable web applications with modern frameworks and clean architecture.
								</p>
							</div>
							<div className="border border-terminal-dim p-3 sm:p-4 rounded">
								<div className="flex items-center gap-3 mb-3">
									<span className="text-terminal-primary font-bold">[OSS]</span>
									<div>
										<h3 className="text-terminal-primary font-bold">Open Source</h3>
										<p className="text-terminal-muted text-sm">Contributing to the community</p>
									</div>
								</div>
								<p className="text-terminal-secondary text-sm">
									Actively contributing to open-source projects and sharing knowledge with the developer community.
								</p>
							</div>
						</div>
					</div>

					{}
					<div className="relative">
						<div className="absolute inset-0 flex items-center" aria-hidden="true">
							<div className="w-full border-t border-terminal-muted"></div>
						</div>
						<div className="relative flex justify-center">
							<div className="bg-terminal-black px-4 py-2">
								<div className="text-terminal-secondary text-sm mb-1">
									<span className="text-terminal-muted">aurora@portfolio</span><span className="text-white">:</span><span className="text-blue-400">~</span><span className="text-white">$ </span>cd about
								</div>
								<div className="text-terminal-dim text-xs text-center">
									Entering directory 'about'...
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
};

export default Home;