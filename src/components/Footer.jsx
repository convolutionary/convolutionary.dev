import React from "react";
import { Link } from "react-router-dom";
import pgp from "../pgp.txt";
import { footerContent } from "../data/content";
import { footerLinks } from "../data/navigation";
import { TerminalPrompt, TerminalCursor } from "./terminal";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	const athenaScrollTo = (id) => {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<footer className="bg-terminal-black font-mono">
			<div className="container mx-auto px-4 py-8 max-w-6xl">
				<div className="terminal-window">
					<div className="p-4 sm:p-6 md:p-8">

					<TerminalPrompt path="~/footer" command="cat system-info.txt" className="mb-8" />

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
						{/* brand */}
						<div>
							<h3 className="text-terminal-primary font-bold text-xl mb-4 flex items-center gap-3">
								<span className="text-cyan-400">[BRAND]</span>
								AURORA
							</h3>
							<p className="text-terminal-muted text-sm leading-relaxed">
								{footerContent.brand.desc}
							</p>
						</div>

						{/* nav */}
						<div>
							<h4 className="text-terminal-primary font-bold text-lg mb-4 flex items-center gap-3">
								<span className="text-cyan-400">[NAV]</span>
								NAVIGATE
							</h4>
							<ul className="space-y-2">
								{footerLinks.nav.map((item, i) => (
									<li key={i} className="flex items-center gap-2">
										<span className="text-cyan-400">→</span>
										{item.scroll ? (
											<button
												onClick={() => athenaScrollTo(item.scroll)}
												className="text-terminal-secondary hover:text-cyan-400 transition-colors text-sm"
											>
												{item.label}
											</button>
										) : (
											<Link
												to={item.to}
												className="text-terminal-secondary hover:text-cyan-400 transition-colors text-sm"
											>
												{item.label}
											</Link>
										)}
									</li>
								))}
							</ul>
						</div>

						{/* links */}
						<div>
							<h4 className="text-terminal-primary font-bold text-lg mb-4 flex items-center gap-3">
								<span className="text-cyan-400">[CONNECT]</span>
								LINKS
							</h4>
							<ul className="space-y-2">
								{footerLinks.social.map((item, i) => (
									<li key={i} className="flex items-center gap-2">
										<span className="text-cyan-400">→</span>
										<a
											href={item.href}
											target="_blank"
											rel="noopener noreferrer"
											className="text-terminal-secondary hover:text-cyan-400 transition-colors text-sm"
										>
											{item.label}
										</a>
									</li>
								))}
							</ul>
						</div>

						{/* status */}
						<div>
							<h4 className="text-terminal-primary font-bold text-lg mb-4 flex items-center gap-3">
								<span className="text-cyan-400">[STATUS]</span>
								SYSTEM
							</h4>
							<ul className="space-y-2">
								{footerContent.status.map((item, i) => (
									<li key={i} className="flex items-center gap-2">
										<span className={item.color}>●</span>
										<span className="text-terminal-secondary text-sm">{item.text}</span>
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* bottom bar */}
					<div className="border-t border-terminal-dim pt-8">
						<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
							<div className="text-terminal-muted text-sm">
								<span className="text-terminal-dim">© {currentYear} Aurora. Built with</span>
								<span className="text-term-accent-magenta mx-2">♥</span>
								<span className="text-terminal-dim">and lots of coffee.</span>
							</div>
							<div className="flex items-center gap-4">
								<Link to="/privacy" className="text-terminal-dim hover:text-terminal-secondary transition-colors text-sm">
									privacy.txt
								</Link>
								<Link to="/terms" className="text-terminal-dim hover:text-terminal-secondary transition-colors text-sm">
									terms.txt
								</Link>
								<a href={pgp} target="_blank" rel="noopener noreferrer" className="text-terminal-dim hover:text-terminal-secondary transition-colors text-sm">
									pgp.key
								</a>
							</div>
						</div>
					</div>

					{/* footer prompt */}
					<div className="flex items-center mt-8 pt-4 border-t border-terminal-dim">
						<TerminalPrompt path="~/footer" />
						<TerminalCursor />
					</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
