import React from 'react';

// the classic aurora@portfolio:~/path$ command pattern
// no more copy-pasting this everywhere
const TerminalPrompt = ({
	user = 'aurora',
	host = 'portfolio',
	path = '~',
	command,
	className = ''
}) => (
	<div className={`text-terminal-secondary font-mono ${className}`}>
		<span className="text-terminal-muted">{user}@{host}</span>
		<span className="text-white">:</span>
		<span className="text-cyan-400">{path}</span>
		<span className="text-white">$ </span>
		{command && <span className="text-terminal-primary">{command}</span>}
	</div>
);

export default TerminalPrompt;
