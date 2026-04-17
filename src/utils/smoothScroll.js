import { ScrollTrigger } from "gsap/ScrollTrigger";

// jump to a section without animating scrollY — animating would drag the
// page through every pinned ShowScene in between, fast-forwarding their
// scrub timelines and looking awful. instant jump skips those scenes
// and asks ScrollTrigger to resolve state at the destination.
export const smoothScrollTo = (targetId, offset = -80) => {
	const target = document.getElementById(targetId);
	if (!target) return;

	const targetY = target.getBoundingClientRect().top + window.pageYOffset + offset;
	window.scrollTo({ top: targetY, left: 0, behavior: "auto" });

	// flush scrub positions to the new scrollY so the destination scene
	// renders its final state immediately instead of easing into it
	requestAnimationFrame(() => ScrollTrigger.update());
};
