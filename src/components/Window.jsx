import React from "react";
import { motion } from "motion/react";

// classic mac os window — every section of the site is one of these
const Window = ({ title, children, className = "", style = {}, animate = true }) => {
	const Wrapper = animate ? motion.div : 'div';
	const wrapperProps = animate ? {
		initial: { opacity: 0, y: 12 },
		whileInView: { opacity: 1, y: 0 },
		viewport: { once: true },
		transition: { duration: 0.4, ease: "easeOut" },
	} : {};

	return (
		<Wrapper className={`win ${className}`} style={style} {...wrapperProps}>
			<div className="win-title">
				<div className="win-close">
					<div className="win-close-inner" />
				</div>
				<span>{title}</span>
			</div>
			<div className="win-body">
				{children}
			</div>
		</Wrapper>
	);
};

export default Window;
