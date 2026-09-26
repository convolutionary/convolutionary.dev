import React from "react";
import { Link } from "react-router-dom";
import "../manual/manual.css";

const NotFound = () => (
	<div className="man">
		<header className="run">
			<Link to="/" className="run-mark">Aurora</Link>
		</header>
		<section className="ch" aria-labelledby="nf-h">
			<div className="ch-margin">
				<span className="ch-num" aria-hidden="true">?</span>
			</div>
			<div className="ch-body">
				<h1 className="ch-title" id="nf-h">This page isn't in the guide</h1>
				<p>The address points somewhere that doesn't exist. It may have moved when the site was reorganized.</p>
				<p><Link to="/">Back to the contents</Link></p>
			</div>
		</section>
	</div>
);

export default NotFound;
