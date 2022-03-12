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
				fadeout: {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' },
				},
				moduleCardOnEnter: {
					'0%': { height: '0' },
					'100%': { height: 'initial' },
				},
			},
			animation: {
				fadeIn: 'fadein 0.2s',
				fadeOut: 'fadeout 0.2s',
				moduleCard: 'moduleCardOnEnter 0.05s linear',
			},
		},
	},
	plugins: [],
};
