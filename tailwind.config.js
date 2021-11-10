const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	purge: {
		enabled: true,
		layers: ['components', 'utilities'],
		content: ['./public/index.html','./src/assets/**/*.css', './src/**/*.vue'],
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		colors : {
			'white': '#D5D5D5',
			'black': '#121212',
			'dark-grey': '#2A2A2A',
			'light-grey': '#606f7b',
			'orange-dark': '#C59968',
			'red-light': '#ef5753',
			...defaultTheme.colors,
		},
		fontFamily: {
			primary: "'Josefin Sans', sans-serif",
			secondary: "'Tenor Sans', sans-serif",
		},
		screens: {
			'2xs':'320px',
			'xs': '480px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
		 	'2xl': '1536px',
		},
		extend: {
			height:{
				'80':'20rem'
			},
		},
		
	},
	variants: {
		extend: {
			opacity: ['disabled'],
			transitionDuration: ['hover', 'focus'],
		},
	},
	plugins: [],
}