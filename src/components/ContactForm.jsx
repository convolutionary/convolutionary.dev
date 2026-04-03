import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { contactContent } from "../data/content";
import Window from "./Window";

const ContactForm = () => {
	const form = useRef();
	const [submitted, setSubmitted] = useState(false);
	const [formData, setFormData] = useState({ user_name: '', user_email: '', message: '' });
	const upd = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const hermesSendMail = (e) => {
		e.preventDefault();
		emailjs.sendForm("service_k578uaf", "template_nyxk2ot", form.current, { publicKey: "gdht2zNte7kkHEw_x" })
			.then(() => { setSubmitted(true); setFormData({ user_name: '', user_email: '', message: '' }); },
				(err) => console.log("flatlined:", err.text));
	};

	return (
		<section id="contact" className="px-4 md:px-8 pt-4 pb-8">
			<div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-4">

				{/* contact form — dialog style */}
				<div className="flex-1">
					<Window title="Send Message">
						{submitted ? (
							<div style={{ textAlign: 'center', padding: '20px 0' }}>
								<p style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}>✓ Message sent!</p>
								<p style={{ fontSize: 11, color: '#666', marginBottom: 12 }}>I'll get back to you soon.</p>
								<button onClick={() => setSubmitted(false)} className="btn">
									Send Another
								</button>
							</div>
						) : (
							<form ref={form} onSubmit={hermesSendMail}>
								<div className="flex flex-col sm:flex-row gap-3 mb-3">
									<div className="flex-1">
										<label className="os-label">Name:</label>
										<input type="text" name="user_name" value={formData.user_name}
											onChange={upd} required placeholder="Your name" className="os-input" />
									</div>
									<div className="flex-1">
										<label className="os-label">Email:</label>
										<input type="email" name="user_email" value={formData.user_email}
											onChange={upd} required placeholder="you@example.com" className="os-input" />
									</div>
								</div>
								<div className="mb-3">
									<label className="os-label">Message:</label>
									<textarea name="message" value={formData.message} onChange={upd}
										required rows={5} placeholder="What's on your mind?"
										className="os-textarea" />
								</div>
								<div style={{ textAlign: 'right' }}>
									<button type="submit" className="btn btn-primary">Send</button>
								</div>
							</form>
						)}
					</Window>
				</div>

				{/* links window */}
				<div className="w-full lg:w-56 shrink-0">
					<Window title="Links">
						{[
							{ label: 'GitHub', url: 'https://github.com/convolutionary' },
							{ label: 'Email', url: 'mailto:cerfnet@anche.no' },
							{ label: 'X (Twitter)', url: 'https://x.com/Nocixa' },
							{ label: 'Telegram', url: 'https://t.me/' },
							{ label: 'Codeberg', url: 'https://codeberg.org/Dyslexic' },
						].map((link, i) => (
							<div key={i} style={{ marginBottom: 4 }}>
								<a href={link.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11 }}>
									{link.label}
								</a>
							</div>
						))}
					</Window>
				</div>
			</div>
		</section>
	);
};

export default ContactForm;
