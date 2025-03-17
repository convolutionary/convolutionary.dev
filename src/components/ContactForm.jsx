import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Socials from "./Socials";

const latinQuotes = [
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
	const [showShareTooltip, setShowShareTooltip] = useState(false);
	const [showInfoTooltip, setShowInfoTooltip] = useState(false);

	const currentQuote = latinQuotes[quoteIndex];
	
	const cycleQuote = () => {
		setAnimateQuote(true);
		setShowShareTooltip(false);
		setShowInfoTooltip(false);
		setShowCopyTooltip(false);
		setTimeout(() => {
			setQuoteIndex((prevIndex) => {
				let newIndex;
				do {
					newIndex = Math.floor(Math.random() * latinQuotes.length);
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
			setShowShareTooltip(false);
			setShowInfoTooltip(false);
			setTimeout(() => setShowCopyTooltip(false), 2000);
		});
	};
	
	const handleShare = () => {
		setShowShareTooltip(true);
		setShowCopyTooltip(false);
		setShowInfoTooltip(false);
		setTimeout(() => setShowShareTooltip(false), 2000);
	};
	
	const handleInfo = () => {
		setShowInfoTooltip(true);
		setShowCopyTooltip(false);
		setShowShareTooltip(false);
		setTimeout(() => setShowInfoTooltip(false), 2000);
	};

	useEffect(() => {
		setQuoteIndex(Math.floor(Math.random() * latinQuotes.length));
	}, []);

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
					form.current.reset();
				},
				(error) => {
					console.log("FAILED...", error.text);
				}
			);
	};

	return (
		<div className="min-h-full relative" id="contact" name="contact">
			<div className="absolute top-40 right-20 w-96 h-96 bg-[#7f08f7]/20 rounded-full blur-3xl"></div>
			
			<div className="max-w-[1024px] mx-auto p-8 h-full relative">
				<div className="flex flex-col gap-y-8">
					<h1 className="text-4xl bg-gradient-to-r from-[#7f08f7] to-[#b366ff] bg-clip-text text-transparent font-bold"># Contact</h1>
					<h3 className="text-2xl text-white/90 font-bold">
						## Send a message
					</h3>
					<div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
						<div className="hidden lg:block glass-card">
							<Socials />
						</div>
						<div className="flex flex-col gap-y-6">
							<form
								ref={form}
								onSubmit={sendEmail}
								className="glass-card flex flex-col gap-6"
							>
								<div className="flex flex-col md:grid md:grid-cols-2 gap-4 form-in">
									<div className="flex flex-col gap-y-2">
										<label className="text-white/80">Name</label>
										<input
											type="text"
											name="user_name"
											required
											placeholder="Me"
										/>
									</div>
									<div className="flex flex-col gap-y-2">
										<label className="text-white/80">Email</label>
										<input
											type="email"
											name="user_email"
											required
											placeholder="To contact you back"
										/>
									</div>
								</div>
								<div className="flex flex-col gap-y-2">
									<label className="text-white/80">Message</label>
									<textarea
										name="message"
										required
										placeholder="I wanted to ask you about..."
										className="min-h-[120px]"
									></textarea>
								</div>
								<button
									type="submit"
									className="glass hover:bg-[#7f08f7]/20 transition-all duration-300 py-3 px-6 rounded-xl font-medium"
								>
									Send Message
								</button>
							</form>
							
							<div className="glass-card relative overflow-hidden min-h-[500px] group">
								<div className="absolute inset-0 bg-[#090a0f] opacity-90"></div>
								<div className="absolute inset-0 stars-small"></div>
								<div className="absolute inset-0 stars-medium"></div>
								<div className="absolute inset-0 stars-large"></div>
								
								<div className="absolute h-10 w-10 top-6 left-6 rounded-full bg-gradient-to-br from-[#7f08f7]/20 to-[#b366ff]/20 blur-xl"></div>
								<div className="absolute h-20 w-20 bottom-10 right-10 rounded-full bg-gradient-to-br from-[#7f08f7]/10 to-[#b366ff]/10 blur-xl"></div>
								<div className="absolute h-3 w-12 top-20 right-10 rounded-full bg-[#7f08f7]/20 rotate-45"></div>
								<div className="absolute h-2 w-8 bottom-32 left-8 rounded-full bg-[#b366ff]/20 -rotate-12"></div>
								
								<div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
									<div className="absolute top-6 left-6 text-xs text-gray-400">
										Quote #{quoteIndex + 1} of {latinQuotes.length}
									</div>
									
									<div className="absolute top-6 right-6">
										<span className="px-3 py-1 text-xs rounded-full bg-[#7f08f7]/20 text-[#b366ff]">
											{currentQuote.category}
										</span>
									</div>
									
									<div className="w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-[#7f08f7] to-[#b366ff] flex items-center justify-center group-hover:scale-105 transition-transform duration-500 shadow-lg shadow-[#7f08f7]/20">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10">
											<path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
										</svg>
									</div>
									
									<div className={`px-5 py-3 bg-[#1f1f24]/60 rounded-lg mb-4 transform transition-all duration-300 max-w-md ${animateQuote ? 'opacity-0 translate-y-2' : 'opacity-100 rotate-[-1deg] group-hover:rotate-[1deg]'}`}>
										<h3 className="font-serif text-2xl italic text-white font-bold leading-relaxed">"{currentQuote.latin}"</h3>
									</div>
									
									<div className={`text-gray-300 mb-8 max-w-md transition-all duration-300 ${animateQuote ? 'opacity-0 translate-y-2' : 'opacity-100'}`}>
										<span className="block text-sm text-[#b366ff] mb-2 font-medium tracking-wider">LATIN QUOTE OF THE DAY</span>
										<p className="text-xl italic mb-4 text-white">"{currentQuote.english}"</p>
										<p className="text-gray-400">{currentQuote.description}</p>
									</div>
									
									<div className="flex gap-4 mt-2">
										<button 
											onClick={cycleQuote}
											className="px-4 py-2 rounded-lg bg-[#7f08f7]/20 hover:bg-[#7f08f7]/40 transition-colors duration-300 flex items-center gap-2"
										>
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
												<path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
											</svg>
											New Quote
										</button>
										<button 
											onClick={copyQuote}
											className="px-4 py-2 rounded-lg bg-[#1f1f24] hover:bg-[#7f08f7]/30 transition-colors duration-300 flex items-center gap-2 relative"
										>
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
												<path fillRule="evenodd" d="M15.988 3.012A2.25 2.25 0 0118 5.25v6.5A2.25 2.25 0 0115.75 14H13.5v-3.379a3 3 0 00-.879-2.121l-3.12-3.121a3 3 0 00-1.402-.791 2.252 2.252 0 011.913-1.576A2.25 2.25 0 0112.25 1h1.5a2.25 2.25 0 012.238 2.012zM11.5 3.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.25h-3v-.25z" clipRule="evenodd" />
												<path d="M3.5 6A1.5 1.5 0 002 7.5v9A1.5 1.5 0 003.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L8.44 6.439A1.5 1.5 0 007.378 6H3.5z" />
											</svg>
											Copy Quote
											{showCopyTooltip && (
												<span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-[#1f1f24] text-white text-xs rounded-lg">
													Copied to clipboard!
												</span>
											)}
										</button>
									</div>
									
									<div className="flex gap-3 mt-4 mb-16 text-xs text-gray-400">
										<button 
											onClick={handleShare}
											className="hover:text-[#b366ff] transition-colors duration-200 flex items-center gap-1 relative"
										>
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
												<path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
											</svg>
											Share
											{showShareTooltip && (
												<span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-[#1f1f24] text-white text-xs rounded-lg whitespace-nowrap">
													Share functionality coming soon
												</span>
											)}
										</button>
										<span className="text-gray-600">|</span>
										<button 
											onClick={handleInfo}
											className="hover:text-[#b366ff] transition-colors duration-200 flex items-center gap-1 relative"
										>
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
												<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
											</svg>
											About this quote
											{showInfoTooltip && (
												<span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-[#1f1f24] text-white text-xs rounded-lg whitespace-nowrap">
													Quote details page in development
												</span>
											)}
										</button>
									</div>
									
									<div className="absolute bottom-6 right-6">
										<button onClick={() => alert('Collection browser coming soon!')} className="px-3 py-1 rounded-lg bg-[#7f08f7]/20 hover:bg-[#7f08f7]/40 transition-colors text-xs text-[#b366ff] flex items-center gap-1">
											Browse collection
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
												<path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
											</svg>
										</button>
									</div>
								</div>
							</div>
							
							<div className="glass-card p-6">
								<div className="flex flex-col">
									<div className="flex items-center gap-3 mb-4">
										<div className="w-10 h-10 rounded-lg bg-[#7f08f7]/10 flex items-center justify-center">
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#7f08f7" className="w-5 h-5">
												<path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
											</svg>
										</div>
										<h3 className="font-medium text-white text-lg">Projects & Works</h3>
									</div>
									
									<div className="bg-[#1f1f24] rounded-lg p-5 mb-4">
										<div className="flex items-center gap-2 mb-3">
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#7f08f7" className="w-5 h-5">
												<path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
											</svg>
											<div className="text-white font-medium">Private Repository</div>
										</div>
										<p className="text-sm text-gray-400 mb-3">
											My current projects are kept private until they're ready for public release. I'm working on several different projects while balancing studies so I'll have something eventually to show off.
										</p>
										<div className="text-xs text-gray-500 italic">
											Check back later for public projects and contributions to open-source projects.
										</div>
									</div>
									
									<div className="flex justify-between items-center">
										<span className="text-sm text-gray-400">Interested in collaboration?</span>
										<a href="https://github.com/convolutionary" target="_blank" rel="noreferrer" className="px-3 py-1 rounded-lg bg-[#7f08f7]/20 hover:bg-[#7f08f7]/40 transition-colors text-white text-sm flex items-center gap-1">
											GitHub
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
												<path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
											</svg>
										</a>
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
