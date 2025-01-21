import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Socials from "./Socials";

const ContactForm = () => {
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm("service_k578uaf", "template_nyxk2ot", form.current, {
				publicKey: "gdht2zNte7kkHEw_x",
			})
			.then(
				() => {
					console.log("SUCCESS!");
				},
				(error) => {
					console.log("FAILED...", error.text);
				}
			);
	};

	return (
		<div className="min-h-full relative" name="contact">
			{/* Background gradient */}
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
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactForm;
