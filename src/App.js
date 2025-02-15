import React from "react";
import { createHashRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

const App = () => {
	const router = createHashRouter(
		createRoutesFromElements(
			<>
				<Route path="/" element={
					<div>
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
					<div>
						<Navbar />
						<main>
							<BlogPost />
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
