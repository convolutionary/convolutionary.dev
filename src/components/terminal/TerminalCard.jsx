import React from 'react';
import TerminalPrompt from './TerminalPrompt';

// glassmorphism card with optional header and prompt
// the building block for all our sections
const TerminalCard = ({
	tag,
	title,
	prompt,
	children,
	className = '',
	hover = true,
	glow = false
}) => (
	<div className={`
		terminal-card
		border border-terminal-dim/50
		p-4 sm:p-6
		rounded-lg
		bg-terminal-darker/80
		backdrop-blur-sm
		relative
		overflow-hidden
		${hover ? 'hover:border-terminal-muted/70 hover:shadow-terminal-glow transition-all duration-300' : ''}
		${glow ? 'shadow-terminal-glow' : ''}
		${className}
	`}>
		{/* subtle scan line effect on hover */}
		<div className="absolute inset-0 opacity-0 hover:opacity-100 pointer-events-none transition-opacity duration-500">
			<div className="scan-line" />
		</div>

		{prompt && (
			<TerminalPrompt {...prompt} className="mb-4 text-sm" />
		)}

		{(tag || title) && (
			<h3 className="text-terminal-primary font-bold text-lg sm:text-xl mb-4 flex items-center gap-3">
				{tag && <span className="text-cyan-400 font-mono">{tag}</span>}
				<span className="glitch-hover" data-text={title}>{title}</span>
			</h3>
		)}

		<div className="relative z-10">
			{children}
		</div>
	</div>
);

export default TerminalCard;
