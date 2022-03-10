module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				hero: "url('/images/hero-bg.jpg')",
			},
			fontFamily: {
				sans: ['Poppins', 'sans-serif'],
				serif: ['"EB Garamond"', 'serif'],
			},
			keyframes: {
				fadein: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
			},
			animation: {
				fadeIn: 'fadein 3s',
			},
		},
	},
	plugins: [],
};
