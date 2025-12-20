import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineFieldTime } from "react-icons/ai";
import { blogContent } from "../data/content";
import { TerminalPrompt, TerminalCard, SectionDivider } from "./terminal";

const Blog = () => {
	const { header, featuredPost, upcomingPosts } = blogContent;

	return (
		<div className="bg-terminal-black font-mono text-terminal-primary scroll-mt-32" id="blog">
			<div className="container mx-auto px-4 py-8 max-w-6xl">
				<div className="terminal-window">
					<div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">

					{/* header */}
					<div className="text-center">
						<div className="text-terminal-secondary text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 font-mono glitch-hover" data-text={header.title}>
							{header.title}
						</div>
						<TerminalPrompt path="~/blog" command="cat welcome.txt" className="mb-4 justify-center" />
						<p className="text-terminal-muted text-lg leading-relaxed max-w-4xl mx-auto">
							{header.subtitle}
						</p>
					</div>

					{/* featured post */}
					<div>
						<TerminalPrompt path="~/blog" command="ls -la posts/featured/" className="mb-6" />

						<TerminalCard tag="[*]" title="FEATURED POST">
							<Link to={`/blog/${featuredPost.id}`} className="block group">
								<div className="space-y-4">
									{featuredPost.imageUrl && (
										<div className="relative overflow-hidden border border-terminal-dim rounded">
											<img
												src={featuredPost.imageUrl}
												alt={featuredPost.title}
												className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:opacity-80 transition-opacity duration-300"
											/>
											<div className="absolute bottom-2 left-2 flex flex-wrap gap-2">
												{featuredPost.tags.map((tag, i) => (
													<span
														key={i}
														className="text-xs bg-terminal-black/80 text-cyan-400 px-2 py-1 rounded font-mono border border-terminal-dim"
													>
														#{tag}
													</span>
												))}
											</div>
										</div>
									)}

									<div>
										<h4 className="text-terminal-secondary font-bold text-xl mb-3 group-hover:text-cyan-400 transition-colors">
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
													<span className="text-cyan-400">●</span>
													<span>{featuredPost.date}</span>
												</div>
											</div>
											<span className="text-terminal-primary group-hover:text-cyan-400 transition-colors">
												read more →
											</span>
										</div>
									</div>
								</div>
							</Link>
						</TerminalCard>
					</div>

					{/* upcoming posts */}
					<div>
						<TerminalPrompt path="~/blog" command="ls posts/ --sort=date" className="mb-6" />

						<div className="space-y-4">
							{upcomingPosts.map((post, i) => (
								<div key={i} className="border border-terminal-dim p-4 rounded bg-terminal-darker hover:border-terminal-muted/50 transition-colors">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<span className="text-cyan-400">→</span>
											<span className="text-terminal-secondary">{post.file}</span>
										</div>
										<span className="text-terminal-muted text-sm">{post.status}</span>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* section divider */}
					<SectionDivider fromPath="~/blog" toSection="contact" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Blog;
