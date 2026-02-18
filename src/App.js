import React from "react";
import { createHashRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import { Dither } from "./components/bits";

// dither config - visible but not overwhelming
const ditherConfig = {
	waveSpeed: 0.02,
	waveFrequency: 1.5,
	waveAmplitude: 0.22,
	waveColor: [0.3, 0.15, 0.04],
	colorNum: 4,
	pixelSize: 3,
	enableMouseInteraction: true,
	mouseRadius: 0.25,
};

const App = () => {
	const router = createHashRouter(
		createRoutesFromElements(
			<>
				<Route path="/" element={
					<div className="min-h-screen relative">
						{/* fixed dither background for entire site */}
						<div className="fixed inset-0 z-0">
							<Dither {...ditherConfig} />
						</div>
						<div className="relative z-10">
							<Navbar />
							<main>
								<Home />
								<About />
								<Blog />
								<ContactForm />
							</main>
							<Footer />
						</div>
					</div>
				} />
				<Route path="/blog/:id" element={
					<div className="min-h-screen relative">
						<div className="fixed inset-0 z-0">
							<Dither {...ditherConfig} />
						</div>
						<div className="relative z-10">
							<Navbar />
							<main>
								<BlogPost />
							</main>
							<Footer />
						</div>
					</div>
				} />
				<Route path="*" element={
					<div className="min-h-screen relative">
						<div className="fixed inset-0 z-0">
							<Dither {...ditherConfig} />
						</div>
						<div className="relative z-10">
							<Navbar />
							<main>
								<NotFound />
							</main>
							<Footer />
						</div>
					</div>
				} />
			</>
		)
	);

	return <RouterProvider router={router} />;
};

export default App;
