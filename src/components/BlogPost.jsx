import React from "react";
import { useParams, Link } from "react-router-dom";
import { AiOutlineCalendar, AiOutlineTag, AiOutlineArrowLeft, AiOutlineFieldTime } from "react-icons/ai";

const BlogPost = () => {
	const posts = [
		{
			id: 1,
			title: "first blog post (idk what to put here)",
			date: "2025-02-15",
			tags: ["philosophy", "personal"],
			content: `
redacted, but obviously this isn't hard to find again :P
                `,
			readTime: "5 min read",
			imageUrl: "https://i.pinimg.com/originals/2f/01/ea/2f01eadfd0be42b8102c19b4d39052f6.gif",
		}
	];

	const { id } = useParams();
	const post = posts.find(p => p.id === parseInt(id));

	const processInlineMarkdown = (text) => {
		// Bold text
		text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>');
		text = text.replace(/__(.*?)__/g, '<strong class="font-semibold text-white">$1</strong>');

		// Italic text
		text = text.replace(/\*(.*?)\*/g, '<em class="italic text-gray-300">$1</em>');
		text = text.replace(/_(.*?)_/g, '<em class="italic text-gray-300">$1</em>');

		// Inline code
		text = text.replace(/`(.*?)`/g, '<code class="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm font-mono">$1</code>');
		
		// Links
		text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-white font-medium underline hover:text-gray-300 transition-colors" target="_blank" rel="noopener noreferrer">$1</a>');

		return text;
	};

	if (!post) {
		return (
			<div className="min-h-screen pt-32 pb-16">
				<div className="container mx-auto px-4">
					<div className="max-w-2xl mx-auto text-center">
						<div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
							<svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
						</div>
						<h1 className="text-2xl font-bold text-white mb-4">Post not found</h1>
						<p className="text-gray-400 mb-8">The post you're looking for doesn't exist or may have been removed.</p>
						<Link 
							to="/blog" 
							className="inline-flex items-center gap-2 btn btn-primary"
						>
							<AiOutlineArrowLeft />
							Back to blog
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen pt-28 pb-16">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto">
					{/* Back Button */}
					<Link 
						to="/blog" 
						className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
					>
						<AiOutlineArrowLeft />
						Back to blog
					</Link>

					{/* Hero Image */}
					<div className="relative h-96 rounded-lg overflow-hidden mb-8">
						<img 
							src={post.imageUrl}
							alt={post.title}
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
					</div>

					{/* Article Header */}
					<div className="mb-12">
						<div className="flex flex-wrap gap-2 mb-4">
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
						
						<h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
							{post.title}
						</h1>
						
						<div className="flex items-center gap-6 text-gray-300 pb-6 border-b border-gray-800">
							<div className="flex items-center gap-2">
								<AiOutlineCalendar />
								<span>{new Date(post.date).toLocaleDateString()}</span>
							</div>
							<div className="flex items-center gap-2">
								<AiOutlineFieldTime />
								<span>{post.readTime}</span>
							</div>
						</div>
					</div>

					{/* Article Content */}
					<article className="prose prose-lg max-w-none text-gray-200">
						{post.content.split('\n\n').map((paragraph, index) => {
							// Skip empty paragraphs
							if (!paragraph.trim()) return null;

							// Code blocks
							if (paragraph.startsWith('```')) {
								const [, , ...codeLines] = paragraph.split('\n');
								const code = codeLines.slice(0, -1).join('\n');
								return (
									<pre key={index} className="bg-gray-900 p-6 rounded-lg overflow-x-auto mb-6 border border-gray-800">
										<code className="text-sm text-gray-200 font-mono">
											{code}
										</code>
									</pre>
								);
							}

							// Headers
							if (paragraph.startsWith('# ')) {
								return (
									<h1 key={index} className="text-3xl font-bold text-white mt-12 mb-6 first:mt-0">
										{paragraph.replace('# ', '')}
									</h1>
								);
							}

							if (paragraph.startsWith('## ')) {
								return (
									<h2 key={index} className="text-2xl font-bold text-white mt-10 mb-4">
										{paragraph.replace('## ', '')}
									</h2>
								);
							}

							if (paragraph.startsWith('### ')) {
								return (
									<h3 key={index} className="text-xl font-semibold text-white mt-8 mb-3">
										{paragraph.replace('### ', '')}
									</h3>
								);
							}

							// Blockquotes
							if (paragraph.startsWith('> ')) {
								return (
									<blockquote key={index} className="border-l-4 border-white pl-6 my-6 italic text-gray-300 bg-gray-900 py-4">
										<div dangerouslySetInnerHTML={{ 
											__html: processInlineMarkdown(paragraph.replace('> ', ''))
										}} />
									</blockquote>
								);
							}

							// Unordered lists
							if (paragraph.includes('- **')) {
								const items = paragraph.split('\n').filter(item => item.trim().startsWith('- '));
								return (
									<ul key={index} className="list-disc list-inside text-gray-300 mb-6 space-y-2">
										{items.map((item, i) => (
											<li key={i} className="leading-relaxed">
												<div dangerouslySetInnerHTML={{ 
													__html: processInlineMarkdown(item.replace('- ', ''))
												}} />
											</li>
										))}
									</ul>
								);
							}

							// Regular paragraphs
							return (
								<p key={index} className="text-gray-300 mb-6 leading-relaxed text-lg">
									<span dangerouslySetInnerHTML={{ 
										__html: processInlineMarkdown(paragraph)
									}} />
								</p>
							);
						})}
					</article>

					{/* Article Footer */}
					<div className="mt-16 pt-8 border-t border-gray-800">
						<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
							<div className="text-center sm:text-left">
								<p className="text-gray-400 text-sm">
									Published on {new Date(post.date).toLocaleDateString()}
								</p>
							</div>
							<div className="flex gap-3">
								<button className="btn btn-secondary btn-sm">
									Share
								</button>
								<Link to="/blog" className="btn btn-primary btn-sm">
									More posts
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogPost; 
