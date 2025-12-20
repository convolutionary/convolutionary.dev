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
import ParticlesBackground from "./components/ParticlesBackground";
import "./styles/terminal.css";

const App = () => {
	const router = createHashRouter(
		createRoutesFromElements(
			<>
				<Route path="/" element={
					<div className="bg-black min-h-screen relative">
						<ParticlesBackground />
						<Navbar />
						<main className="bg-black">
							<Home />
							<About />
							<Blog />
							<ContactForm />
						</main>
						<Footer />
					</div>
				} />
				<Route path="/blog/:id" element={
					<div className="bg-black min-h-screen relative">
						<ParticlesBackground />
						<Navbar />
						<main className="bg-black">
							<BlogPost />
						</main>
						<Footer />
					</div>
				} />
				<Route path="*" element={
					<div className="bg-black min-h-screen relative">
						<ParticlesBackground />
						<Navbar />
						<main className="bg-black">
							<NotFound />
						</main>
						<Footer />
					</div>
				} />
			</>
		)
	);

	return <RouterProvider router={router} />;
};

export default App;
