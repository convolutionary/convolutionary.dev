import React, { useEffect, useLayoutEffect, useState } from "react";
import Home, { PATTERNS } from "./Home";
import BootSequence from "./BootSequence";
import { Dither } from "./bits";

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

const PAT_KEY = "aurora:pattern";
const loadPat = () => {
	try {
		const v = localStorage.getItem(PAT_KEY);
		return PATTERNS.some((p) => p.id === v) ? v : "macos";
	} catch { return "macos"; }
};

// boot once per page load — coming back to the desktop shouldn't replay it
let booted = false;

// the retro mode. all the classic-mac global styles hang off html.os,
// so the manual never sees them
const DesktopMode = () => {
	const [booting, setBooting] = useState(!booted);
	const [session, setSession] = useState(0); // bump = fresh desktop after restart
	const [pattern, setPat] = useState(loadPat);

	useLayoutEffect(() => {
		const root = document.documentElement;
		root.classList.add("os");
		window.scrollTo(0, 0);
		return () => root.classList.remove("os");
	}, []);

	useEffect(() => {
		document.title = "Aurora · Desktop";
		return () => { document.title = "Aurora · convolutionary.dev"; };
	}, []);

	const setPattern = (v) => {
		setPat(v);
		try { localStorage.setItem(PAT_KEY, v); } catch {}
	};

	const done = () => {
		booted = true;
		setBooting(false);
		setSession((n) => n + 1);
	};

	return (
		<>
			<div className={`desktop pat-${pattern}`}>
				{pattern === "dither" && !booting && (
					<div className="desk-bg" aria-hidden="true">
						<Dither {...ditherConfig} />
					</div>
				)}
				{!booting && (
					<Home
						key={session}
						onRestart={() => setBooting(true)}
						pattern={pattern}
						setPattern={setPattern}
					/>
				)}
			</div>
			{booting && <BootSequence onDone={done} />}
		</>
	);
};

export default DesktopMode;
