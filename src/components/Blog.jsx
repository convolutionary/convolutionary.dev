import React from "react";
import { Link } from "react-router-dom";
import { blogContent } from "../data/content";
import Window from "./Window";

const Blog = () => {
	const { featuredPost } = blogContent;

	return (
		<section id="blog" className="px-4 md:px-8 pt-4">
			<div className="max-w-5xl mx-auto">
				<Window title="SimpleText — Blog">
					<Link to={`/blog/${featuredPost.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
						<div className="flex flex-col sm:flex-row gap-4">
							{featuredPost.imageUrl && (
								<div className="sm:w-48 shrink-0">
									<img src={featuredPost.imageUrl} alt={featuredPost.title}
										className="w-full border border-black" />
								</div>
							)}
							<div>
								<p style={{ fontSize: 10, color: '#666', marginBottom: 4 }}>
									{featuredPost.tags.join(' / ')} — {featuredPost.date} — {featuredPost.readTime}
								</p>
								<p style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 6 }}>
									{featuredPost.title}
								</p>
								<p style={{ fontSize: 12, color: '#333', marginBottom: 8 }}>
									{featuredPost.content.substring(0, 180)}...
								</p>
								<span style={{ color: '#3366cc', fontSize: 11, textDecoration: 'underline' }}>
									Read more →
								</span>
							</div>
						</div>
					</Link>
				</Window>
			</div>
		</section>
	);
};

export default Blog;
