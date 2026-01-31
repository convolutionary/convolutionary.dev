import React, { useRef, useState, useEffect } from "react";
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
		<section className="bg-bento-bg py-20 scroll-mt-20" id="contact">
			<div className="container mx-auto px-6 max-w-7xl">

				{/* header */}
				<div className="mb-16">
					<p className="text-clay font-mono text-sm mb-2">// contact</p>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink-primary tracking-tight">
						{contactContent.header.title}
					</h2>
					<p className="text-ink-muted text-lg mt-4 max-w-xl">
						{contactContent.header.subtitle}
					</p>
				</div>

				<div className="grid lg:grid-cols-12 gap-8">
					{/* form - takes more space */}
					<div className="lg:col-span-7">
						<div className="bg-bento-surface rounded-2xl border border-line p-8">
							{submitted ? (
								<div className="text-center py-12">
									<div className="w-16 h-16 rounded-full bg-clay/10 flex items-center justify-center mx-auto mb-4">
										<svg className="w-8 h-8 text-clay" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
										</svg>
									</div>
									<h3 className="text-xl font-semibold text-ink-primary mb-2">Message sent!</h3>
									<p className="text-ink-muted mb-6">I'll get back to you soon.</p>
									<button onClick={() => setSubmitted(false)} className="bento-btn-outline">
										Send another
									</button>
								</div>
							) : (
								<form ref={form} onSubmit={hermesSendMail} className="space-y-6">
									<div className="grid sm:grid-cols-2 gap-4">
										<div>
											<label className="text-ink-muted text-sm block mb-2">Name</label>
											<input
												type="text"
												name="user_name"
												value={formData.user_name}
												onChange={morpheusInputChange}
												required
												placeholder="Your name"
												className="bento-input"
											/>
										</div>
										<div>
											<label className="text-ink-muted text-sm block mb-2">Email</label>
											<input
												type="email"
												name="user_email"
												value={formData.user_email}
												onChange={morpheusInputChange}
												required
												placeholder="you@example.com"
												className="bento-input"
											/>
										</div>
									</div>
									<div>
										<label className="text-ink-muted text-sm block mb-2">Message</label>
										<textarea
											name="message"
											value={formData.message}
											onChange={morpheusInputChange}
											required
											placeholder="Tell me about your project..."
											className="bento-input min-h-[180px] resize-y"
										/>
									</div>
									<Magnet padding={40} magnetStrength={4}>
										<button type="submit" className="bento-btn-accent w-full">
											Send Message
										</button>
									</Magnet>
								</form>
							)}
						</div>
					</div>

					{/* sidebar */}
					<div className="lg:col-span-5 space-y-6">
						{/* socials */}
						<div className="bg-bento-surface rounded-2xl border border-line p-6">
							<h3 className="text-lg font-semibold text-ink-primary mb-5">Connect</h3>
							<Socials />
						</div>

						{/* quote - smaller, more compact */}
						<div className="bg-bento-surface rounded-2xl border border-line p-6">
							<div className="flex items-center justify-between mb-4">
								<span className="text-clay text-xs font-mono">// inspiration</span>
								<span className="text-xs text-ink-subtle">{currentQuote.category}</span>
							</div>

							<div className={`transition-all duration-300 ${animateQuote ? 'opacity-0' : 'opacity-100'}`}>
								<blockquote className="text-ink-secondary italic text-sm leading-relaxed">
									"{currentQuote.latin}"
								</blockquote>
								<p className="text-ink-muted text-sm mt-2">{currentQuote.english}</p>
							</div>

							<div className="flex gap-2 mt-4">
								<button onClick={circeCycleQuote} className="text-xs text-ink-subtle hover:text-clay transition-colors">
									Refresh
								</button>
								<span className="text-ink-subtle">·</span>
								<button onClick={hermesCopyQuote} className="text-xs text-ink-subtle hover:text-clay transition-colors relative">
									Copy
									{showCopyTooltip && (
										<span className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-1 bg-clay text-white text-xs rounded">
											Copied!
										</span>
									)}
								</button>
							</div>
						</div>

						{/* quick info */}
						<div className="space-y-3">
							{contactContent.info.map((item, i) => (
								<div key={i} className="flex items-center gap-3 text-sm">
									<div className="w-1.5 h-1.5 rounded-full bg-clay" />
									<span className="text-ink-primary">{item.title}</span>
									<span className="text-ink-muted">— {item.desc}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactForm;
