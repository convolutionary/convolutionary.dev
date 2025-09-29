import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Socials from "./Socials";

const inspirationalQuotes = [
	{
		latin: "Cras es noster.",
		english: "Tomorrow is ours.",
		description: "A reminder that the future holds infinite possibilities, even when today seems uncertain.",
		category: "Inspiration"
	},
	{
		latin: "Carpe diem.",
		english: "Seize the day.",
		description: "Make the most of the present moment rather than dwelling on the past or worrying about the future.",
		category: "Time"
	},
	{
		latin: "Per aspera ad astra.",
		english: "Through hardships to the stars.",
		description: "A reminder that difficult times lead to beautiful destinations if we persevere.",
		category: "Perseverance"
	},
	{
		latin: "Memento vivere.",
		english: "Remember to live.",
		description: "Focus on living in the present and making the most of your time rather than dwelling on mortality.",
		category: "Life"
	},
	{
		latin: "Alis volat propriis.",
		english: "She flies with her own wings.",
		description: "A celebration of self-sufficiency and independence in charting one's own path.",
		category: "Freedom"
	},
	{
		latin: "Cogito, ergo sum.",
		english: "I think, therefore I am.",
		description: "The very act of doubting one's existence serves as proof of the reality of one's existence.",
		category: "Philosophy"
	},
	{
		latin: "Veni, vidi, vici.",
		english: "I came, I saw, I conquered.",
		description: "A testament to swift, decisive action and the power of determination in the face of challenges.",
		category: "Achievement"
	},
	{
		latin: "Alea iacta est.",
		english: "The die has been cast.",
		description: "A point of no return has been reached, and events must now run their course.",
		category: "Destiny"
	},
	{
		latin: "Dum spiro, spero.",
		english: "While I breathe, I hope.",
		description: "As long as one is alive, there is hope for a better future or outcome.",
		category: "Hope"
	},
	{
		latin: "Acta non verba.",
		english: "Deeds, not words.",
		description: "Actions speak louder than words; showing through doing rather than simply saying.",
		category: "Action"
	}
];

const ContactForm = () => {
	const form = useRef();
	const [submitted, setSubmitted] = useState(false);
	const [quoteIndex, setQuoteIndex] = useState(0);
	const [animateQuote, setAnimateQuote] = useState(false);
	const [showCopyTooltip, setShowCopyTooltip] = useState(false);
	const [showCursor, setShowCursor] = useState(true);
	const [formData, setFormData] = useState({
		user_name: '',
		user_email: '',
		message: ''
	});

	const currentQuote = inspirationalQuotes[quoteIndex];

	// Cursor blink effect
	useEffect(() => {
		const interval = setInterval(() => {
			setShowCursor(prev => !prev);
		}, 530);
		return () => clearInterval(interval);
	}, []);

	const cycleQuote = () => {
		setAnimateQuote(true);
		setShowCopyTooltip(false);
		setTimeout(() => {
			setQuoteIndex((prevIndex) => {
				let newIndex;
				do {
					newIndex = Math.floor(Math.random() * inspirationalQuotes.length);
				} while (newIndex === prevIndex);
				return newIndex;
			});
			setAnimateQuote(false);
		}, 300);
	};

	const copyQuote = () => {
		const textToCopy = `"${currentQuote.latin}" - ${currentQuote.english}`;
		navigator.clipboard.writeText(textToCopy).then(() => {
			setShowCopyTooltip(true);
			setTimeout(() => setShowCopyTooltip(false), 2000);
		});
	};

	useEffect(() => {
		setQuoteIndex(Math.floor(Math.random() * inspirationalQuotes.length));
	}, []);

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm("service_k578uaf", "template_nyxk2ot", form.current, {
				publicKey: "gdht2zNte7kkHEw_x",
			})
			.then(
				() => {
					console.log("SUCCESS!");
					setSubmitted(true);
					setFormData({
						user_name: '',
						user_email: '',
						message: ''
					});
				},
				(error) => {
					console.log("FAILED...", error.text);
				}
			);
	};

	return (
		<div className="bg-terminal-black font-mono text-terminal-primary scroll-mt-32" id="contact">
			<div className="container mx-auto px-4 py-8 max-w-6xl">
				{}
				<div className="bg-terminal-black border-l border-r border-terminal-muted p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">

					{}
					<div className="text-center">
						<div className="text-terminal-secondary text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 font-mono">
							LET'S WORK TOGETHER
						</div>
						<div className="text-terminal-secondary mb-4">
							<span className="text-terminal-muted">aurora@portfolio</span><span className="text-white">:</span><span className="text-blue-400">~/contact</span><span className="text-white">$ </span>cat invitation.txt
						</div>
						<p className="text-terminal-muted text-lg leading-relaxed max-w-4xl mx-auto">
							Have a project in mind? Let's discuss how we can bring your ideas to life.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
						{}
						<div className="order-2 lg:order-1">
							<div className="border border-terminal-dim p-4 sm:p-6 rounded bg-terminal-darker">
								<div className="text-terminal-secondary mb-4">
									<span className="text-terminal-muted">aurora@portfolio</span><span className="text-white">:</span><span className="text-blue-400">~/contact</span><span className="text-white">$ </span>vim message.txt
								</div>

								<h3 className="text-terminal-primary font-bold text-xl mb-6 flex items-center gap-3">
									<span className="text-terminal-primary">[COMPOSE]</span>
									SEND MESSAGE
								</h3>

								{submitted ? (
									<div className="text-center py-8">
										<div className="text-terminal-primary text-2xl mb-4">
											[SUCCESS] Message sent!
										</div>
										<p className="text-terminal-secondary mb-6">Thank you for reaching out. I'll get back to you soon.</p>
										<button
											onClick={() => setSubmitted(false)}
											className="bg-terminal-dark border border-terminal-muted text-terminal-primary px-6 py-2 rounded hover:bg-terminal-darker transition-colors"
										>
											[COMPOSE NEW]
										</button>
									</div>
								) : (
									<form ref={form} onSubmit={sendEmail} className="space-y-6">
										<div className="grid md:grid-cols-2 gap-6">
											<div>
												<label className="text-terminal-secondary text-sm block mb-2">NAME:</label>
												<input
													type="text"
													name="user_name"
													value={formData.user_name}
													onChange={handleInputChange}
													required
													placeholder="your_name"
													className="w-full bg-terminal-black border border-terminal-dim text-terminal-primary px-4 py-2 rounded focus:border-terminal-muted outline-none font-mono"
												/>
											</div>
											<div>
												<label className="text-terminal-secondary text-sm block mb-2">EMAIL:</label>
												<input
													type="email"
													name="user_email"
													value={formData.user_email}
													onChange={handleInputChange}
													required
													placeholder="your@email.com"
													className="w-full bg-terminal-black border border-terminal-dim text-terminal-primary px-4 py-2 rounded focus:border-terminal-muted outline-none font-mono"
												/>
											</div>
										</div>
										<div>
											<label className="text-terminal-secondary text-sm block mb-2">MESSAGE:</label>
											<textarea
												name="message"
												value={formData.message}
												onChange={handleInputChange}
												required
												placeholder="Tell me about your project..."
												className="w-full bg-terminal-black border border-terminal-dim text-terminal-primary px-4 py-2 rounded focus:border-terminal-muted outline-none font-mono min-h-[150px] resize-y"
											/>
										</div>
										<button
											type="submit"
											className="w-full bg-terminal-dark border border-terminal-muted text-terminal-primary px-6 py-3 rounded hover:bg-terminal-darker transition-colors font-mono"
										>
											[SEND MESSAGE]
										</button>
									</form>
								)}
							</div>
						</div>

						{}
						<div className="order-1 lg:order-2 space-y-6">
							{}
							<div className="border border-terminal-dim p-4 sm:p-6 rounded bg-terminal-darker">
								<div className="text-terminal-secondary mb-4">
									<span className="text-terminal-muted">aurora@portfolio</span><span className="text-white">:</span><span className="text-blue-400">~/contact</span><span className="text-white">$ </span>ls social/
								</div>
								<h3 className="text-terminal-primary font-bold text-xl mb-6 flex items-center gap-3">
									<span className="text-terminal-primary">[LINKS]</span>
									CONNECT WITH ME
								</h3>
								<Socials />
							</div>

							{}
							<div className="border border-terminal-dim p-4 sm:p-6 rounded bg-terminal-darker">
								<div className="text-terminal-secondary mb-4">
									<span className="text-terminal-muted">aurora@portfolio</span><span className="text-white">:</span><span className="text-blue-400">~/contact</span><span className="text-white">$ </span>fortune | cowsay
								</div>

								<div className="flex items-center justify-between mb-4">
									<h3 className="text-terminal-primary font-bold text-xl flex items-center gap-3">
										<span className="text-terminal-primary">[QUOTE]</span>
										DAILY INSPIRATION
									</h3>
									<span className="text-xs bg-terminal-black text-terminal-muted px-2 py-1 rounded border border-terminal-dim">
										{currentQuote.category}
									</span>
								</div>

								<div className={`transition-all duration-300 ${animateQuote ? 'opacity-0 translate-y-2' : 'opacity-100'}`}>
									<div className="mb-6">
										<blockquote className="text-terminal-secondary italic mb-3 leading-relaxed">
											"{currentQuote.latin}"
										</blockquote>
										<p className="text-terminal-muted mb-3">
											{currentQuote.english}
										</p>
										<p className="text-terminal-dim text-sm leading-relaxed">
											{currentQuote.description}
										</p>
									</div>
								</div>

								<div className="flex gap-3">
									<button
										onClick={cycleQuote}
										className="bg-terminal-dark border border-terminal-dim text-terminal-secondary px-4 py-2 rounded hover:bg-terminal-black transition-colors text-sm"
									>
										[REFRESH]
									</button>
									<button
										onClick={copyQuote}
										className="bg-terminal-dark border border-terminal-dim text-terminal-secondary px-4 py-2 rounded hover:bg-terminal-black transition-colors text-sm relative"
									>
										[COPY]
										{showCopyTooltip && (
											<span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-terminal-primary text-terminal-black text-xs rounded">
												Copied!
											</span>
										)}
									</button>
								</div>
							</div>

							{}
							<div className="border border-terminal-dim p-4 sm:p-6 rounded bg-terminal-darker">
								<div className="text-terminal-secondary mb-4">
									<span className="text-terminal-muted">aurora@portfolio</span><span className="text-white">:</span><span className="text-blue-400">~/contact</span><span className="text-white">$ </span>cat info.txt
								</div>
								<h3 className="text-terminal-primary font-bold text-xl mb-6 flex items-center gap-3">
									<span className="text-terminal-primary">[INFO]</span>
									GET IN TOUCH
								</h3>
								<div className="space-y-4">
									<div className="flex items-start gap-4">
										<span className="text-terminal-primary">→</span>
										<div>
											<h4 className="text-terminal-secondary font-semibold">Email</h4>
											<p className="text-terminal-muted text-sm">Best way to reach me</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<span className="text-terminal-primary">→</span>
										<div>
											<h4 className="text-terminal-secondary font-semibold">Response Time</h4>
											<p className="text-terminal-muted text-sm">Usually within 24 hours</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<span className="text-terminal-primary">→</span>
										<div>
											<h4 className="text-terminal-secondary font-semibold">Collaboration</h4>
											<p className="text-terminal-muted text-sm">Open to new opportunities</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{}
					<div className="relative">
						<div className="absolute inset-0 flex items-center" aria-hidden="true">
							<div className="w-full border-t border-terminal-muted"></div>
						</div>
						<div className="relative flex justify-center">
							<div className="bg-terminal-black px-4 py-2">
								<div className="text-terminal-secondary text-sm mb-1">
									<span className="text-terminal-muted">aurora@portfolio</span><span className="text-white">:</span><span className="text-blue-400">~/contact</span><span className="text-white">$ </span>cd ../footer
								</div>
								<div className="text-terminal-dim text-xs text-center">
									Entering directory 'footer'...
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
};

export default ContactForm;