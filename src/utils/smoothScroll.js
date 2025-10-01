
export const smoothScrollTo = (targetId, offset = -80) => {
  const target = document.getElementById(targetId);
  if (!target) return;

  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset + offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 800; 
  let start = null;

  const animation = (currentTime) => {
    if (!start) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);

    
    const ease = (t) => t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;

    window.scrollTo(0, startPosition + distance * ease(progress));

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};