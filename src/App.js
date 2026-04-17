import React, { useEffect, useRef, useState } from "react";
import { createHashRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import BlogPost from "./components/BlogPost";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import BootSequence from "./components/BootSequence";
import { Dither } from "./components/bits";

gsap.registerPlugin(ScrollTrigger);

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
	return (
		<div ref={ref} className="fixed inset-0 z-0">
			<Dither {...ditherConfig} />
		</div>
	);
};

const Layout = ({ children }) => {
	const showAtlas = useBootDone();
	return (
		<div className="min-h-screen relative">
			{showAtlas && <Atlas />}
			<div className="desktop">
				<Navbar />
				<main>{children}</main>
				<Footer />
			</div>
		</div>
	);
};

const router = createHashRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Layout><Home /></Layout>} />
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
