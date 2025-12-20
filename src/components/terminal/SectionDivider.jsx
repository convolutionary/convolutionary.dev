import React from 'react';
import TerminalPrompt from './TerminalPrompt';

// the "cd ../next-section" transition between sections
// now with fancy circuit board vibes
const SectionDivider = ({
	fromPath,
	toSection,
	message
}) => {
	const displayMessage = message || `Entering directory '${toSection}'...`;

	return (
		<div className="relative py-8">
			{/* circuit board line effect */}
			<div className="absolute inset-0 flex items-center" aria-hidden="true">
				<div className="w-full h-px bg-gradient-to-r from-transparent via-terminal-muted/50 to-transparent" />
			</div>

			{/* the actual cd command */}
			<div className="relative flex justify-center">
				<div className="bg-terminal-black px-6 py-3 border border-terminal-dim/30 rounded-lg backdrop-blur-sm">
					<TerminalPrompt
						path={fromPath}
						command={`cd ../${toSection}`}
						className="text-sm mb-1"
					/>
					<div className="text-terminal-dim text-xs text-center font-mono">
						{displayMessage}
					</div>
				</div>
			</div>

			{/* decorative circuit nodes */}
			<div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-terminal-muted/30 hidden md:block" />
			<div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-terminal-muted/30 hidden md:block" />
		</div>
	);
};

export default SectionDivider;
