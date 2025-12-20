import { useState, useEffect } from 'react';

// blinking cursor for that authentic terminal feel
export const useTerminalCursor = (blinkRate = 530) => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			setVisible(prev => !prev);
		}, blinkRate);

		return () => clearInterval(interval);
	}, [blinkRate]);

	return visible;
};

export default useTerminalCursor;
