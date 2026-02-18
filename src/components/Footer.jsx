import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import pgp from "../pgp.txt";
import { footerContent } from "../data/content";
import { footerLinks } from "../data/navigation";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	const athenaScrollTo = (id) => {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<footer className="border-t border-line">
			<div className="container mx-auto px-6 py-16 max-w-6xl">

				{/* top section */}
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
					{/* brand */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="lg:col-span-2"
					>
						<h3 className="text-3xl font-bold text-ink-primary tracking-tight mb-4">
							aurora<span className="text-clay">.</span>
						</h3>
						<p className="text-ink-muted max-w-sm leading-relaxed">
							{footerContent.brand.desc}
						</p>
					</motion.div>

					{/* nav */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
					>
						<h4 className="font-mono text-ink-primary text-sm mb-4">navigate</h4>
						<ul className="space-y-3">
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
					</motion.div>

					{/* connect */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
					>
						<h4 className="font-mono text-ink-primary text-sm mb-4">connect</h4>
						<ul className="space-y-3">
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

						{/* status */}
						<div className="mt-6 pt-6 border-t border-line">
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 bg-green-500 animate-pulse" />
								<span className="text-ink-muted text-sm">available for work</span>
							</div>
						</div>
					</motion.div>
				</div>

				{/* bottom bar */}
				<div className="pt-8 border-t border-line">
					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
						<motion.p
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							className="text-ink-subtle text-sm font-mono"
						>
							© {currentYear} aurora
						</motion.p>

						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className="flex items-center gap-6"
						>
							<Link to="/privacy" className="text-ink-subtle hover:text-ink-muted transition-colors text-sm">
								privacy
							</Link>
							<span className="text-ink-subtle/30">·</span>
							<Link to="/terms" className="text-ink-subtle hover:text-ink-muted transition-colors text-sm">
								terms
							</Link>
							<span className="text-ink-subtle/30">·</span>
							<a href={pgp} target="_blank" rel="noopener noreferrer" className="text-ink-subtle hover:text-ink-muted transition-colors text-sm">
								pgp
							</a>
						</motion.div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
