// all the hardcoded content lives here now
// easier to update, easier to maintain

export const heroContent = {
	roles: [
		'software developer',
		'problem solver',
		'open source contributor',
		'digital creator'
	],
	bio: {
		short: 'Self-taught developer passionate about creating elegant solutions and contributing to open-source projects.',
		medium: 'I thrive on learning new technologies and solving complex problems.',
	},
	stats: [
		{ label: 'Years Experience', value: '7+' },
		{ label: 'Technologies', value: '15+' },
		{ label: 'Coffee Cups', value: '∞' },
		{ label: 'Learning Mode', value: '24/7' }
	],
	projects: [
		{
			tag: 'Web',
			title: 'Web Applications',
			subtitle: 'Modern, responsive solutions',
			description: 'Building scalable web applications with modern frameworks and clean architecture.'
		},
		{
			tag: 'OSS',
			title: 'Open Source',
			subtitle: 'Contributing to the community',
			description: 'Actively contributing to open-source projects and sharing knowledge with the developer community.'
		}
	]
};

export const aboutContent = {
	intro: "I'm a passionate developer who loves building things and solving complex problems. My journey started in 2017, and I've been exploring the ever-evolving world of technology ever since.",
	story: [
		"I'm just someone who's genuinely enthusiastic about learning new things and developing creative solutions. I've been programming since 2017, constantly expanding my knowledge and skills over the past 5+ years.",
		"The journey has been filled with curiosity, experimentation, and a fair share of schizo vibes. I believe in clean code, elegant solutions, and the power of open-source collaboration."
	],
	skills: [
		{ title: 'Full-Stack Development', desc: 'Building modern web applications with clean architecture' },
		{ title: 'Problem Solving', desc: 'Tackling complex challenges with creative solutions' },
		{ title: 'Continuous Learning', desc: 'Always exploring new technologies and methodologies' }
	]
};

export const blogContent = {
	header: {
		title: 'Latest Thoughts',
		subtitle: 'Writing about code, life, and everything in between.'
	},
	featuredPost: {
		id: 1,
		title: "first blog post (idk what to put here)",
		date: "2025-02-15",
		tags: ["philosophy", "personal"],
		content: "redacted, but obviously this isn't hard to find again :P",
		readTime: "5 min read",
		imageUrl: "https://i.pinimg.com/originals/2f/01/ea/2f01eadfd0be42b8102c19b4d39052f6.gif"
	},
	upcomingPosts: [
		{ file: 'coming-soon.md', status: 'pending...' },
		{ file: 'more-thoughts.md', status: 'coming soon...' }
	]
};

export const contactContent = {
	header: {
		title: "Let's Work Together",
		subtitle: "Have a project in mind? Let's discuss how we can bring your ideas to life."
	},
	info: [
		{ title: 'Email', desc: 'Best way to reach me' },
		{ title: 'Response Time', desc: 'Usually within 24 hours' },
		{ title: 'Collaboration', desc: 'Open to new opportunities' }
	]
};

export const footerContent = {
	brand: {
		name: 'aurora',
		desc: 'Self-taught developer passionate about creating elegant solutions and contributing to open-source projects.'
	},
	status: [
		{ color: 'text-green-500', text: 'all systems operational' },
		{ color: 'text-clay', text: 'open to opportunities' },
		{ color: 'text-ink-primary', text: 'building the future' }
	]
};
