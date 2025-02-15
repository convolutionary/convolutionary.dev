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
				Well, I'm not sure what to put here.
                Welcome to my first blog post, I really don't know why I even made this post. I was told by a friend that doing this would be good for my own self-conceptions and might serve to help others.
                So here I am.

                So you must be wondering, what is this guy waffling about by himself alone in a blog post?
                Well, I'm not sure either.

                Recently, I've been navigating through a myriad of circumstances, and truthfully, it has been quite illuminating regarding my own disposition and the current zeitgeist of our world.
                This blog post essentially embodies the amalgamation of my scattered contemplations at this point in time.
                I've observed that this existence can be remarkably caustic, relentless and merciless towards those who lack the capacity to withstand its demands.

                Sometimes when I think back to the past, I can't help but yearn for the solitude/peace, and most of all, the simplicity of how it once was.
                I met someone really special, and well. It has been a rollercoaster of emotions to say the least. I don't even know where to begin. Some things are just hard to explain, 
                I don't know why I'm even worth it for this person. The self-destructive thoughts are just like a flood so powerful, it has the force of the niagara falls.

                I'm not sure what to do, I'm not sure what to say. I'm just glad that they've never given up on me. But why does the mind try to make me feel like I'll eventually get left behind?
                Like eventually I'll be thrown away, cast aside like yesterday's trash? It's sometimes a brutal battle. My mind has some crazy thoughts and it's like I'm dodging bullets from a machine gun.

                Love can be a painful thing sometimes, it's beautiful but it's also painful. Things in life are never as simple as they seem. We all want the simple and easy way out, to be loved without any 
                strings attached. But that's not how life works, is it? I'm not a stupid guy, I know that sometimes it's not easy to deal with uncertainty. My mind has the tendency to overreact and overthink.

                I'm not being a pussy, but sometimes I have feelings that undermine my own confidence, and well. Just noticing subtle nuances and personality changes just makes my mind spin into overdrive.
                The life of a random coder is crazy, isn't it?

                If you read all this far, and you're thinking 'what's the moral of this story?', well. I don't know.
                Everyone should understand that sometimes, there exists only certain things that we can control. Attempting to control those certain other things, just causes you misery, pain and problems.
                So why not let it happen?
                All I can do is create contingency plans for my heart and mind, and if you ever find yourself in a similar situation, I emplore you to never assume anything.

                **P.S. This isn't supposed to be a post about anybody in particular, this is just a collection of my thought processes, and none of this should be taken seriously. Seriously. It's just a blog post.**

                \`\`\`And if that one person is reading this thinking it's about them, it's not. Don't worry, I love you so much but these feelings aren't due to you. <3\`\`\`
                `,
			readTime: "whatever you want",
			imageUrl: "https://i.pinimg.com/originals/2f/01/ea/2f01eadfd0be42b8102c19b4d39052f6.gif",
		},
        {
            id: 2,
            title: "second blog post",
            date: "2025-02-15",
            tags: ["coding", "personal"],
            content: `
                just had to put another rant here. things really feel like shit when you think you're on your own, striving for some sort of eternal companionship.
                some people like to say that it's 'cringe' to want that sort of thing. I don't think it's like that at all, as humans we are social creatures. We strive
                to find people that we can connect with, share our experiences with. We want to be loved, to be cared for, to be understood. 
                i just had to start typing another post because i just feel like im going to be left behind anyway, and maybe i've almost made my peace with that.
                maybe that's just how it's supposed to happen, i've fought as much as i could, but i can't stop the tidal waves. i'll just sit back and expect what 
                is to come. whatever happens, i'll try to take it in my stride. hopefully there's some reason why i'm here, and i've been given this type of intuition and intelligence.

                have fun while you can lads, happiness can be fleeting sometimes, i wish i happiness wasn't so fleeting for me.
            `,
            readTime: "whatever you want",
            imageUrl: "https://i.pinimg.com/originals/eb/50/87/eb50875a68b04b0480fa929af2c7547c.gif",
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
					
					{/* Back button */}
					<Link 
						to="/blog" 
						className="inline-flex items-center gap-2 text-[#7f08f7] hover:text-[#b366ff] transition-colors mb-6"
					>
						<AiOutlineArrowLeft />
						Back to blog
					</Link>

					{/* Hero image */}
					<div className="relative h-[300px] -mx-6 -mt-6 mb-8">
						<div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#16161e]" />
						<img 
							src={post.imageUrl}
							alt={post.title}
							className="w-full h-full object-cover"
						/>
					</div>

					{/* Post header */}
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

					{/* Tags */}
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

					{/* Content */}
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