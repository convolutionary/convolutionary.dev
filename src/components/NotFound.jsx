import React from "react";
import { Link } from "react-router-dom";
import { BentoCard } from "./bento";

const NotFound = () => (
	<div className="min-h-screen flex items-center justify-center bg-bento-bg px-6 pt-20">
		<BentoCard className="max-w-md w-full text-center py-12">
			<div className="text-6xl md:text-7xl font-semibold text-ink-primary mb-4">
				404
			</div>
			<h1 className="text-2xl font-semibold text-ink-primary mb-2">
				Page Not Found
			</h1>
			<p className="text-ink-muted mb-8">
				Sorry, the page you're looking for doesn't exist or has been moved.
			</p>
			<Link
				to="/"
				className="bento-btn inline-block"
			>
				Back to Home
			</Link>
		</BentoCard>
	</div>
);

export default NotFound;
