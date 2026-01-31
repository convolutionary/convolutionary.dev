import React from "react";
import { Link } from "react-router-dom";
import pgp from "../pgp.txt";
import { footerContent } from "../data/content";
import { footerLinks } from "../data/navigation";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	const athenaScrollTo = (id) => {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<footer className="bg-bento-bg border-t border-line">
			<div className="container mx-auto px-6 py-12 max-w-6xl">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
					{/* brand */}
					<div>
						<h3 className="text-xl font-semibold text-ink-primary mb-3">
							aurora
						</h3>
						<p className="text-ink-muted text-sm leading-relaxed">
							{footerContent.brand.desc}
						</p>
					</div>

					{/* nav */}
					<div>
						<h4 className="font-semibold text-ink-primary mb-3">Navigate</h4>
						<ul className="space-y-2">
							{footerLinks.nav.map((item, i) => (
								<li key={i}>
									{item.scroll ? (
										<button
											onClick={() => athenaScrollTo(item.scroll)}
											className="text-ink-muted hover:text-clay transition-colors text-sm"
										>
											{item.label}
										</button>
									) : (
										<Link
											to={item.to}
											className="text-ink-muted hover:text-clay transition-colors text-sm"
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
						<h4 className="font-semibold text-ink-primary mb-3">Connect</h4>
						<ul className="space-y-2">
							{footerLinks.social.map((item, i) => (
								<li key={i}>
									<a
										href={item.href}
										target="_blank"
										rel="noopener noreferrer"
										className="text-ink-muted hover:text-clay transition-colors text-sm"
									>
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* status */}
					<div>
						<h4 className="font-semibold text-ink-primary mb-3">Status</h4>
						<div className="flex items-center gap-2 mb-2">
							<div className="w-2 h-2 rounded-full bg-green-500"></div>
							<span className="text-ink-muted text-sm">Available for work</span>
						</div>
						<p className="text-ink-subtle text-sm">Open to new opportunities</p>
					</div>
				</div>

				{/* bottom bar */}
				<div className="pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-ink-subtle text-sm">
						© {currentYear} Aurora. Built with care.
					</p>
					<div className="flex items-center gap-6">
						<Link to="/privacy" className="text-ink-subtle hover:text-ink-muted transition-colors text-sm">
							Privacy
						</Link>
						<Link to="/terms" className="text-ink-subtle hover:text-ink-muted transition-colors text-sm">
							Terms
						</Link>
						<a href={pgp} target="_blank" rel="noopener noreferrer" className="text-ink-subtle hover:text-ink-muted transition-colors text-sm">
							PGP Key
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
