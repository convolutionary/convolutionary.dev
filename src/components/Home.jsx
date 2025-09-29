import React, { useState, useEffect } from "react";

const Home = () => {
	const [currentText, setCurrentText] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);
	
	const texts = ["software developer", "problem solver", "open source contributor", "digital creator"];
	
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

	return (
		<div className="min-h-screen pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16" id="home">
			<div className="container mx-auto px-4 sm:px-6">
				<div className="max-w-5xl mx-auto">
					{/* Hero Section */}
					<div className="text-center mb-16 sm:mb-20 md:mb-24">
						<div className="inline-block mb-6 sm:mb-8 animate-fade-in">
							<span className="text-xs sm:text-sm font-mono text-gray-300 bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-gray-600/30">
								Available for opportunities
							</span>
						</div>

						<h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-6 sm:mb-8 leading-tight animate-glow animate-fade-in-delay">
							Aurora
						</h1>
						
						<div className="h-16 sm:h-18 md:h-20 flex items-center justify-center mb-8 sm:mb-10 animate-slide-left">
							<p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 px-4">
								<span className="font-mono text-gray-400">I'm a </span>
								<span className="font-bold text-white bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
									{currentText}
									<span className="cursor-blink text-white">|</span>
								</span>
							</p>
						</div>

						<p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10 sm:mb-12 md:mb-16 px-4 animate-slide-right">
							Self-taught developer passionate about creating elegant solutions and contributing to open-source projects.
							I thrive on learning new technologies and solving complex problems.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 animate-scale-in">
							<button
								onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
								className="btn btn-primary btn-lg w-full sm:w-auto transform hover:scale-105"
							>
								Get in touch
							</button>
							<button
								onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
								className="btn btn-secondary btn-lg w-full sm:w-auto transform hover:scale-105"
							>
								Learn more
							</button>
						</div>
					</div>
					
					{/* Stats Section */}
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 mb-16 sm:mb-20 md:mb-24 px-4">
						<div className="text-center group animate-fade-in">
							<div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3 bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">7+</div>
							<div className="text-sm sm:text-base md:text-lg text-gray-400 font-medium">Years Experience</div>
						</div>
						<div className="text-center group animate-fade-in" style={{animationDelay: '0.1s'}}>
							<div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3 bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">15+</div>
							<div className="text-sm sm:text-base md:text-lg text-gray-400 font-medium">Technologies</div>
						</div>
						<div className="text-center group animate-fade-in" style={{animationDelay: '0.2s'}}>
							<div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3 bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">∞</div>
							<div className="text-sm sm:text-base md:text-lg text-gray-400 font-medium">Coffee Cups</div>
						</div>
						<div className="text-center group animate-fade-in" style={{animationDelay: '0.3s'}}>
							<div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3 bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">24/7</div>
							<div className="text-sm sm:text-base md:text-lg text-gray-400 font-medium">Learning Mode</div>
						</div>
					</div>
					
					{/* Featured Work Preview */}
					<div className="card card-elevated p-6 sm:p-8 md:p-10 mb-16 sm:mb-20 mx-4 sm:mx-0 animate-fade-in-delay">
						<div className="text-center mb-6 sm:mb-8 md:mb-10">
							<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Currently Working On</h2>
							<p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">Building the next generation of digital experiences</p>
						</div>
						
						<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
							<div className="card p-6 sm:p-8 hover:scale-105 transform transition-all duration-300">
								<div className="flex items-center gap-4 mb-4 sm:mb-6">
									<div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gray-800 to-black rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
										<svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
										</svg>
									</div>
									<div className="min-w-0">
										<h3 className="font-bold text-white text-lg sm:text-xl">Web Applications</h3>
										<p className="text-sm sm:text-base text-gray-400">Modern, responsive solutions</p>
									</div>
								</div>
								<p className="text-gray-300 text-sm sm:text-base leading-relaxed">
									Building scalable web applications with modern frameworks and clean architecture.
								</p>
							</div>

							<div className="card p-6 sm:p-8 hover:scale-105 transform transition-all duration-300">
								<div className="flex items-center gap-4 mb-4 sm:mb-6">
									<div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gray-800 to-black rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
										<svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
										</svg>
									</div>
									<div className="min-w-0">
										<h3 className="font-bold text-white text-lg sm:text-xl">Open Source</h3>
										<p className="text-sm sm:text-base text-gray-400">Contributing to the community</p>
									</div>
								</div>
								<p className="text-gray-300 text-sm sm:text-base leading-relaxed">
									Actively contributing to open-source projects and sharing knowledge with the developer community.
								</p>
							</div>
						</div>
					</div>
					
					{/* Scroll Indicator */}
					<div className="text-center">
						<div className="animate-bounce">
							<svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
							</svg>
						</div>
						<p className="text-xs sm:text-sm text-gray-500 mt-2">Scroll to explore</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
