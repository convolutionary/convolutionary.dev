import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import pgp from "../pgp.txt";

const Footer = () => {
	const [showCursor, setShowCursor] = useState(true);
	const currentYear = new Date().getFullYear();

	// Cursor blink effect
	useEffect(() => {
		const interval = setInterval(() => {
			setShowCursor(prev => !prev);
		}, 530);
		return () => clearInterval(interval);
	}, []);

	return (
		<footer className="bg-terminal-black font-mono">
			{}
			<div className="container mx-auto px-4 py-8 max-w-6xl">
				<div className="bg-terminal-black border-l border-r border-terminal-muted px-8 py-12">
					{}
					<div className="text-terminal-secondary mb-8">
						<span className="text-terminal-muted">aurora@portfolio</span><span className="text-white">:</span><span className="text-blue-400">~/footer</span><span className="text-white">$ </span>cat system-info.txt
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
						{}
						<div>
							<h3 className="text-terminal-primary font-bold text-xl mb-4 flex items-center gap-3">
								<span className="text-terminal-primary">[BRAND]</span>
								AURORA
							</h3>
							<p className="text-terminal-muted text-sm leading-relaxed">
								Self-taught developer passionate about creating elegant solutions and contributing to open-source projects.
							</p>
						</div>

						{}
						<div>
							<h4 className="text-terminal-primary font-bold text-lg mb-4 flex items-center gap-3">
								<span className="text-terminal-primary">[NAV]</span>
								NAVIGATE
							</h4>
							<ul className="space-y-2">
								<li className="flex items-center gap-2">
									<span className="text-terminal-primary">→</span>
									<button
										onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
										className="text-terminal-secondary hover:text-terminal-primary transition-colors text-sm"
									>
										home.html
									</button>
								</li>
								<li className="flex items-center gap-2">
									<span className="text-terminal-primary">→</span>
									<button
										onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
										className="text-terminal-secondary hover:text-terminal-primary transition-colors text-sm"
									>
										about.md
									</button>
								</li>
								<li className="flex items-center gap-2">
									<span className="text-terminal-primary">→</span>
									<Link
										to="/blog"
										className="text-terminal-secondary hover:text-terminal-primary transition-colors text-sm"
									>
										blog/
									</Link>
								</li>
								<li className="flex items-center gap-2">
									<span className="text-terminal-primary">→</span>
									<button
										onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
										className="text-terminal-secondary hover:text-terminal-primary transition-colors text-sm"
									>
										contact.php
									</button>
								</li>
							</ul>
						</div>

						{}
						<div>
							<h4 className="text-terminal-primary font-bold text-lg mb-4 flex items-center gap-3">
								<span className="text-terminal-primary">[CONNECT]</span>
								LINKS
							</h4>
							<ul className="space-y-2">
								<li className="flex items-center gap-2">
									<span className="text-terminal-primary">→</span>
									<a
										href="https://github.com/convolutionary"
										target="_blank"
										rel="noopener noreferrer"
										className="text-terminal-secondary hover:text-terminal-primary transition-colors text-sm"
									>
										github/convolutionary
									</a>
								</li>
								<li className="flex items-center gap-2">
									<span className="text-terminal-primary">→</span>
									<a
										href="mailto:hello@example.com"
										className="text-terminal-secondary hover:text-terminal-primary transition-colors text-sm"
									>
										send-email.sh
									</a>
								</li>
							</ul>
						</div>

						{}
						<div>
							<h4 className="text-terminal-primary font-bold text-lg mb-4 flex items-center gap-3">
								<span className="text-terminal-primary">[STATUS]</span>
								SYSTEM
							</h4>
							<ul className="space-y-2">
								<li className="flex items-center gap-2">
									<span className="text-green-400">●</span>
									<span className="text-terminal-secondary text-sm">all systems operational</span>
								</li>
								<li className="flex items-center gap-2">
									<span className="text-blue-400">●</span>
									<span className="text-terminal-secondary text-sm">open to opportunities</span>
								</li>
								<li className="flex items-center gap-2">
									<span className="text-terminal-primary">●</span>
									<span className="text-terminal-secondary text-sm">building the future</span>
								</li>
							</ul>
						</div>
					</div>

					{}
					<div className="border-t border-terminal-dim pt-8">
						<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
							<div className="text-terminal-muted text-sm">
								<span className="text-terminal-dim">© {currentYear} Aurora. Built with</span>
								<span className="text-red-400 mx-2">♥</span>
								<span className="text-terminal-dim">and lots of coffee.</span>
							</div>
							<div className="flex items-center gap-4">
								<Link
									to="/privacy"
									className="text-terminal-dim hover:text-terminal-secondary transition-colors text-sm"
								>
									privacy.txt
								</Link>
								<Link
									to="/terms"
									className="text-terminal-dim hover:text-terminal-secondary transition-colors text-sm"
								>
									terms.txt
								</Link>
								<a
									href={pgp}
									target="_blank"
									rel="noopener noreferrer"
									className="text-terminal-dim hover:text-terminal-secondary transition-colors text-sm"
								>
									pgp.key
								</a>
							</div>
						</div>
					</div>

					{}
					<div className="flex items-center mt-8 pt-4 border-t border-terminal-dim">
						<span className="text-terminal-muted">aurora@portfolio</span>
						<span className="text-white">:</span>
						<span className="text-blue-400">~/footer</span>
						<span className="text-white">$ </span>
						<span className={`text-terminal-cursor ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>_</span>
					</div>
				</div>
				{}
				<div className="bg-terminal-black border-l border-r border-b border-terminal-muted rounded-b-lg h-4"></div>
			</div>
		</footer>
	);
};

export default Footer;