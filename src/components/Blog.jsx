import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineFieldTime, AiOutlineEye } from "react-icons/ai";

const Blog = () => {
	const [showCursor, setShowCursor] = useState(true);

	// Cursor blink effect
	useEffect(() => {
		const interval = setInterval(() => {
			setShowCursor(prev => !prev);
		}, 530);
		return () => clearInterval(interval);
	}, []);

	const featuredPost = {
		id: 1,
		title: "first blog post (idk what to put here)",
		date: "2025-02-15",
		tags: ["philosophy", "personal"],
		content: `redacted, but obviously this isn't hard to find again :P`,
		readTime: "5 min read",
		imageUrl: "https://i.pinimg.com/originals/2f/01/ea/2f01eadfd0be42b8102c19b4d39052f6.gif",
	};

	return (
		<div className="bg-terminal-black font-mono text-terminal-primary scroll-mt-32" id="blog">
			<div className="container mx-auto px-4 py-8 max-w-6xl">
				{}
				<div className="bg-terminal-black border-l border-r border-terminal-muted p-8 space-y-8">

					{}
					<div className="text-center">
						<div className="text-terminal-secondary text-4xl sm:text-5xl md:text-6xl font-bold mb-6 font-mono">
							LATEST THOUGHTS
						</div>
						<div className="text-terminal-secondary mb-4">
							<span className="text-terminal-muted">aurora@portfolio</span><span className="text-white">:</span><span className="text-blue-400">~/blog</span><span className="text-white">$ </span>cat welcome.txt
						</div>
						<p className="text-terminal-muted text-lg leading-relaxed max-w-4xl mx-auto">
							boom boom tung tung
						</p>
					</div>

					{}
					<div>
						<div className="text-terminal-secondary mb-6">
							<span className="text-terminal-muted">aurora@portfolio</span><span className="text-white">:</span><span className="text-blue-400">~/blog</span><span className="text-white">$ </span>ls -la posts/featured/
						</div>

						<div className="border border-terminal-dim p-6 rounded">
							<h3 className="text-terminal-primary font-bold text-xl mb-6 flex items-center gap-3">
								<span className="text-terminal-primary">[*]</span>
								FEATURED POST
							</h3>

							<Link to={`/blog/${featuredPost.id}`} className="block group">
								<div className="space-y-4">
									{}
									{featuredPost.imageUrl && (
										<div className="relative overflow-hidden border border-terminal-dim rounded">
											<img
												src={featuredPost.imageUrl}
												alt={featuredPost.title}
												className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:opacity-80 transition-opacity duration-300"
											/>
											<div className="absolute bottom-2 left-2 flex flex-wrap gap-2">
												{featuredPost.tags.map((tag, index) => (
													<span
														key={index}
														className="text-xs bg-terminal-black/80 text-terminal-primary px-2 py-1 rounded font-mono border border-terminal-dim"
													>
														#{tag}
													</span>
												))}
											</div>
										</div>
									)}

									{}
									<div>
										<h4 className="text-terminal-secondary font-bold text-xl mb-3 group-hover:text-terminal-primary transition-colors">
											{featuredPost.title}
										</h4>
										<p className="text-terminal-muted leading-relaxed mb-4">
											{featuredPost.content.substring(0, 150)}...
										</p>

										<div className="flex items-center justify-between text-sm">
											<div className="flex items-center gap-4 text-terminal-dim">
												<div className="flex items-center gap-2">
													<AiOutlineFieldTime className="w-4 h-4" />
													<span>{featuredPost.readTime}</span>
												</div>
												<div className="flex items-center gap-2">
													<span className="text-terminal-primary">●</span>
													<span>{featuredPost.date}</span>
												</div>
											</div>
											<span className="text-terminal-primary group-hover:text-terminal-secondary transition-colors">
												read more →
											</span>
										</div>
									</div>
								</div>
							</Link>
						</div>
					</div>

					{}
					<div>
						<div className="text-terminal-secondary mb-6">
							<span className="text-terminal-muted">aurora@portfolio</span><span className="text-white">:</span><span className="text-blue-400">~/blog</span><span className="text-white">$ </span>ls posts/ --sort=date
						</div>

						<div className="space-y-4">
							<div className="border border-terminal-dim p-4 rounded bg-terminal-darker">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<span className="text-terminal-primary">→</span>
										<span className="text-terminal-secondary">coming-soon.md</span>
									</div>
									<span className="text-terminal-muted text-sm">pending...</span>
								</div>
							</div>
							<div className="border border-terminal-dim p-4 rounded bg-terminal-darker">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<span className="text-terminal-primary">→</span>
										<span className="text-terminal-secondary">more-thoughts.md</span>
									</div>
									<span className="text-terminal-muted text-sm">coming soon...</span>
								</div>
							</div>
						</div>
					</div>

					{}
					<div className="relative">
						<div className="absolute inset-0 flex items-center" aria-hidden="true">
							<div className="w-full border-t border-terminal-muted"></div>
						</div>
						<div className="relative flex justify-center">
							<div className="bg-terminal-black px-4 py-2">
								<div className="text-terminal-secondary text-sm mb-1">
									<span className="text-terminal-muted">aurora@portfolio</span><span className="text-white">:</span><span className="text-blue-400">~/blog</span><span className="text-white">$ </span>cd ../contact
								</div>
								<div className="text-terminal-dim text-xs text-center">
									Entering directory 'contact'...
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
};

export default Blog;