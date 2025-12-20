// nav items and footer links live here
// keeps the components clean

export const navItems = ['home', 'about', 'blog', 'contact'];

export const footerLinks = {
	nav: [
		{ label: 'home.html', scroll: 'home' },
		{ label: 'about.md', scroll: 'about' },
		{ label: 'blog/', to: '/blog' },
		{ label: 'contact.php', scroll: 'contact' }
	],
	social: [
		{ label: 'github/convolutionary', href: 'https://github.com/convolutionary' },
		{ label: 'send-email.sh', href: 'mailto:hello@example.com' }
	],
	legal: [
		{ label: 'privacy.txt', path: '/privacy' },
		{ label: 'terms.txt', path: '/terms' }
	]
};
