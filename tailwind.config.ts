import sizeConst from './sizeConst';
import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#181818',
			},
			padding: sizeConst(),
			margin: sizeConst(),
			height: sizeConst(),
			width: sizeConst(),
			gap: sizeConst(),
			fontSize: sizeConst(),
			lineHeight: sizeConst(),
			borderRadius: sizeConst(),
			borderWidth: sizeConst(),
			spacing: sizeConst(),
			inset: sizeConst(),
			letterSpacing: sizeConst(),
			minHeight: sizeConst(),
			minWidth: sizeConst(),
			maxWidth: sizeConst(),
			maxHeight: sizeConst(),
		},
	},
	plugins: [],
};
export default config;
