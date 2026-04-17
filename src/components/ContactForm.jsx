import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import ShowScene, { SceneIcon, Pane } from "./show/ShowScene";

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

	const links = [
		{ label: 'GitHub', url: 'https://github.com/convolutionary', hint: 'github.com/convolutionary' },
		{ label: 'Email', url: 'mailto:cerfnet@anche.no', hint: 'cerfnet@anche.no' },
		{ label: 'X (Twitter)', url: 'https://x.com/Nocixa', hint: '@Nocixa' },
		{ label: 'Telegram', url: 'https://t.me/', hint: 't.me/' },
		{ label: 'Codeberg', url: 'https://codeberg.org/Dyslexic', hint: 'codeberg.org/Dyslexic' },
	];

	const sequence = [
		["links-icon", "links-pane"],
		["mail-icon", "mail-pane"],
	];

	return (
		<ShowScene
			id="contact"
			title="contact/"
			subtitle="say hi · dm · dead drop"
			sequence={sequence}
			height={280}
		>
			<SceneIcon id="links-icon" x={9} y={42} label="bookmarks" icon="book" />
			<SceneIcon id="mail-icon"  x={9} y={70} label="mail.app" icon="letter" />

			<Pane id="links-pane" x={40} y={44} width={360} title="bookmarks/">
				{links.map((link, i) => (
					<a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
						style={{
							display: 'flex', justifyContent: 'space-between',
							padding: '5px 6px', borderBottom: i < links.length - 1 ? '1px dotted #ccc' : 'none',
							fontSize: 11, textDecoration: 'none', color: '#000',
						}}
						onMouseEnter={(e) => { e.currentTarget.style.background = '#3366cc'; e.currentTarget.style.color = '#fff'; }}
						onMouseLeave={(e) => { e.currentTarget.style.background = ''; e.currentTarget.style.color = '#000'; }}
					>
						<span style={{ fontWeight: 'bold' }}>{link.label}</span>
						<span style={{ fontSize: 10, opacity: 0.7 }}>{link.hint}</span>
					</a>
				))}
			</Pane>

			<Pane id="mail-pane" x={66} y={60} width={560} title="Send Message">
				{submitted ? (
					<div style={{ textAlign: 'center', padding: '24px 0' }}>
						<p style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>✓ Message sent!</p>
						<p style={{ fontSize: 11, color: '#666', marginBottom: 16 }}>I'll get back to you soon.</p>
						<button onClick={() => setSubmitted(false)} className="btn">Send Another</button>
					</div>
				) : (
					<form ref={form} onSubmit={hermesSendMail}>
						<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
							<div>
								<label className="os-label">Name:</label>
								<input type="text" name="user_name" value={formData.user_name}
									onChange={upd} required placeholder="Your name" className="os-input" />
							</div>
							<div>
								<label className="os-label">Email:</label>
								<input type="email" name="user_email" value={formData.user_email}
									onChange={upd} required placeholder="you@example.com" className="os-input" />
							</div>
						</div>
						<div style={{ marginBottom: 10 }}>
							<label className="os-label">Message:</label>
							<textarea name="message" value={formData.message} onChange={upd}
								required rows={5} placeholder="What's on your mind?" className="os-textarea" />
						</div>
						<div style={{ textAlign: 'right' }}>
							<button type="submit" className="btn btn-primary">Send</button>
						</div>
					</form>
				)}
			</Pane>
		</ShowScene>
	);
};

export default ContactForm;
