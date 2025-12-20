import { useState, useEffect } from 'react';

// typewriter effect for that hacker movie vibe
export const useTypingEffect = (
	texts,
	typeSpeed = 150,
	deleteSpeed = 100,
	pauseTime = 2000
) => {
	const [currentText, setCurrentText] = useState('');
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const speed = isDeleting ? deleteSpeed : typeSpeed;
		const current = texts[currentIndex];

		const timeout = setTimeout(() => {
			if (!isDeleting && currentText === current) {
				setTimeout(() => setIsDeleting(true), pauseTime);
			} else if (isDeleting && currentText === '') {
				setIsDeleting(false);
				setCurrentIndex(prev => (prev + 1) % texts.length);
			} else {
				setCurrentText(prev =>
					isDeleting
						? prev.slice(0, -1)
						: current.slice(0, prev.length + 1)
				);
			}
		}, speed);

		return () => clearTimeout(timeout);
	}, [currentText, currentIndex, isDeleting, texts, typeSpeed, deleteSpeed, pauseTime]);

	return currentText;
};

export default useTypingEffect;
