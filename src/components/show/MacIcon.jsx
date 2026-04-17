import React from "react";

const variants = {
	folder: (
		<g>
			<path d="M2 8 L14 8 L17 5 L28 5 L28 8 L38 8 L38 28 L2 28 Z" fill="#fff" stroke="#000" strokeWidth="1.2" />
			<path d="M2 11 L38 11" stroke="#000" strokeWidth="0.8" fill="none" />
		</g>
	),

	card: (
		<g>
			<rect x="3" y="6" width="34" height="22" fill="#fff" stroke="#000" strokeWidth="1.2" />
			<rect x="6" y="9" width="10" height="10" fill="#fff" stroke="#000" strokeWidth="0.8" />
			<circle cx="11" cy="13" r="2" fill="#000" />
			<path d="M7 18 Q11 15 15 18" fill="#000" />
			<rect x="19" y="10" width="15" height="1" fill="#000" />
			<rect x="19" y="13" width="13" height="1" fill="#000" />
			<rect x="19" y="16" width="14" height="1" fill="#000" />
			<rect x="6" y="22" width="28" height="1" fill="#000" />
			<rect x="6" y="25" width="18" height="1" fill="#000" />
		</g>
	),

	document: (
		<g>
			<path d="M7 3 L25 3 L31 9 L31 29 L7 29 Z" fill="#fff" stroke="#000" strokeWidth="1.2" />
			<path d="M25 3 L25 9 L31 9" fill="none" stroke="#000" strokeWidth="1" />
			<rect x="11" y="13" width="14" height="1" fill="#000" />
			<rect x="11" y="16" width="16" height="1" fill="#000" />
			<rect x="11" y="19" width="12" height="1" fill="#000" />
			<rect x="11" y="22" width="15" height="1" fill="#000" />
			<rect x="11" y="25" width="9" height="1" fill="#000" />
		</g>
	),

	calculator: (
		<g>
			<rect x="6" y="4" width="28" height="26" fill="#fff" stroke="#000" strokeWidth="1.2" />
			<rect x="9" y="7" width="22" height="5" fill="#000" />
			<rect x="26" y="9" width="3" height="2" fill="#fff" />
			<rect x="9"  y="15" width="4" height="3" fill="#000" />
			<rect x="15" y="15" width="4" height="3" fill="#000" />
			<rect x="21" y="15" width="4" height="3" fill="#000" />
			<rect x="27" y="15" width="4" height="3" fill="#000" />
			<rect x="9"  y="20" width="4" height="3" fill="#000" />
			<rect x="15" y="20" width="4" height="3" fill="#000" />
			<rect x="21" y="20" width="4" height="3" fill="#000" />
			<rect x="27" y="20" width="4" height="3" fill="#000" />
			<rect x="9"  y="25" width="10" height="3" fill="#000" />
			<rect x="21" y="25" width="4" height="3" fill="#000" />
			<rect x="27" y="25" width="4" height="3" fill="#000" />
		</g>
	),

	hd: (
		<g>
			<rect x="3" y="10" width="34" height="14" fill="#fff" stroke="#000" strokeWidth="1.2" />
			<rect x="7" y="14" width="26" height="2" fill="#000" />
			<rect x="31" y="19" width="3" height="2" fill="#000" />
			<rect x="7" y="19" width="14" height="3" fill="#fff" stroke="#000" strokeWidth="0.8" />
		</g>
	),

	globe: (
		<g>
			<circle cx="20" cy="16" r="12" fill="#fff" stroke="#000" strokeWidth="1.2" />
			<ellipse cx="20" cy="16" rx="12" ry="6" fill="none" stroke="#000" strokeWidth="0.9" />
			<ellipse cx="20" cy="16" rx="5"  ry="12" fill="none" stroke="#000" strokeWidth="0.9" />
			<line x1="20" y1="4" x2="20" y2="28" stroke="#000" strokeWidth="0.9" />
		</g>
	),

	letter: (
		<g>
			<rect x="4" y="8" width="32" height="20" fill="#fff" stroke="#000" strokeWidth="1.2" />
			<path d="M4 8 L20 20 L36 8" fill="none" stroke="#000" strokeWidth="1.2" />
			<rect x="28" y="10" width="5" height="4" fill="none" stroke="#000" strokeWidth="0.6" strokeDasharray="1 1" />
		</g>
	),

	papers: (
		<g>
			<path d="M9 7 L23 7 L27 11 L27 27 L9 27 Z"  fill="#fff" stroke="#000" strokeWidth="1"   />
			<path d="M12 5 L26 5 L30 9 L30 25 L12 25 Z" fill="#fff" stroke="#000" strokeWidth="1"   />
			<path d="M15 3 L29 3 L33 7 L33 23 L15 23 Z" fill="#fff" stroke="#000" strokeWidth="1.2" />
			<rect x="18" y="10" width="12" height="1" fill="#000" />
			<rect x="18" y="13" width="10" height="1" fill="#000" />
			<rect x="18" y="16" width="13" height="1" fill="#000" />
		</g>
	),

	puzzle: (
		<g>
			<path
				d="M6 8 L15 8 L15 5 Q20 3 20 8 L25 8 L25 15 Q28 13 29 17 Q28 21 25 20 L25 28 L17 28 Q19 25 16 24 Q13 25 15 28 L6 28 Z"
				fill="#fff"
				stroke="#000"
				strokeWidth="1.2"
				strokeLinejoin="round"
			/>
		</g>
	),

	book: (
		<g>
			<rect x="6" y="4" width="26" height="24" fill="#fff" stroke="#000" strokeWidth="1.2" />
			<line x1="6" y1="4" x2="6" y2="28" stroke="#000" strokeWidth="2" />
			<rect x="11" y="9"  width="16" height="1" fill="#000" />
			<rect x="11" y="13" width="16" height="1" fill="#000" />
			<rect x="11" y="17" width="12" height="1" fill="#000" />
			<rect x="11" y="21" width="14" height="1" fill="#000" />
			<rect x="30" y="8"  width="3" height="3" fill="#000" />
			<rect x="30" y="13" width="3" height="3" fill="#000" />
			<rect x="30" y="18" width="3" height="3" fill="#000" />
		</g>
	),

	controls: (
		<g>
			<rect x="4" y="6" width="32" height="22" fill="#fff" stroke="#000" strokeWidth="1.2" />
			<rect x="8" y="12" width="24" height="2" fill="#000" />
			<rect x="20" y="9" width="4" height="8" fill="#fff" stroke="#000" strokeWidth="1" />
			<rect x="8" y="19" width="5" height="5" fill="#fff" stroke="#000" strokeWidth="1" />
			<path d="M9 21 L11 23 L13 19" fill="none" stroke="#000" strokeWidth="1" />
			<rect x="16" y="20" width="16" height="1" fill="#000" />
			<rect x="16" y="23" width="12" height="1" fill="#000" />
		</g>
	),
};

const MacIcon = ({ name = "folder", ...rest }) => (
	<svg width="48" height="38" viewBox="0 0 40 32" shapeRendering="crispEdges" {...rest}>
		{variants[name] || variants.folder}
	</svg>
);

export default MacIcon;
