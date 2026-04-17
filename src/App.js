import React, { useEffect, useRef, useState } from "react";
import { createHashRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import ScrollBar from "./components/ScrollBar";
import BootSequence from "./components/BootSequence";
import { Dither } from "./components/bits";
import { setActiveSection } from "./hooks/useActiveSection";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const ditherConfig = {
	waveSpeed: 0.008,
	waveFrequency: 0.6,
	waveAmplitude: 0.1,
	waveColor: [0.15, 0.2, 0.3],
	colorNum: 4,
	pixelSize: 3,
	enableMouseInteraction: false,
	mouseRadius: 0.2,
};

let bootDone = false;
const bootSubs = new Set();
const setBootDone = () => {
	bootDone = true;
	bootSubs.forEach((fn) => fn(true));
};
const useBootDone = () => {
	const [v, set] = useState(bootDone);
	useEffect(() => { bootSubs.add(set); return () => bootSubs.delete(set); }, []);
	return v;
};

const Atlas = () => {
	const ref = useRef(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const ctx = gsap.context(() => {
			gsap.to(el, {
				y: -60,
				ease: "none",
				scrollTrigger: {
					trigger: document.body,
					start: "top top",
					end: "bottom bottom",
					scrub: 0.4,
				},
			});
		}, el);
		return () => ctx.revert();
	}, []);

	return (
		<div ref={ref} className="fixed inset-0 z-0" style={{ willChange: "transform" }}>
			<Dither {...ditherConfig} />
		</div>
	);
};

const Layout = ({ children, withSections = false }) => {
	const showAtlas = useBootDone();
	useEffect(() => {
		if (!withSections) return;
		const ids = ["home", "about", "blog", "contact"];
		const triggers = ids.map((id) =>
			ScrollTrigger.create({
				trigger: `#${id}`,
				start: "top 40%",
				end: "bottom 40%",
				onToggle: (self) => { if (self.isActive) setActiveSection(id); },
			})
		);
		// sort + refresh once all child ShowScenes have registered their pins.
		// without this, pin-spacers stack up in creation order instead of DOM
		// order, causing adjacent scenes to pin simultaneously.
		const sortTimer = setTimeout(() => {
			ScrollTrigger.sort();
			ScrollTrigger.refresh();
		}, 0);
		return () => {
			clearTimeout(sortTimer);
			triggers.forEach((t) => t.kill());
		};
	}, [withSections]);

	return (
		<div className="min-h-screen relative">
			{showAtlas && <Atlas />}
			<div className="desktop">
				<Navbar />
				<ScrollBar />
				<main>{children}</main>
				<Footer />
			</div>
		</div>
	);
};

const router = createHashRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={
				<Layout withSections>
					<Home />
					<About />
					<Blog />
					<ContactForm />
				</Layout>
			} />
			<Route path="/blog/:id" element={<Layout><BlogPost /></Layout>} />
			<Route path="*" element={<Layout><NotFound /></Layout>} />
		</>
	)
);

const App = () => {
	const [booting, setBooting] = useState(!bootDone);

	useEffect(() => {
		if ("scrollRestoration" in window.history) {
			window.history.scrollRestoration = "manual";
		}
		window.scrollTo(0, 0);
	}, []);

	const finishBoot = () => {
		setBootDone();
		setBooting(false);
		window.scrollTo(0, 0);
	};

	return (
		<>
			<RouterProvider router={router} />
			{booting && <BootSequence onDone={finishBoot} />}
		</>
	);
};

export default App;
