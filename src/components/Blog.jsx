import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineFieldTime } from "react-icons/ai";
import { blogContent } from "../data/content";

const Blog = () => {
	const { header, featuredPost, upcomingPosts } = blogContent;

	return (
		<section className="bg-bento-bg py-20 scroll-mt-20" id="blog">
			<div className="container mx-auto px-6 max-w-7xl">

				{/* header - same style as about */}
				<div className="mb-16">
					<p className="text-clay font-mono text-sm mb-2">// thoughts</p>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink-primary tracking-tight">
						{header.title}
					</h2>
					<p className="text-ink-muted text-lg mt-4 max-w-xl">
						{header.subtitle}
					</p>
				</div>

				{/* featured post - big hero style */}
				<Link
					to={`/blog/${featuredPost.id}`}
					className="block group mb-8"
				>
					<div className="grid lg:grid-cols-2 gap-6 bg-bento-surface rounded-2xl border border-line overflow-hidden hover:border-clay/30 transition-colors">
						{/* image */}
						{featuredPost.imageUrl && (
							<div className="relative h-64 lg:h-auto overflow-hidden">
								<img
									src={featuredPost.imageUrl}
									alt={featuredPost.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
								/>
								<div className="absolute top-4 left-4 flex gap-2">
									{featuredPost.tags.map((tag, i) => (
										<span key={i} className="text-xs bg-bento-bg/80 backdrop-blur text-clay px-3 py-1 rounded-full">
											{tag}
										</span>
									))}
								</div>
							</div>
						)}
						{/* content */}
						<div className="p-8 flex flex-col justify-center">
							<span className="text-clay text-sm font-mono mb-4">Featured</span>
							<h3 className="text-2xl lg:text-3xl font-bold text-ink-primary mb-4 group-hover:text-clay transition-colors">
								{featuredPost.title}
							</h3>
							<p className="text-ink-muted leading-relaxed mb-6">
								{featuredPost.content.substring(0, 150)}...
							</p>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-4 text-sm text-ink-subtle">
									<span className="flex items-center gap-1">
										<AiOutlineFieldTime className="w-4 h-4" />
										{featuredPost.readTime}
									</span>
									<span>{featuredPost.date}</span>
								</div>
								<span className="text-clay font-medium group-hover:translate-x-2 transition-transform">
									Read →
								</span>
							</div>
						</div>
					</div>
				</Link>

				{/* upcoming posts - simple list */}
				<div className="grid sm:grid-cols-2 gap-4">
					{upcomingPosts.map((post, i) => (
						<div
							key={i}
							className="bg-bento-surface rounded-xl border border-line p-5 opacity-60"
						>
							<span className="text-clay text-xs font-mono">{post.status}</span>
							<p className="text-ink-secondary font-medium mt-2">{post.file}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Blog;
