import React from 'react';
import useTerminalCursor from '../../hooks/useTerminalCursor';

// blinking cursor component
// uses the hook so you don't have to
const TerminalCursor = ({
	char = '|',
	className = '',
	blinkRate = 530
}) => {
	const visible = useTerminalCursor(blinkRate);

	return (
		<span
			className={`
				text-terminal-cursor
				transition-opacity duration-100
				${visible ? 'opacity-100' : 'opacity-0'}
				${className}
			`}
		>
			{char}
		</span>
	);
};

export default TerminalCursor;
