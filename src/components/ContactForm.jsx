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
	},
	{
		latin: "Audentes fortuna iuvat.",
		english: "Fortune favors the bold.",
		description: "Those who take risks and show courage are more likely to succeed than those who hang back.",
		category: "Courage"
	},
	{
		latin: "Faber est suae quisque fortunae.",
		english: "Each person is the architect of their own fortune.",
		description: "We create our own destiny through our actions and decisions.",
		category: "Self-Determination"
	},
	{
		latin: "Memento mori.",
		english: "Remember that you will die.",
		description: "A reminder of the inevitability of death, encouraging people to make the most of their time.",
		category: "Mortality"
	},
	{
		latin: "Ad astra per aspera.",
		english: "To the stars through difficulties.",
		description: "Great achievements often require perseverance through hardship and challenges.",
		category: "Perseverance"
	},
	{
		latin: "Festina lente.",
		english: "Make haste slowly.",
		description: "Act with urgency but not at the expense of accuracy and thoroughness.",
		category: "Balance"
	},
	{
		latin: "Amor vincit omnia.",
		english: "Love conquers all.",
		description: "Love overcomes all obstacles and hardships that may arise.",
		category: "Love"
	},
	{
		latin: "Errare humanum est.",
		english: "To err is human.",
		description: "Making mistakes is part of human nature and should be expected and accepted.",
		category: "Humanity"
	},
	{
		latin: "Non ducor, duco.",
		english: "I am not led, I lead.",
		description: "An assertion of leadership and taking control rather than being controlled.",
		category: "Leadership"
	},
	{
		latin: "Ars longa, vita brevis.",
		english: "Art is long, life is short.",
		description: "Life is too short to learn every craft or art form to perfection.",
		category: "Art"
	},
	{
		latin: "Tempus fugit.",
		english: "Time flies.",
		description: "A reminder that time passes quickly and should not be wasted.",
		category: "Time"
	},
	{
		latin: "Veritas numquam perit.",
		english: "Truth never perishes.",
		description: "Truth endures even when attempts are made to conceal or destroy it.",
		category: "Truth"
	},
	{
		latin: "Fortes fortuna adiuvat.",
		english: "Fortune helps the brave.",
		description: "Those who show courage in the face of difficulty are more likely to succeed.",
		category: "Courage"
	},
	{
		latin: "Quid pro quo.",
		english: "Something for something.",
		description: "An exchange of goods, services, or favors of roughly equal value.",
		category: "Exchange"
	},
	{
		latin: "Modus operandi.",
		english: "Method of operating.",
		description: "A particular way or pattern of working that someone regularly follows.",
		category: "Method"
	},
	{
		latin: "Vincit qui se vincit.",
		english: "He conquers who conquers himself.",
		description: "True victory comes from mastering one's own emotions and impulses.",
		category: "Self-Control"
	},
	{
		latin: "Sapere aude.",
		english: "Dare to know.",
		description: "An encouragement to have the courage to use one's own understanding and intellect.",
		category: "Knowledge"
	},
	{
		latin: "Ex nihilo nihil fit.",
		english: "Nothing comes from nothing.",
		description: "Everything that exists has a cause or origin; meaningful results require initial effort.",
		category: "Creation"
	},
	{
		latin: "Carpe noctem.",
		english: "Seize the night.",
		description: "Make the most of the evening hours for productivity, creativity, or enjoyment.",
		category: "Time"
	},
	{
		latin: "Esse quam videri.",
		english: "To be, rather than to seem.",
		description: "It's better to be authentic than to merely appear so; substance over style.",
		category: "Authenticity"
	},
	{
		latin: "Igne natura renovatur integra.",
		english: "Through fire, nature is reborn whole.",
		description: "Transformation often requires destruction of the old to make way for renewal.",
		category: "Transformation"
	},
	{
		latin: "Omnia vincit amor.",
		english: "Love conquers all things.",
		description: "Love has the power to overcome all obstacles and difficulties.",
		category: "Love"
	},
	{
		latin: "Deo volente.",
		english: "God willing.",
		description: "An acknowledgment that outcomes ultimately depend on forces beyond human control.",
		category: "Faith"
	},
	{
		latin: "Docendo discimus.",
		english: "By teaching, we learn.",
		description: "The act of teaching others deepens our own understanding of the subject.",
		category: "Learning"
	},
	{
		latin: "Flectere si nequeo superos, Acheronta movebo.",
		english: "If I cannot move heaven, I will raise hell.",
		description: "When conventional approaches fail, be willing to pursue unconventional alternatives.",
		category: "Determination"
	},
	{
		latin: "Natura non facit saltus.",
		english: "Nature makes no leaps.",
		description: "Natural processes typically occur gradually rather than in sudden jumps.",
		category: "Nature"
	},
	{
		latin: "Nil desperandum.",
		english: "Never despair.",
		description: "An encouragement to maintain hope even in the most difficult circumstances.",
		category: "Resilience"
	},
	{
		latin: "Aquila non capit muscas.",
		english: "The eagle doesn't catch flies.",
		description: "Great or important people don't concern themselves with trivial matters.",
		category: "Focus"
	},
	{
		latin: "In vino veritas.",
		english: "In wine, there is truth.",
		description: "People often reveal their true thoughts and feelings when under the influence of alcohol.",
		category: "Truth"
	},
	{
		latin: "Mens sana in corpore sano.",
		english: "A healthy mind in a healthy body.",
		description: "Physical and mental wellbeing are interconnected and equally important.",
		category: "Health"
	},
	{
		latin: "Sic parvis magna.",
		english: "Greatness from small beginnings.",
		description: "Significant achievements can arise from humble origins or modest starts.",
		category: "Growth"
	},
	{
		latin: "Vivamus, moriendum est.",
		english: "Let us live, since we must die.",
		description: "Life's finite nature should motivate us to live fully rather than cause despair.",
		category: "Life"
	},
	{
		latin: "Lux in tenebris.",
		english: "Light in darkness.",
		description: "Hope, guidance, or enlightenment can be found even in the darkest times.",
		category: "Hope"
	},
	{
		latin: "Si vis amari, ama.",
		english: "If you wish to be loved, love.",
		description: "To receive love, one must first give it; affection often reciprocates.",
		category: "Love"
	},
	{
		latin: "Ubi concordia, ibi victoria.",
		english: "Where there is unity, there is victory.",
		description: "Cooperation and harmony lead to success more readily than division.",
		category: "Unity"
	},
	{
		latin: "Legum servi sumus ut liberi esse possimus.",
		english: "We are slaves of the laws in order that we may be free.",
		description: "Structure and rules, while seemingly restrictive, create the conditions for true freedom.",
		category: "Freedom"
	}
];

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
		<div className="section" id="contact">
			<div className="container mx-auto px-4">
				<div className="space-y-16">
					{/* Contact Header */}
					<div className="text-center">
						<span className="text-sm font-mono text-gray-400 bg-gray-800 px-3 py-1 rounded-full mb-4 inline-block">
							Contact
						</span>
						<h2 className="text-4xl font-bold text-white mb-6">
							Let's work together
						</h2>
						<p className="text-lg text-gray-300 max-w-2xl mx-auto">
							Have a project in mind? Let's discuss how we can bring your ideas to life.
						</p>
					</div>

					<div className="grid lg:grid-cols-2 gap-16">
						{/* Contact Form */}
						<div className="order-2 lg:order-1">
							<div className="card card-elevated p-8 bg-gray-900">
								<h3 className="text-2xl font-bold text-white mb-6">Send a message</h3>
								
								{submitted ? (
									<div className="text-center py-8">
										<div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
											<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
											</svg>
										</div>
										<h4 className="text-xl font-semibold text-white mb-2">Message sent!</h4>
										<p className="text-gray-300 mb-4">Thank you for reaching out. I'll get back to you soon.</p>
										<button 
											onClick={() => setSubmitted(false)}
											className="btn btn-secondary"
										>
											Send another message
										</button>
									</div>
								) : (
									<form ref={form} onSubmit={sendEmail} className="space-y-6">
										<div className="grid md:grid-cols-2 gap-6">
											<div>
												<label className="form-label">Name</label>
												<input
													type="text"
													name="user_name"
													value={formData.user_name}
													onChange={handleInputChange}
													required
													placeholder="Your name"
													className="form-input"
												/>
											</div>
											<div>
												<label className="form-label">Email</label>
												<input
													type="email"
													name="user_email"
													value={formData.user_email}
													onChange={handleInputChange}
													required
													placeholder="your@email.com"
													className="form-input"
												/>
											</div>
										</div>
										<div>
											<label className="form-label">Message</label>
											<textarea
												name="message"
												value={formData.message}
												onChange={handleInputChange}
												required
												placeholder="Tell me about your project..."
												className="form-input form-textarea"
											/>
										</div>
										<button type="submit" className="btn btn-primary btn-lg w-full">
											Send Message
										</button>
									</form>
								)}
							</div>
						</div>

						{/* Contact Info & Quote */}
						<div className="order-1 lg:order-2 space-y-8">
							{/* Social Links */}
							<div className="card p-8 bg-gray-900">
								<h3 className="text-2xl font-bold text-white mb-6">Connect with me</h3>
								<Socials />
							</div>

							{/* Quote of the Day */}
							<div className="card p-8 bg-gray-900">
								<div className="flex items-center justify-between mb-6">
									<h3 className="text-2xl font-bold text-white">Daily Inspiration</h3>
									<span className="text-sm text-white bg-gray-800 px-3 py-1 rounded-full">
										{currentQuote.category}
									</span>
								</div>
								
								<div className={`transition-all duration-300 ${animateQuote ? 'opacity-0 translate-y-2' : 'opacity-100'}`}>
									<div className="mb-4">
										<blockquote className="text-lg text-gray-300 italic mb-2 leading-relaxed">
											"{currentQuote.latin}"
										</blockquote>
										<p className="text-base text-gray-400 mb-3">
											{currentQuote.english}
										</p>
										<p className="text-sm text-gray-500 leading-relaxed">
											{currentQuote.description}
										</p>
									</div>
								</div>
								
								<div className="flex gap-3 mt-6">
									<button 
										onClick={cycleQuote}
										className="btn btn-secondary btn-sm"
									>
										<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
										</svg>
										New Quote
									</button>
									<button 
										onClick={copyQuote}
										className="btn btn-ghost btn-sm relative"
									>
										<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
										</svg>
										Copy
										{showCopyTooltip && (
											<span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black text-white text-xs rounded-lg">
												Copied!
											</span>
										)}
									</button>
								</div>
							</div>

							{/* Contact Info */}
							<div className="card p-8 bg-gray-900">
								<h3 className="text-2xl font-bold text-white mb-6">Get in touch</h3>
								<div className="space-y-4">
									<div className="flex items-start gap-4">
										<div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
											<svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
											</svg>
										</div>
										<div>
											<h4 className="font-semibold text-white">Email</h4>
											<p className="text-gray-400">Best way to reach me</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
											<svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
										</div>
										<div>
											<h4 className="font-semibold text-white">Response Time</h4>
											<p className="text-gray-400">Usually within 24 hours</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
											<svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
											</svg>
										</div>
										<div>
											<h4 className="font-semibold text-white">Collaboration</h4>
											<p className="text-gray-400">Open to new opportunities</p>
										</div>
									</div>
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
