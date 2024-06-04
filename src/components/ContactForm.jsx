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
		<div className="min-h-full bg-[#202021]" name="contact">
			<div className="max-w-[1024px] mx-auto p-8 h-full">
				<div className="flex flex-col gap-y-8">
					<h1 className="text-4xl text-[#7f08f7] font-bold"># Contact</h1>
					<h3 className="text-2xl text-[#7f08f7] font-bold">
						## Send a message
					</h3>
					<div className="lg:grid lg:grid-cols-2 lg:gap-x-8 text-white">
						<div className="hidden lg:block">
							<Socials />
						</div>
						<form
							ref={form}
							onSubmit={sendEmail}
							className="flex flex-col gap-4"
						>
							<div className="flex flex-col md:grid md:grid-cols-2 gap-3 form-in">
								<div className="flex flex-col gap-y-2">
									<label>Name</label>
									<input
										type="text"
										name="user_name"
										required
										placeholder="Me"
									/>
								</div>
								<div className="flex flex-col gap-y-2">
									<label>Email</label>
									<input
										type="email"
										name="user_email"
										required
										placeholder="To contact you back"
									/>
								</div>
							</div>
							<div className="flex flex-col gap-y-2">
								<label>Message</label>
								<textarea
									name="message"
									required
									placeholder="I wanted to ask you about..."
								></textarea>
							</div>
							<input
								type="submit"
								value="Send"
								className="rounded-lg border-2 border-[#7f08f7] p-3 hover:bg-[#8008f746] transition-all cursor-pointer"
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactForm;
