import React from "react";
import { Link } from "react-router-dom";
import pgp from "../pgp.txt";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gradient-to-b from-black to-gray-950 border-t border-gray-800/50 mt-32 text-gray-300 pt-16 sm:pt-24 md:pt-32 pb-6 sm:pb-8">
			<div className="container mx-auto px-4 sm:px-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
					{/* Brand */}
					<div className="text-center sm:text-left">
						<h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Aurora</h3>
						<p className="text-sm sm:text-base text-gray-400 leading-relaxed">
							Self-taught developer passionate about creating elegant solutions and contributing to open-source projects.
						</p>
					</div>

					{/* Navigation */}
					<div className="text-center sm:text-left">
						<h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Navigate</h4>
						<ul className="space-y-2">
							<li>
								<button 
									onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
									className="footer-underline text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
								>
									Home
								</button>
							</li>
							<li>
								<button 
									onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
									className="footer-underline text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
								>
									About
								</button>
							</li>
							<li>
								<Link 
									to="/blog" 
									className="footer-underline text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
								>
									Blog
								</Link>
							</li>
							<li>
								<button 
									onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
									className="footer-underline text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
								>
									Contact
								</button>
							</li>
						</ul>
					</div>

					{/* Connect */}
					<div className="text-center sm:text-left">
						<h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Connect</h4>
						<ul className="space-y-2">
							<li>
								<a 
									href="https://github.com/convolutionary" 
									target="_blank" 
									rel="noopener noreferrer"
									className="footer-underline text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
								>
									GitHub
								</a>
							</li>
							<li>
								<a 
									href="https://twitter.com/convolutionary" 
									target="_blank" 
									rel="noopener noreferrer"
									className="footer-underline text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
								>
									Twitter
								</a>
							</li>
							<li>
								<a 
									href="https://discord.gg/your-server" 
									target="_blank" 
									rel="noopener noreferrer"
									className="footer-underline text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
								>
									Discord
								</a>
							</li>
							<li>
								<a 
									href="mailto:hello@example.com"
									className="footer-underline text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
								>
									Email
								</a>
							</li>
						</ul>
					</div>

					{/* Info */}
					<div className="text-center sm:text-left">
						<h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Status</h4>
						<ul className="space-y-2">
							<li className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
								<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
								<span className="text-sm sm:text-base text-gray-400">All systems operational</span>
							</li>
							<li className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
								<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
								<span className="text-sm sm:text-base text-gray-400">Open to opportunities</span>
							</li>
							<li className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
								<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
								<span className="text-sm sm:text-base text-gray-400">Building the future</span>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="border-t border-gray-800/50 pt-6 sm:pt-8">
					<div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
						<p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
							© {currentYear} Aurora. Built with{" "}
							<span className="text-red-500 animate-pulse">♥</span>{" "}
							and lots of coffee.
						</p>
						<div className="flex items-center gap-4 sm:gap-6">
							<Link 
								to="/privacy" 
								className="text-xs sm:text-sm text-gray-500 hover:text-gray-300 transition-colors"
							>
								Privacy
							</Link>
							<Link 
								to="/terms" 
								className="text-xs sm:text-sm text-gray-500 hover:text-gray-300 transition-colors"
							>
								Terms
							</Link>
							<a 
								href={pgp} 
								target="_blank" 
								rel="noopener noreferrer"
								className="text-xs sm:text-sm text-gray-500 hover:text-gray-300 transition-colors"
							>
								PGP Key
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
