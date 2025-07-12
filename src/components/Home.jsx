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
		<div className="min-h-screen pt-28 pb-16" id="home">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto">
					{/* Hero Section */}
					<div className="text-center mb-16">
						<div className="inline-block mb-4">
							<span className="text-sm font-mono text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
								Available for opportunities
							</span>
						</div>
						
						<h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
							Aurora
						</h1>
						
						<div className="h-16 flex items-center justify-center mb-8">
							<p className="text-xl md:text-2xl text-gray-300">
								<span className="font-mono">I'm a </span>
								<span className="font-bold text-white">
									{currentText}
									<span className="cursor-blink">|</span>
								</span>
							</p>
						</div>
						
						<p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12">
							Self-taught developer passionate about creating elegant solutions and contributing to open-source projects. 
							I thrive on learning new technologies and solving complex problems.
						</p>
						
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button 
								onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
								className="btn btn-primary btn-lg"
							>
								Get in touch
							</button>
							<button 
								onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
								className="btn btn-secondary btn-lg"
							>
								Learn more
							</button>
						</div>
					</div>
					
					{/* Stats Section */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
						<div className="text-center">
							<div className="text-3xl font-bold text-white mb-2">7+</div>
							<div className="text-gray-400">Years Experience</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-white mb-2">15+</div>
							<div className="text-gray-600">Technologies</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-white mb-2">∞</div>
							<div className="text-gray-600">Coffee Cups</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-white mb-2">24/7</div>
							<div className="text-gray-600">Learning Mode</div>
						</div>
					</div>
					
					{/* Featured Work Preview */}
					<div className="card card-elevated p-8 mb-16 bg-gray-900">
						<div className="text-center mb-6">
							<h2 className="text-2xl font-bold text-white mb-2">Currently Working On</h2>
							<p className="text-gray-300">Building the next generation of digital experiences</p>
						</div>
						
						<div className="grid md:grid-cols-2 gap-8">
							<div className="card p-6 bg-gray-800">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
										<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
										</svg>
									</div>
									<div>
										<h3 className="font-semibold text-white">Web Applications</h3>
										<p className="text-sm text-gray-400">Modern, responsive solutions</p>
									</div>
								</div>
								<p className="text-gray-300 text-sm">
									Building scalable web applications with modern frameworks and clean architecture.
								</p>
							</div>
							
							<div className="card p-6 bg-gray-900">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
										<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
										</svg>
									</div>
									<div>
										<h3 className="font-semibold text-white">Open Source</h3>
										<p className="text-sm text-gray-400">Contributing to the community</p>
									</div>
								</div>
								<p className="text-gray-300 text-sm">
									Actively contributing to open-source projects and sharing knowledge with the developer community.
								</p>
							</div>
						</div>
					</div>
					
					{/* Scroll Indicator */}
					<div className="text-center">
						<div className="animate-bounce">
							<svg className="w-6 h-6 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
							</svg>
						</div>
						<p className="text-sm text-gray-500 mt-2">Scroll to explore</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
