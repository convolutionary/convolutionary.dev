import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineFieldTime } from "react-icons/ai";
import { blogContent } from "../data/content";
import { BentoCard, BentoGrid } from "./bento";

const Blog = () => {
	const { header, featuredPost, upcomingPosts } = blogContent;

	return (
		<section className="bg-bento-bg py-16 scroll-mt-20" id="blog">
			<div className="container mx-auto px-6 max-w-6xl">
				{/* header */}
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-semibold text-ink-primary mb-4">
						{header.title}
					</h2>
					<p className="text-ink-muted text-lg max-w-2xl mx-auto">
						{header.subtitle}
					</p>
				</div>

				<BentoGrid cols={2}>
					{/* featured post - large */}
					<BentoCard span="feature" className="p-0 overflow-hidden">
						<Link to={`/blog/${featuredPost.id}`} className="block group h-full">
							{featuredPost.imageUrl && (
								<div className="relative h-48 sm:h-56 overflow-hidden">
									<img
										src={featuredPost.imageUrl}
										alt={featuredPost.title}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									/>
									<div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
										{featuredPost.tags.map((tag, i) => (
											<span
												key={i}
												className="text-xs bg-bento-surface/90 text-clay px-2 py-1 rounded-full font-medium"
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							)}
							<div className="p-6">
								<span className="text-clay text-sm font-medium">Featured</span>
								<h3 className="text-xl font-semibold text-ink-primary mt-2 mb-3 group-hover:text-clay transition-colors">
									{featuredPost.title}
								</h3>
								<p className="text-ink-muted leading-relaxed mb-4">
									{featuredPost.content.substring(0, 120)}...
								</p>
								<div className="flex items-center justify-between text-sm">
									<div className="flex items-center gap-4 text-ink-subtle">
										<div className="flex items-center gap-1">
											<AiOutlineFieldTime className="w-4 h-4" />
											<span>{featuredPost.readTime}</span>
										</div>
										<span>{featuredPost.date}</span>
									</div>
									<span className="text-clay font-medium group-hover:translate-x-1 transition-transform">
										Read more →
									</span>
								</div>
							</div>
						</Link>
					</BentoCard>

					{/* upcoming posts */}
					{upcomingPosts.map((post, i) => (
						<BentoCard key={i}>
							<span className="text-ink-subtle text-sm">{post.status}</span>
							<p className="text-ink-secondary font-medium mt-2">{post.file}</p>
						</BentoCard>
					))}
				</BentoGrid>
			</div>
		</section>
	);
};

export default Blog;
