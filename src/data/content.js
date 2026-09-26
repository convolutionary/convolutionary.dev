// single source of truth for facts — both the manual and the desktop read from here

export const SINCE = 2017;
export const yearsIn = () => new Date().getFullYear() - SINCE;

export const bio = [
	"I'm Aurora, a self-taught developer. I started programming in 2017 and haven't found a good reason to stop.",
	"Most of my work sits between the backend and the browser: services in Go, Rust and TypeScript, web apps in React and Next.js, and more browser automation than I'd like to admit. I care about readable code, and about open source that's pleasant to contribute to.",
];

export const tagline = `Software developer. Self-taught, writing code since ${SINCE}.`;

export const links = [
	{ id: "github", label: "GitHub", handle: "convolutionary", url: "https://github.com/convolutionary" },
	{ id: "codeberg", label: "Codeberg", handle: "Dyslexic", url: "https://codeberg.org/Dyslexic" },
	{ id: "x", label: "X", handle: "Nocixa", url: "https://x.com/Nocixa" },
	{ id: "email", label: "Email", handle: "cerfnet@anche.no", url: "mailto:cerfnet@anche.no" },
];

// grouped for the spec sheet. names match images.js so the desktop can reuse them
export const stack = [
	{ label: "Languages", items: ["Go", "Rust", "TypeScript", "JavaScript", "Python", "Java", "Bash"] },
	{ label: "Front end", items: ["React", "Next.js", "Angular", "Tailwind", "HTML", "CSS"] },
	{ label: "Back end", items: ["Node.js", "Bun", "Express", "NestJS", "Spring Boot", "GraphQL", "Apollo", "Prisma", "Hibernate", "Socket.IO"] },
	{ label: "Desktop & bots", items: ["Electron", "Discord.js"] },
	{ label: "Automation", items: ["Puppeteer", "Selenium"] },
];
