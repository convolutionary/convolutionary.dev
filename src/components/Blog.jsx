import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCalendar, AiOutlineTag } from "react-icons/ai";

const Blog = () => {
	const navigate = useNavigate();
	const [posts] = useState([
		{
			id: 1,
			title: "first blog post (idk what to put here)",
			date: "2025-02-15",
			tags: ["philosophy", "personal"],
			preview: "What my experience has been like these past few weeks",
			readTime: "depends on you",
			imageUrl: "https://i.pinimg.com/originals/2f/01/ea/2f01eadfd0be42b8102c19b4d39052f6.gif",
		}
	]);

	return (
		<div className="w-full pt-4 pb-[24px]" id="blog">
			<div className="max-w-[1024px] mx-auto px-8">
				<div className="glass-card">
					<div className="sparkle-wrapper" />
					{/* Title section */}
					<div className="flex items-center gap-2 mb-6">
						<span className="text-[#7f08f7] text-2xl animate-pulse-slow">#</span>
						<h1 className="text-2xl">
							<span className="bg-gradient-to-r from-[#7f08f7] to-[#b366ff] bg-clip-text text-transparent">
								Blog Posts
							</span>
						</h1>
					</div>

					{/* Blog posts grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{posts.map((post) => (
							<article 
								key={post.id}
								onClick={() => navigate(`/blog/${post.id}`)}
								className="group bg-[#16161e] border-2 border-[#1f1f2e] rounded-lg overflow-hidden hover:border-[#7f08f7]/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
							>
								{/* Image */}
								<div className="relative h-48 overflow-hidden">
									<div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#16161e]/50" />
									<img 
										src={post.imageUrl}
										alt={post.title}
										className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
									/>
								</div>

								{/* Content */}
								<div className="p-4">
									<div className="flex items-center gap-2 text-xs text-white/50 mb-2">
										<AiOutlineCalendar className="text-[#7f08f7]" />
										<span>{new Date(post.date).toLocaleDateString()}</span>
										<span className="ml-auto">{post.readTime}</span>
									</div>

									<h3 className="text-lg font-medium text-white/90 mb-2 line-clamp-2 group-hover:text-white transition-colors">
										{post.title}
									</h3>

									<p className="text-sm text-white/60 mb-4 line-clamp-2">
										{post.preview}
									</p>

									<div className="flex flex-wrap gap-2">
										{post.tags.map((tag) => (
											<span 
												key={tag}
												className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-[#1f1f2e] text-white/70 hover:text-white/90 transition-colors"
											>
												<AiOutlineTag className="text-[#7f08f7]" />
												{tag}
											</span>
										))}
									</div>
								</div>
							</article>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Blog; 