import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCalendar, AiOutlineTag, AiOutlineFieldTime, AiOutlineArrowRight } from "react-icons/ai";

const Blog = () => {
	const navigate = useNavigate();
	const [posts] = useState([
		{
			id: 1,
			title: "first blog post (idk what to put here)",
			date: "2025-02-15",
			tags: ["philosophy", "personal"],
			preview: "A collection of thoughts and reflections on the journey of self-discovery and the complexity of human existence in the digital age.",
			readTime: "5 min read",
			imageUrl: "https://i.pinimg.com/originals/2f/01/ea/2f01eadfd0be42b8102c19b4d39052f6.gif",
			featured: true
		}
	]);

	const featuredPost = posts.find(post => post.featured);
	const otherPosts = posts.filter(post => !post.featured);

	return (
		<div className="section" id="blog">
			<div className="container mx-auto px-4">
				<div className="space-y-16">
					{/* Blog Header */}
					<div className="text-center">
						<span className="text-sm font-mono text-gray-400 bg-gray-800 px-3 py-1 rounded-full mb-4 inline-block">
							Blog
						</span>
						<h2 className="text-4xl font-bold text-white mb-6">
							Thoughts & Reflections
						</h2>
						<p className="text-lg text-gray-300 max-w-2xl mx-auto">
							Occasional musings on technology, philosophy, and the journey of continuous learning
						</p>
					</div>

					{/* Featured Post */}
					{featuredPost && (
						<div className="max-w-4xl mx-auto">
							<div className="text-center mb-8">
								<span className="text-sm font-mono text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
									Featured Post
								</span>
							</div>
							<article 
								onClick={() => navigate(`/blog/${featuredPost.id}`)}
								className="card card-elevated overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-xl bg-gray-900"
							>
								<div className="md:flex">
									<div className="md:w-1/2">
										<div className="relative h-64 md:h-full overflow-hidden">
											<img 
												src={featuredPost.imageUrl}
												alt={featuredPost.title}
												className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
										</div>
									</div>
									<div className="md:w-1/2 p-8">
										<div className="flex flex-wrap gap-2 mb-4">
											{featuredPost.tags.map((tag) => (
												<span 
													key={tag}
													className="blog-tag"
												>
													<AiOutlineTag size={12} />
													{tag}
												</span>
											))}
										</div>
										
										<h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gray-300 transition-colors">
											{featuredPost.title}
										</h3>
										
										<p className="text-gray-300 mb-6 leading-relaxed">
											{featuredPost.preview}
										</p>
										
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-4 text-sm text-gray-500">
												<div className="flex items-center gap-1">
													<AiOutlineCalendar />
													<span>{new Date(featuredPost.date).toLocaleDateString()}</span>
												</div>
												<div className="flex items-center gap-1">
													<AiOutlineFieldTime />
													<span>{featuredPost.readTime}</span>
												</div>
											</div>
											<div className="flex items-center gap-2 text-white font-medium group-hover:gap-3 transition-all">
												<span>Read more</span>
												<AiOutlineArrowRight />
											</div>
										</div>
									</div>
								</div>
							</article>
						</div>
					)}

					{/* Other Posts */}
					{otherPosts.length > 0 && (
						<div>
							<div className="text-center mb-12">
								<h3 className="text-2xl font-bold text-white mb-4">All Posts</h3>
								<p className="text-gray-300">More thoughts and insights</p>
							</div>
							
							<div className="blog-grid">
								{otherPosts.map((post) => (
									<article 
										key={post.id}
										onClick={() => navigate(`/blog/${post.id}`)}
										className="blog-card bg-gray-900 border-gray-800"
									>
										<img 
											src={post.imageUrl}
											alt={post.title}
											className="blog-card-image"
										/>
										<div className="blog-card-content">
											<div className="flex flex-wrap gap-2 mb-3">
												{post.tags.map((tag) => (
													<span 
														key={tag}
														className="blog-tag"
													>
														<AiOutlineTag size={12} />
														{tag}
													</span>
												))}
											</div>
											
											<h3 className="blog-card-title text-white">
												{post.title}
											</h3>
											
											<p className="blog-card-excerpt text-gray-300">
												{post.preview}
											</p>
											
											<div className="blog-card-meta text-gray-400">
												<div className="flex items-center gap-1">
													<AiOutlineCalendar />
													<span>{new Date(post.date).toLocaleDateString()}</span>
												</div>
												<div className="flex items-center gap-1">
													<AiOutlineFieldTime />
													<span>{post.readTime}</span>
												</div>
											</div>
										</div>
									</article>
								))}
							</div>
						</div>
					)}

					{/* No Posts State */}
					{posts.length === 0 && (
						<div className="text-center py-16">
							<div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
								<svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
								</svg>
							</div>
							<h3 className="text-xl font-semibold text-white mb-2">No posts yet</h3>
							<p className="text-gray-400">Check back later for new content!</p>
						</div>
					)}

				</div>
			</div>
		</div>
	);
};

export default Blog; 
