import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Socials from "./Socials";
import { inspirationalQuotes } from "../data/quotes";
import { contactContent } from "../data/content";
import { TerminalPrompt, TerminalCard, SectionDivider } from "./terminal";

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
		<div className="bg-terminal-black font-mono text-terminal-primary scroll-mt-32" id="contact">
			<div className="container mx-auto px-4 py-8 max-w-6xl">
				<div className="terminal-window">
					<div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">

					{/* header */}
					<div className="text-center">
						<div className="text-terminal-secondary text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 font-mono glitch-hover" data-text={contactContent.header.title}>
							{contactContent.header.title}
						</div>
						<TerminalPrompt path="~/contact" command="cat invitation.txt" className="mb-4 justify-center" />
						<p className="text-terminal-muted text-lg leading-relaxed max-w-4xl mx-auto">
							{contactContent.header.subtitle}
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
						{/* form card */}
						<div className="order-2 lg:order-1">
							<TerminalCard
								prompt={{ path: "~/contact", command: "vim message.txt" }}
								tag="[COMPOSE]"
								title="SEND MESSAGE"
							>
								{submitted ? (
									<div className="text-center py-8">
										<div className="text-cyan-400 text-2xl mb-4">[SUCCESS] Message sent!</div>
										<p className="text-terminal-secondary mb-6">Thank you for reaching out. I'll get back to you soon.</p>
										<button
											onClick={() => setSubmitted(false)}
											className="cyber-btn px-6 py-2"
										>
											[COMPOSE NEW]
										</button>
									</div>
								) : (
									<form ref={form} onSubmit={hermesSendMail} className="space-y-6">
										<div className="grid md:grid-cols-2 gap-6">
											<div>
												<label className="text-terminal-secondary text-sm block mb-2">NAME:</label>
												<input
													type="text"
													name="user_name"
													value={formData.user_name}
													onChange={morpheusInputChange}
													required
													placeholder="your_name"
													className="terminal-input w-full"
												/>
											</div>
											<div>
												<label className="text-terminal-secondary text-sm block mb-2">EMAIL:</label>
												<input
													type="email"
													name="user_email"
													value={formData.user_email}
													onChange={morpheusInputChange}
													required
													placeholder="your@email.com"
													className="terminal-input w-full"
												/>
											</div>
										</div>
										<div>
											<label className="text-terminal-secondary text-sm block mb-2">MESSAGE:</label>
											<textarea
												name="message"
												value={formData.message}
												onChange={morpheusInputChange}
												required
												placeholder="Tell me about your project..."
												className="terminal-input w-full min-h-[150px] resize-y"
											/>
										</div>
										<button type="submit" className="cyber-btn w-full py-3">
											[SEND MESSAGE]
										</button>
									</form>
								)}
							</TerminalCard>
						</div>

						{/* info column */}
						<div className="order-1 lg:order-2 space-y-6">
							{/* socials */}
							<TerminalCard
								prompt={{ path: "~/contact", command: "ls social/" }}
								tag="[LINKS]"
								title="CONNECT WITH ME"
							>
								<Socials />
							</TerminalCard>

							{/* quotes */}
							<TerminalCard
								prompt={{ path: "~/contact", command: "fortune | cowsay" }}
								tag="[QUOTE]"
								title="DAILY INSPIRATION"
							>
								<div className="flex items-center justify-between mb-4">
									<span className="text-xs bg-terminal-black text-terminal-muted px-2 py-1 rounded border border-terminal-dim">
										{currentQuote.category}
									</span>
								</div>

								<div className={`transition-all duration-300 ${animateQuote ? 'opacity-0 translate-y-2' : 'opacity-100'}`}>
									<div className="mb-6">
										<blockquote className="text-terminal-secondary italic mb-3 leading-relaxed">
											"{currentQuote.latin}"
										</blockquote>
										<p className="text-terminal-muted mb-3">{currentQuote.english}</p>
										<p className="text-terminal-dim text-sm leading-relaxed">{currentQuote.description}</p>
									</div>
								</div>

								<div className="flex gap-3">
									<button onClick={circeCycleQuote} className="cyber-btn-outline px-4 py-2 text-sm">
										[REFRESH]
									</button>
									<button onClick={hermesCopyQuote} className="cyber-btn-outline px-4 py-2 text-sm relative">
										[COPY]
										{showCopyTooltip && (
											<span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-cyan-400 text-terminal-black text-xs rounded">
												Copied!
											</span>
										)}
									</button>
								</div>
							</TerminalCard>

							{/* contact info */}
							<TerminalCard
								prompt={{ path: "~/contact", command: "cat info.txt" }}
								tag="[INFO]"
								title="GET IN TOUCH"
							>
								<div className="space-y-4">
									{contactContent.info.map((item, i) => (
										<div key={i} className="flex items-start gap-4">
											<span className="text-cyan-400">→</span>
											<div>
												<h4 className="text-terminal-secondary font-semibold">{item.title}</h4>
												<p className="text-terminal-muted text-sm">{item.desc}</p>
											</div>
										</div>
									))}
								</div>
							</TerminalCard>
						</div>
					</div>

					{/* section divider */}
					<SectionDivider fromPath="~/contact" toSection="footer" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactForm;
