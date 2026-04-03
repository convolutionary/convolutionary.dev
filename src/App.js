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

// dither as desktop texture — subtle, like a tiled pattern
const ditherConfig = {
	waveSpeed: 0.008,
	waveFrequency: 0.6,
	waveAmplitude: 0.1,
	waveColor: [0.15, 0.2, 0.3],  // desaturated blue to match os8 desktop
	colorNum: 4,
	pixelSize: 2,
	enableMouseInteraction: true,
	mouseRadius: 0.2,
};

const Layout = ({ children }) => (
	<div className="min-h-screen relative">
		<div className="fixed inset-0 z-0">
			<Dither {...ditherConfig} />
		</div>
		<div className="desktop">
			<Navbar />
			<main>{children}</main>
			<Footer />
		</div>
	</div>
);

const App = () => {
	const router = createHashRouter(
		createRoutesFromElements(
			<>
				<Route path="/" element={
					<Layout>
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

	return <RouterProvider router={router} />;
};

export default App;
