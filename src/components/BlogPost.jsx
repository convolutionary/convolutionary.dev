import React from "react";
import { useParams, Link } from "react-router-dom";
import { AiOutlineCalendar, AiOutlineTag, AiOutlineArrowLeft } from "react-icons/ai";

const BlogPost = () => {
	const posts = [
		{
			id: 1,
			title: "first blog post (idk what to put here)",
			date: "2025-02-15",
			tags: ["coding", "personal"],
			content: `
redacted, but obviously this isn't hard to find again :P
                `,
			readTime: "whatever you want",
			imageUrl: "https://i.pinimg.com/originals/2f/01/ea/2f01eadfd0be42b8102c19b4d39052f6.gif",
		}
	];

	const { id } = useParams();
	const post = posts.find(p => p.id === parseInt(id));

	const processInlineMarkdown = (text) => {
		text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
		text = text.replace(/__(.*?)__/g, '<strong>$1</strong>');

		text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
		text = text.replace(/_(.*?)_/g, '<em>$1</em>');

		text = text.replace(/\`(.*?)\`/g, '<code class="bg-[#1f1f2e] px-1 py-0.5 rounded text-sm">$1</code>');
		
		text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[#7f08f7] hover:text-[#b366ff] transition-colors" target="_blank" rel="noopener noreferrer">$1</a>');

		return text;
	};

	if (!post) {
		return (
			<div className="w-full pt-4 pb-[24px]">
				<div className="max-w-[1024px] mx-auto px-8">
					<div className="glass-card">
						<h1 className="text-2xl text-white/90 mb-4">Post not found :/</h1>
						<Link 
							to="/blog" 
							className="inline-flex items-center gap-2 text-[#7f08f7] hover:text-[#b366ff] transition-colors"
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
		<div className="w-full pt-4 pb-[24px]">
			<div className="max-w-[1024px] mx-auto px-8">
				<div className="glass-card">
					<div className="sparkle-wrapper" />
					
					<Link 
						to="/blog" 
						className="inline-flex items-center gap-2 text-[#7f08f7] hover:text-[#b366ff] transition-colors mb-6"
					>
						<AiOutlineArrowLeft />
						Back to blog
					</Link>

					<div className="relative h-[300px] -mx-6 -mt-6 mb-8">
						<div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#16161e]" />
						<img 
							src={post.imageUrl}
							alt={post.title}
							className="w-full h-full object-cover"
						/>
					</div>

					<div className="mb-8">
						<h1 className="text-3xl font-medium text-white mb-4">
							{post.title}
						</h1>
						<div className="flex items-center gap-4 text-sm text-white/60">
							<div className="flex items-center gap-2">
								<AiOutlineCalendar className="text-[#7f08f7]" />
								<span>{new Date(post.date).toLocaleDateString()}</span>
							</div>
							<span>•</span>
							<span>{post.readTime}</span>
						</div>
					</div>

					<div className="flex flex-wrap gap-2 mb-8">
						{post.tags.map((tag) => (
							<span 
								key={tag}
								className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-[#1f1f2e] text-white/70 hover:text-white/90 transition-colors"
							>
								<AiOutlineTag className="text-[#7f08f7]" />
								{tag}
							</span>
						))}
					</div>

					<div className="prose prose-invert prose-purple max-w-none">
						{post.content.split('\n\n').map((paragraph, index) => {
							if (paragraph.startsWith('```')) {
								const [, language, ...codeLines] = paragraph.split('\n');
								const code = codeLines.slice(0, -1).join('\n');
								return (
									<pre key={index} className="bg-[#1f1f2e] p-4 rounded-lg overflow-x-auto mb-4">
										<code className="text-sm text-white/90">
											{code}
										</code>
									</pre>
								);
							}

							if (paragraph.startsWith('## ')) {
								return (
									<h2 key={index} className="text-xl font-medium text-white/90 mt-8 mb-4">
										{paragraph.replace('## ', '')}
									</h2>
								);
							}

							if (paragraph.startsWith('> ')) {
								return (
									<blockquote key={index} className="border-l-4 border-[#7f08f7] pl-4 my-4 italic text-white/70">
										<div dangerouslySetInnerHTML={{ 
											__html: processInlineMarkdown(paragraph.replace('> ', ''))
										}} />
									</blockquote>
								);
							}

							if (paragraph.startsWith('- ')) {
								return (
									<ul key={index} className="list-disc list-inside text-white/70 mb-4">
										{paragraph.split('\n').map((item, i) => (
											<li key={i} className="mb-2">
												<div dangerouslySetInnerHTML={{ 
													__html: processInlineMarkdown(item.replace('- ', ''))
												}} />
											</li>
										))}
									</ul>
								);
							}

							return (
								<p key={index} className="text-white/70 mb-4 leading-relaxed">
									<div dangerouslySetInnerHTML={{ 
										__html: processInlineMarkdown(paragraph)
									}} />
								</p>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogPost; 
