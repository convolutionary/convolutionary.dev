import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { AiOutlineFieldTime } from "react-icons/ai";
import { blogContent } from "../data/content";

const Blog = () => {
	const { header, featuredPost, upcomingPosts } = blogContent;

	return (
		<section className="py-32" id="blog">
			<div className="container mx-auto px-6 max-w-6xl">

				{/* header */}
				<div className="mb-20">
					<motion.span
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className="text-clay font-mono text-sm"
					>
						{"// thoughts"}
					</motion.span>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-5xl md:text-6xl font-bold text-ink-primary tracking-tight mt-2"
					>
						{header.title}<span className="text-clay">.</span>
					</motion.h2>
					<motion.p
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="text-ink-muted text-lg mt-4 max-w-lg"
					>
						{header.subtitle}
					</motion.p>
				</div>

				{/* featured post */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-8"
				>
					<Link to={`/blog/${featuredPost.id}`} className="block group">
						<div className="bg-bento-bg/95 border border-line backdrop-blur-sm overflow-hidden hover:border-line-hover transition-colors">
							<div className="grid grid-cols-1 lg:grid-cols-2">
								{/* image */}
								{featuredPost.imageUrl && (
									<div className="relative h-64 lg:h-80 overflow-hidden">
										<img
											src={featuredPost.imageUrl}
											alt={featuredPost.title}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-bento-bg via-transparent to-transparent" />

										{/* tags */}
										<div className="absolute top-4 left-4 flex flex-wrap gap-2">
											{featuredPost.tags.map((tag, i) => (
												<span key={i} className="px-3 py-1 bg-bento-bg/90 border border-line text-xs font-mono text-ink-muted">
													{tag}
												</span>
											))}
										</div>

										{/* featured badge */}
										<div className="absolute top-4 right-4">
											<span className="flex items-center gap-2 px-3 py-1 bg-bento-bg/90 border border-line text-xs font-mono">
												<span className="w-1.5 h-1.5 bg-clay animate-pulse" />
												<span className="text-clay">FEATURED</span>
											</span>
										</div>
									</div>
								)}

								{/* content */}
								<div className="p-8 flex flex-col justify-center">
									<h3 className="text-2xl lg:text-3xl font-bold text-ink-primary mb-4 group-hover:text-clay transition-colors">
										{featuredPost.title}
									</h3>

									<p className="text-ink-muted leading-relaxed mb-6 line-clamp-3">
										{featuredPost.content.substring(0, 180)}...
									</p>

									<div className="flex items-center justify-between mt-auto pt-6 border-t border-line">
										<div className="flex items-center gap-4 text-sm text-ink-subtle font-mono">
											<span className="flex items-center gap-2">
												<AiOutlineFieldTime className="w-4 h-4" />
												{featuredPost.readTime}
											</span>
											<span>{featuredPost.date}</span>
										</div>
										<span className="text-clay font-mono text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
											read →
										</span>
									</div>
								</div>
							</div>
						</div>
					</Link>
				</motion.div>

				{/* upcoming posts */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{upcomingPosts.map((post, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1 }}
						>
							<div className="bg-bento-bg/95 border border-line p-6 backdrop-blur-sm opacity-60 hover:opacity-100 transition-opacity">
								<div className="flex items-center gap-3 mb-3">
									<div className="w-2 h-2 bg-clay/50 animate-pulse" />
									<span className="text-clay text-xs font-mono">{post.status}</span>
								</div>
								<p className="text-ink-secondary font-medium">{post.file}</p>
							</div>
						</motion.div>
					))}

					{/* placeholder */}
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.3 }}
						className="hidden lg:flex border border-dashed border-line items-center justify-center p-6"
					>
						<span className="text-ink-subtle text-sm font-mono">more to come...</span>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Blog;
