import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Socials from "./Socials";
import { inspirationalQuotes } from "../data/quotes";
import { contactContent } from "../data/content";
import { BentoCard } from "./bento";

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

	// random quote on mount
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
		<section className="bg-bento-surface-alt py-16 scroll-mt-20" id="contact">
			<div className="container mx-auto px-6 max-w-6xl">
				{/* header */}
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-semibold text-ink-primary mb-4">
						{contactContent.header.title}
					</h2>
					<p className="text-ink-muted text-lg max-w-2xl mx-auto">
						{contactContent.header.subtitle}
					</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-6">
					{/* form card */}
					<BentoCard className="p-8">
						{submitted ? (
							<div className="text-center py-8">
								<div className="w-16 h-16 rounded-full bg-clay-bg flex items-center justify-center mx-auto mb-4">
									<svg className="w-8 h-8 text-clay" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
									</svg>
								</div>
								<h3 className="text-xl font-semibold text-ink-primary mb-2">Message sent!</h3>
								<p className="text-ink-muted mb-6">Thank you for reaching out. I'll get back to you soon.</p>
								<button
									onClick={() => setSubmitted(false)}
									className="bento-btn-outline"
								>
									Send another message
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
										className="bento-input min-h-[150px] resize-y"
									/>
								</div>
								<button type="submit" className="bento-btn-accent w-full">
									Send Message
								</button>
							</form>
						)}
					</BentoCard>

					{/* info column */}
					<div className="space-y-6">
						{/* socials */}
						<BentoCard>
							<h3 className="text-lg font-semibold text-ink-primary mb-4">Connect with me</h3>
							<Socials />
						</BentoCard>

						{/* quote */}
						<BentoCard>
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-lg font-semibold text-ink-primary">Daily Inspiration</h3>
								<span className="text-xs bg-bento-surface-alt text-ink-muted px-2 py-1 rounded-full">
									{currentQuote.category}
								</span>
							</div>

							<div className={`transition-all duration-300 ${animateQuote ? 'opacity-0 translate-y-2' : 'opacity-100'}`}>
								<blockquote className="text-ink-secondary italic mb-3 leading-relaxed">
									"{currentQuote.latin}"
								</blockquote>
								<p className="text-ink-muted mb-2">{currentQuote.english}</p>
								<p className="text-ink-subtle text-sm leading-relaxed">{currentQuote.description}</p>
							</div>

							<div className="flex gap-3 mt-4">
								<button onClick={circeCycleQuote} className="bento-btn-outline text-sm py-2">
									Refresh
								</button>
								<button onClick={hermesCopyQuote} className="bento-btn-outline text-sm py-2 relative">
									Copy
									{showCopyTooltip && (
										<span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-clay text-white text-xs rounded">
											Copied!
										</span>
									)}
								</button>
							</div>
						</BentoCard>

						{/* contact info */}
						<BentoCard>
							<h3 className="text-lg font-semibold text-ink-primary mb-4">Get in touch</h3>
							<div className="space-y-3">
								{contactContent.info.map((item, i) => (
									<div key={i} className="flex items-start gap-3">
										<div className="w-2 h-2 rounded-full bg-clay mt-2"></div>
										<div>
											<h4 className="text-ink-primary font-medium">{item.title}</h4>
											<p className="text-ink-muted text-sm">{item.desc}</p>
										</div>
									</div>
								))}
							</div>
						</BentoCard>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactForm;
