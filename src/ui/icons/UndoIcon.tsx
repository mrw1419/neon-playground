import React from "react";

export const UndoIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = "currentColor" }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		focusable="false"
	>
		<path
			d="M7.5 8H4V4.5M4 8c1.5-2.5 4.5-4 7.5-4 5 0 9 3.5 9 8s-4 8-9 8c-2.5 0-4.8-0.8-6.5-2.2"
			stroke={color}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);