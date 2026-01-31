import React from "react";
import { useParams, Link } from "react-router-dom";
import { AiOutlineCalendar, AiOutlineTag, AiOutlineArrowLeft, AiOutlineFieldTime } from "react-icons/ai";
import { BentoCard } from "./bento";

const BlogPost = () => {
	const posts = [
		{
			id: 1,
			title: "first blog post (idk what to put here)",
			date: "2025-02-15",
			tags: ["philosophy", "personal"],
			content: `redacted, but obviously this isn't hard to find again :P`,
			readTime: "5 min read",
			imageUrl: "https://i.pinimg.com/originals/2f/01/ea/2f01eadfd0be42b8102c19b4d39052f6.gif",
		}
	];

	const { id } = useParams();
	const post = posts.find(p => p.id === parseInt(id));

	const athenaProcessMarkdown = (text) => {
		text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-ink-primary">$1</strong>');
		text = text.replace(/__(.*?)__/g, '<strong class="font-semibold text-ink-primary">$1</strong>');
		text = text.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
		text = text.replace(/_(.*?)_/g, '<em class="italic">$1</em>');
		text = text.replace(/`(.*?)`/g, '<code class="bg-bento-surface-alt text-ink-secondary px-2 py-1 rounded text-sm font-mono">$1</code>');
		text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-clay font-medium underline hover:text-clay-soft transition-colors" target="_blank" rel="noopener noreferrer">$1</a>');
		return text;
	};

	if (!post) {
		return (
			<div className="min-h-screen pt-32 pb-16 bg-bento-bg">
				<div className="container mx-auto px-6 max-w-2xl">
					<BentoCard className="text-center py-12">
						<div className="w-16 h-16 bg-bento-surface-alt rounded-full flex items-center justify-center mx-auto mb-6">
							<svg className="w-8 h-8 text-ink-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
						</div>
						<h1 className="text-2xl font-semibold text-ink-primary mb-4">Post not found</h1>
						<p className="text-ink-muted mb-8">The post you're looking for doesn't exist or may have been removed.</p>
						<Link
							to="/"
							className="bento-btn inline-flex items-center gap-2"
						>
							<AiOutlineArrowLeft />
							Back home
						</Link>
					</BentoCard>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen pt-24 pb-16 bg-bento-bg">
			<div className="container mx-auto px-6 max-w-4xl">
				{/* back link */}
				<Link
					to="/"
					className="inline-flex items-center gap-2 text-ink-muted hover:text-clay transition-colors mb-8"
				>
					<AiOutlineArrowLeft />
					Back home
				</Link>

				{/* hero image */}
				<div className="relative h-64 md:h-96 rounded-bento-lg overflow-hidden mb-8 border border-line">
					<img
						src={post.imageUrl}
						alt={post.title}
						className="w-full h-full object-cover"
					/>
				</div>

				{/* header */}
				<div className="mb-12">
					<div className="flex flex-wrap gap-2 mb-4">
						{post.tags.map((tag) => (
							<span
								key={tag}
								className="inline-flex items-center gap-1 text-sm bg-clay-bg text-clay px-3 py-1 rounded-full"
							>
								<AiOutlineTag size={12} />
								{tag}
							</span>
						))}
					</div>

					<h1 className="text-3xl md:text-4xl font-semibold text-ink-primary mb-6 leading-tight">
						{post.title}
					</h1>

					<div className="flex items-center gap-6 text-ink-muted pb-6 border-b border-line">
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

				{/* content */}
				<article className="prose prose-lg max-w-none">
					{post.content.split('\n\n').map((paragraph, index) => {
						if (!paragraph.trim()) return null;

						if (paragraph.startsWith('```')) {
							const [, , ...codeLines] = paragraph.split('\n');
							const code = codeLines.slice(0, -1).join('\n');
							return (
								<pre key={index} className="bg-bento-surface-alt p-6 rounded-bento overflow-x-auto mb-6 border border-line">
									<code className="text-sm text-ink-secondary font-mono">
										{code}
									</code>
								</pre>
							);
						}

						if (paragraph.startsWith('# ')) {
							return (
								<h2 key={index} className="text-2xl font-semibold text-ink-primary mt-10 mb-4">
									{paragraph.replace('# ', '')}
								</h2>
							);
						}

						if (paragraph.startsWith('## ')) {
							return (
								<h3 key={index} className="text-xl font-semibold text-ink-primary mt-8 mb-3">
									{paragraph.replace('## ', '')}
								</h3>
							);
						}

						if (paragraph.startsWith('### ')) {
							return (
								<h4 key={index} className="text-lg font-semibold text-ink-primary mt-6 mb-2">
									{paragraph.replace('### ', '')}
								</h4>
							);
						}

						if (paragraph.startsWith('> ')) {
							return (
								<blockquote key={index} className="border-l-4 border-clay pl-6 my-6 italic text-ink-muted bg-bento-surface-alt py-4 rounded-r-bento">
									<div dangerouslySetInnerHTML={{
										__html: athenaProcessMarkdown(paragraph.replace('> ', ''))
									}} />
								</blockquote>
							);
						}

						if (paragraph.includes('- **')) {
							const items = paragraph.split('\n').filter(item => item.trim().startsWith('- '));
							return (
								<ul key={index} className="list-disc list-inside text-ink-secondary mb-6 space-y-2">
									{items.map((item, i) => (
										<li key={i} className="leading-relaxed">
											<span dangerouslySetInnerHTML={{
												__html: athenaProcessMarkdown(item.replace('- ', ''))
											}} />
										</li>
									))}
								</ul>
							);
						}

						return (
							<p key={index} className="text-ink-secondary mb-6 leading-relaxed text-lg">
								<span dangerouslySetInnerHTML={{
									__html: athenaProcessMarkdown(paragraph)
								}} />
							</p>
						);
					})}
				</article>

				{/* footer */}
				<div className="mt-16 pt-8 border-t border-line">
					<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
						<p className="text-ink-muted text-sm">
							Published on {new Date(post.date).toLocaleDateString()}
						</p>
						<Link to="/" className="bento-btn-outline">
							Back to all posts
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogPost;
