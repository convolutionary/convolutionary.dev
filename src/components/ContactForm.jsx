import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import emailjs from "@emailjs/browser";
import Socials from "./Socials";
import { inspirationalQuotes } from "../data/quotes";
import { contactContent } from "../data/content";
import { Magnet } from "./bits";

const ContactForm = () => {
	const form = useRef();
	const [submitted, setSubmitted] = useState(false);
	const [quoteIndex, setQuoteIndex] = useState(0);
	const [animateQuote, setAnimateQuote] = useState(false);
	const [showCopyTooltip, setShowCopyTooltip] = useState(false);
	const [formData, setFormData] = useState({
		user_name: '',
		user_email: '',
		message: ''
	});

	const currentQuote = inspirationalQuotes[quoteIndex];

	useEffect(() => {
		setQuoteIndex(Math.floor(Math.random() * inspirationalQuotes.length));
	}, []);

	const circeCycleQuote = () => {
		setAnimateQuote(true);
		setShowCopyTooltip(false);
		setTimeout(() => {
			setQuoteIndex((prev) => {
				let next;
				do {
					next = Math.floor(Math.random() * inspirationalQuotes.length);
				} while (next === prev);
				return next;
			});
			setAnimateQuote(false);
		}, 300);
	};

	const hermesCopyQuote = () => {
		const textToCopy = `"${currentQuote.latin}" - ${currentQuote.english}`;
		navigator.clipboard.writeText(textToCopy).then(() => {
			setShowCopyTooltip(true);
			setTimeout(() => setShowCopyTooltip(false), 2000);
		});
	};

	const morpheusInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const hermesSendMail = (e) => {
		e.preventDefault();
		emailjs
			.sendForm("service_k578uaf", "template_nyxk2ot", form.current, {
				publicKey: "gdht2zNte7kkHEw_x",
			})
			.then(
				() => {
					console.log("msg sent, preem");
					setSubmitted(true);
					setFormData({ user_name: '', user_email: '', message: '' });
				},
				(err) => {
					console.log("flatlined:", err.text);
				}
			);
	};

	return (
		<section className="py-32" id="contact">
			<div className="container mx-auto px-6 max-w-6xl">

				{/* header */}
				<div className="mb-20">
					<motion.span
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className="text-clay font-mono text-sm"
					>
						{"// contact"}
					</motion.span>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-5xl md:text-6xl font-bold text-ink-primary tracking-tight mt-2"
					>
						Let's talk<span className="text-clay">.</span>
					</motion.h2>
					<motion.p
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="text-ink-muted text-lg mt-4 max-w-lg"
					>
						{contactContent.header.subtitle}
					</motion.p>
				</div>

				{/* main grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

					{/* form */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="lg:col-span-2"
					>
						<div className="bg-bento-bg/95 border border-line p-8 backdrop-blur-sm">
							{submitted ? (
								<motion.div
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									className="text-center py-16"
								>
									<div className="w-16 h-16 border border-clay flex items-center justify-center mx-auto mb-6">
										<svg className="w-8 h-8 text-clay" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
										</svg>
									</div>
									<h3 className="text-xl font-bold text-ink-primary mb-2">Message sent<span className="text-clay">.</span></h3>
									<p className="text-ink-muted mb-8">I'll get back to you soon.</p>
									<button
										onClick={() => setSubmitted(false)}
										className="px-6 py-3 border border-line text-ink-secondary hover:border-clay hover:text-clay transition-colors font-mono text-sm"
									>
										send another
									</button>
								</motion.div>
							) : (
								<form ref={form} onSubmit={hermesSendMail} className="space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label className="text-ink-muted text-sm block mb-2 font-mono">name</label>
											<input
												type="text"
												name="user_name"
												value={formData.user_name}
												onChange={morpheusInputChange}
												required
												placeholder="your name"
												className="w-full px-4 py-3 bg-bento-surface border border-line text-ink-primary placeholder:text-ink-subtle focus:outline-none focus:border-clay transition-colors"
											/>
										</div>
										<div>
											<label className="text-ink-muted text-sm block mb-2 font-mono">email</label>
											<input
												type="email"
												name="user_email"
												value={formData.user_email}
												onChange={morpheusInputChange}
												required
												placeholder="you@example.com"
												className="w-full px-4 py-3 bg-bento-surface border border-line text-ink-primary placeholder:text-ink-subtle focus:outline-none focus:border-clay transition-colors"
											/>
										</div>
									</div>
									<div>
										<label className="text-ink-muted text-sm block mb-2 font-mono">message</label>
										<textarea
											name="message"
											value={formData.message}
											onChange={morpheusInputChange}
											required
											placeholder="tell me about your project..."
											className="w-full px-4 py-3 bg-bento-surface border border-line text-ink-primary placeholder:text-ink-subtle focus:outline-none focus:border-clay transition-colors min-h-[180px] resize-y"
										/>
									</div>
									<Magnet padding={50} magnetStrength={3}>
										<button
											type="submit"
											className="px-8 py-3 bg-clay text-white font-medium hover:bg-clay-soft transition-colors"
										>
											Send Message
										</button>
									</Magnet>
								</form>
							)}
						</div>
					</motion.div>

					{/* sidebar */}
					<div className="space-y-6">
						{/* socials */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1 }}
							className="bg-bento-bg/95 border border-line p-6 backdrop-blur-sm"
						>
							<h3 className="text-sm font-bold text-ink-primary mb-4 font-mono flex items-center gap-2">
								<span className="w-4 h-px bg-clay" />
								connect
							</h3>
							<Socials />
						</motion.div>

						{/* quote */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
							className="bg-bento-bg/95 border border-line p-6 backdrop-blur-sm"
						>
							<div className="flex items-center justify-between mb-4">
								<span className="text-clay text-xs font-mono">{"// inspiration"}</span>
								<span className="text-xs text-ink-subtle font-mono">{currentQuote.category}</span>
							</div>

							<div className={`transition-all duration-300 ${animateQuote ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
								<blockquote className="text-ink-secondary italic leading-relaxed text-sm">
									"{currentQuote.latin}"
								</blockquote>
								<p className="text-ink-muted text-xs mt-3">{currentQuote.english}</p>
							</div>

							<div className="flex gap-4 mt-5 pt-4 border-t border-line">
								<button onClick={circeCycleQuote} className="text-xs text-ink-subtle hover:text-clay transition-colors font-mono">
									refresh
								</button>
								<span className="text-ink-subtle/30">|</span>
								<button onClick={hermesCopyQuote} className="text-xs text-ink-subtle hover:text-clay transition-colors font-mono relative">
									copy
									{showCopyTooltip && (
										<motion.span
											initial={{ opacity: 0, y: 4 }}
											animate={{ opacity: 1, y: 0 }}
											className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-clay text-white text-xs whitespace-nowrap"
										>
											copied!
										</motion.span>
									)}
								</button>
							</div>
						</motion.div>

						{/* info */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.3 }}
							className="space-y-3"
						>
							{contactContent.info.map((item, i) => (
								<div key={i} className="flex items-center gap-3 p-4 bg-bento-bg/95 border border-line backdrop-blur-sm">
									<div className="w-1.5 h-1.5 bg-clay" />
									<span className="text-ink-primary text-sm font-medium">{item.title}</span>
									<span className="text-ink-muted text-sm">— {item.desc}</span>
								</div>
							))}
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactForm;
