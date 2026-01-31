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

const App = () => {
	const router = createHashRouter(
		createRoutesFromElements(
			<>
				<Route path="/" element={
					<div className="bg-bento-bg min-h-screen">
						<Navbar />
						<main>
							<Home />
							<About />
							<Blog />
							<ContactForm />
						</main>
						<Footer />
					</div>
				} />
				<Route path="/blog/:id" element={
					<div className="bg-bento-bg min-h-screen">
						<Navbar />
						<main>
							<BlogPost />
						</main>
						<Footer />
					</div>
				} />
				<Route path="*" element={
					<div className="bg-bento-bg min-h-screen">
						<Navbar />
						<main>
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
