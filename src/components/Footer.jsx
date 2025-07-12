import React from "react";

const Footer = () => {
	return (
		<footer className="mt-32 border-t border-gray-800/50 bg-gradient-to-b from-black to-gray-950 text-gray-300 pb-6 pt-6">
			<div className="container mx-auto px-4 py-24">
				<div className="grid md:grid-cols-4 gap-8 mb-16">
					{/* Brand */}
					<div className="md:col-span-1">
						<h3 className="text-xl font-bold text-white mb-4">Aurora</h3>
						<p className="text-gray-400 text-sm leading-relaxed">
							Building digital experiences with clean code and thoughtful design.
						</p>
					</div>

					{/* Navigation */}
					<div>
						<h4 className="font-semibold text-white mb-4">Navigation</h4>
						<ul className="space-y-3 text-sm">
							<li>
								<a href="#home" className="footer-underline text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
									Home
								</a>
							</li>
							<li>
								<a href="#about" className="footer-underline text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
									About
								</a>
							</li>
							<li>
								<a href="#blog" className="footer-underline text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
									Blog
								</a>
							</li>
							<li>
								<a href="#contact" className="footer-underline text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
									Contact
								</a>
							</li>
						</ul>
					</div>

					{/* Connect */}
					<div>
						<h4 className="font-semibold text-white mb-4">Connect</h4>
						<ul className="space-y-3 text-sm">
							<li>
								<a 
									href="https://github.com/convolutionary" 
									target="_blank" 
									rel="noopener noreferrer"
									className="footer-underline text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
								>
									GitHub
								</a>
							</li>
							<li>
								<a 
									href="mailto:hello@aurora.dev" 
									className="footer-underline text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
								>
									Email
								</a>
							</li>
							<li>
								<a 
									href="#" 
									className="footer-underline text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
								>
									Twitter
								</a>
							</li>
						</ul>
					</div>

					{/* Info */}
					<div>
						<h4 className="font-semibold text-white mb-4">Info</h4>
						<ul className="space-y-3 text-sm">
							<li>
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 bg-green-500 rounded-full"></div>
									<span className="text-gray-400">Available for work</span>
								</div>
							</li>
							<li>
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
									<span className="text-gray-400">Remote friendly</span>
								</div>
							</li>
							<li>
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
									<span className="text-gray-400">Open source advocate</span>
								</div>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="border-t border-gray-800/50 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<div className="flex items-center gap-2 text-sm text-gray-400">
							<span>Made with</span>
							<svg className="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
							</svg>
							<span>by Aurora</span>
						</div>
						<div className="text-sm text-gray-500">
							© {new Date().getFullYear()} Aurora. All rights reserved.
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
