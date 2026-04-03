import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import Window from "./Window";

const BlogPost = () => {
	const posts = [{
		id: 1, title: "first blog post (idk what to put here)", date: "2025-02-15",
		tags: ["philosophy", "personal"],
		content: `redacted, but obviously this isn't hard to find again :P`,
		readTime: "5 min read",
		imageUrl: "https://i.pinimg.com/originals/2f/01/ea/2f01eadfd0be42b8102c19b4d39052f6.gif",
	}];

	const { id } = useParams();
	const post = posts.find(p => p.id === parseInt(id));

	if (!post) return (
		<div className="flex items-center justify-center min-h-screen p-4">
			<Window title="Error" style={{ width: 300 }}>
				<p style={{ textAlign: 'center', marginBottom: 8 }}>Post not found.</p>
				<div style={{ textAlign: 'center' }}><Link to="/" className="btn">OK</Link></div>
			</Window>
		</div>
	);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
			className="px-4 md:px-8 pt-8 pb-8"
			style={{ minHeight: '100vh' }}
		>
			<div className="max-w-3xl mx-auto">
				<Window title={`SimpleText — ${post.title}`}>
					<div style={{ marginBottom: 8 }}>
						<Link to="/" style={{ fontSize: 11 }}>← Back to Home</Link>
					</div>

					{post.imageUrl && (
						<img src={post.imageUrl} alt={post.title}
							className="w-full border border-black mb-3" />
					)}

					<p style={{ fontSize: 10, color: '#666', marginBottom: 6 }}>
						{post.tags.join(' / ')} — {new Date(post.date).toLocaleDateString()} — {post.readTime}
					</p>

					<p style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}>{post.title}</p>

					<div className="os-hr" />

					{post.content.split('\n\n').map((p, i) => (
						<p key={i} style={{ marginBottom: 8 }}>{p}</p>
					))}
				</Window>
			</div>
		</motion.div>
	);
};

export default BlogPost;
