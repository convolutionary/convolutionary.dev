import { useState } from "react";

// web3forms access key — public by design; spam is filtered by their
// honeypot (botcheck field) + our rate limit + domain restriction set
// on web3forms.com
const WEB3FORMS_KEY = "5f42e464-8296-475b-8331-8786d860fb15";
const COOLDOWN_MS = 60_000;
const COOLDOWN_KEY = "aurora:lastMail";
export const MAX_LEN = 2000;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const blank = { name: "", email: "", message: "", website: "" };

const lastSent = () => {
	try { return Number(localStorage.getItem(COOLDOWN_KEY) || 0); } catch { return 0; }
};

export const useMailForm = () => {
	const [form, setForm] = useState(blank);
	const [sent, setSent] = useState(false);
	const [sending, setSending] = useState(false);
	const [err, setErr] = useState("");

	const upd = (e) => setForm({ ...form, [e.target.name]: e.target.value });

	const send = async (e) => {
		e.preventDefault();
		setErr("");

		// honeypot: real users can't see this field; bots fill every input
		if (form.website) return;

		const name = form.name.trim();
		const email = form.email.trim();
		const msg = form.message.trim();
		if (name.length < 2) return setErr("Your name needs at least two characters.");
		if (!emailRe.test(email)) return setErr("That email address doesn't look right. Check for typos.");
		if (msg.length < 10) return setErr("The message is too short. Say a little more.");
		if (msg.length > MAX_LEN) return setErr(`The message is over ${MAX_LEN} characters. Trim it down.`);

		// rate limit — 60s between submissions per browser
		const since = Date.now() - lastSent();
		if (since < COOLDOWN_MS) {
			const wait = Math.ceil((COOLDOWN_MS - since) / 1000);
			return setErr(`You just sent one. Try again in ${wait}s.`);
		}

		setSending(true);
		try {
			const res = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				headers: { "Content-Type": "application/json", Accept: "application/json" },
				body: JSON.stringify({
					access_key: WEB3FORMS_KEY,
					subject: `convolutionary.dev: message from ${name}`,
					from_name: "convolutionary.dev contact",
					name,
					email,
					message: msg,
					// web3forms' own botcheck — bots fill it, their API drops the req
					botcheck: form.website,
				}),
			});
			const data = await res.json();
			if (!data.success) throw new Error(data.message || "send failed");
			try { localStorage.setItem(COOLDOWN_KEY, String(Date.now())); } catch {}
			setSent(true);
			setForm(blank);
		} catch {
			setErr("The message didn't go through. Try again, or email me directly.");
		} finally {
			setSending(false);
		}
	};

	return { form, upd, send, sent, setSent, sending, err };
};
