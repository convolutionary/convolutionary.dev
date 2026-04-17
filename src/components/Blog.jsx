import React from "react";
import { Link } from "react-router-dom";
import { blogContent } from "../data/content";
import ShowScene, { SceneIcon, Pane } from "./show/ShowScene";

const Blog = () => {
	const { featuredPost } = blogContent;
	const sequence = [
		["featured-icon", "featured-pane"],
		["drafts-icon", "drafts-pane"],
	];

	return (
		<ShowScene
			id="blog"
			title="writing/"
			subtitle="thoughts · notes · scraps"
			sequence={sequence}
			height={260}
		>
			<SceneIcon id="featured-icon" x={9} y={40} label="featured.rtf" icon="document" />
			<SceneIcon id="drafts-icon"   x={9} y={66} label="drafts"        icon="papers" />

			<Pane id="featured-pane" x={45} y={48} width={640} title="SimpleText — featured">
				<Link to={`/blog/${featuredPost.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
					<div className="media-row">
						{featuredPost.imageUrl && (
							<div className="media-row-fig">
								<img src={featuredPost.imageUrl} alt={featuredPost.title}
									className="w-full border border-black" style={{ display: 'block' }} />
							</div>
						)}
						<div className="media-row-body">
							<p style={{ fontSize: 10, color: '#666', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
								{featuredPost.tags.join(' / ')} — {featuredPost.date} — {featuredPost.readTime}
							</p>
							<p style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, lineHeight: 1.2 }}>
								{featuredPost.title}
							</p>
							<p style={{ fontSize: 12, color: '#333', marginBottom: 10, lineHeight: 1.5 }}>
								{featuredPost.content.substring(0, 240)}...
							</p>
							<span style={{ color: '#3366cc', fontSize: 11, textDecoration: 'underline' }}>Read more →</span>
						</div>
					</div>
				</Link>
			</Pane>

			<Pane id="drafts-pane" x={72} y={72} width={360} title="drafts/">
				<p style={{ fontSize: 11, color: '#666', marginBottom: 8 }}>in the pipeline:</p>
				{blogContent.upcomingPosts.map((p, i) => (
					<div key={i} style={{
						display: 'flex', justifyContent: 'space-between',
						padding: '4px 4px', borderBottom: '1px dotted #ccc', fontSize: 11,
					}}>
						<span style={{ fontFamily: 'monospace' }}>{p.file}</span>
						<span style={{ color: '#999', fontStyle: 'italic' }}>{p.status}</span>
					</div>
				))}
			</Pane>
		</ShowScene>
	);
};

export default Blog;
