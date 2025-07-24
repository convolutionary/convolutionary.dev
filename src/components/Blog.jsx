import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineFieldTime, AiOutlineEye } from "react-icons/ai";

const Blog = () => {
	const featuredPost = 		{
		id: 1,
		title: "first blog post (idk what to put here)",
		date: "2025-02-15",
		tags: ["philosophy", "personal"],
		content: `
redacted, but obviously this isn't hard to find again :P
			`,
		readTime: "5 min read",
		imageUrl: "https://i.pinimg.com/originals/2f/01/ea/2f01eadfd0be42b8102c19b4d39052f6.gif",
	};

	return (
		<div className="section" id="blog">
			<div className="container mx-auto px-4 sm:px-6">
				<div className="space-y-12 sm:space-y-16">
					{/* Blog Header */}
					<div className="text-center">
						<span className="text-xs sm:text-sm font-mono text-gray-400 bg-gray-800 px-2 sm:px-3 py-1 rounded-full mb-4 inline-block">
							Blog
						</span>
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
							Latest thoughts
						</h2>
						<p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
							boom boom tung tung
						</p>
					</div>

					{/* Featured Blogs */}
					<div className="card p-4 sm:p-6 md:p-8 bg-gray-900 mx-4 sm:mx-0">
						<div className="text-center mb-4 sm:mb-6">
							<h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">Featured Blogs</h3>
							<p className="text-sm sm:text-base md:text-lg text-gray-300">random new shit</p>
						</div>
						
						<Link to={`/blog/${featuredPost.id}`} className="block group">
							<div className="relative overflow-hidden rounded-lg mb-4 sm:mb-6">
								{featuredPost.imageUrl && (
									<img 
										src={featuredPost.imageUrl} 
										alt={featuredPost.title}
										className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
									/>
								)}
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
								<div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
									<div className="flex flex-wrap gap-1 sm:gap-2">
										{featuredPost.tags.map((tag, index) => (
											<span 
												key={index} 
												className="text-xs sm:text-sm bg-white/20 text-white px-2 py-1 rounded backdrop-blur-sm"
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							</div>
							
							<div>
								<h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 group-hover:text-gray-300 transition-colors">
									{featuredPost.title}
								</h4>
								<p className="text-sm sm:text-base md:text-lg text-gray-300 mb-3 sm:mb-4 leading-relaxed">
									{featuredPost.excerpt}
								</p>
								
								<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
									<div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
										<div className="flex items-center gap-1 sm:gap-2">
											<AiOutlineFieldTime className="w-3 h-3 sm:w-4 sm:h-4" />
											<span>{featuredPost.readTime}</span>
										</div>
										<div className="flex items-center gap-1 sm:gap-2">
											<AiOutlineEye className="w-3 h-3 sm:w-4 sm:h-4" />
											<span>{featuredPost.views}</span>
										</div>
									</div>
									<span className="text-xs sm:text-sm text-white font-medium group-hover:text-gray-300 transition-colors self-start sm:self-auto">
										Read more →
									</span>
								</div>
							</div>
						</Link>
					</div>

				</div>
			</div>
		</div>
	);
};

export default Blog; 
