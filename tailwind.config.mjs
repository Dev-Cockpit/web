/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#f0f9ff',
					100: '#e0f2fe',
					200: '#bae6fd',
					300: '#7dd3fc',
					400: '#38bdf8',
					500: '#0ea5e9',
					600: '#0284c7',
					700: '#0369a1',
					800: '#075985',
					900: '#0c4a6e',
					950: '#082f49',
				},
			},
			animation: {
				'float': 'float 6s ease-in-out infinite',
				'pulse-slow': 'pulse 3s ease-in-out infinite',
				'gradient': 'gradient 8s ease infinite',
				'spin-slow': 'spin 3s linear infinite',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				gradient: {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
				},
			},
			backdropBlur: {
				xs: '2px',
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: 'none',
						color: '#d1d5db',
						a: {
							color: '#38bdf8',
							'&:hover': {
								color: '#0ea5e9',
							},
						},
						strong: {
							color: '#f3f4f6',
						},
						'h1, h2, h3, h4': {
							color: '#f3f4f6',
						},
						code: {
							color: '#38bdf8',
							backgroundColor: 'rgba(255, 255, 255, 0.1)',
							padding: '0.25rem 0.375rem',
							borderRadius: '0.25rem',
							fontWeight: '400',
						},
						'code::before': {
							content: '""',
						},
						'code::after': {
							content: '""',
						},
						pre: {
							backgroundColor: 'rgba(17, 24, 39, 0.8)',
							border: '1px solid rgba(255, 255, 255, 0.1)',
						},
						blockquote: {
							borderLeftColor: '#38bdf8',
							backgroundColor: 'rgba(255, 255, 255, 0.05)',
							padding: '0.25rem 1rem',
							borderRadius: '0 0.5rem 0.5rem 0',
						},
						hr: {
							borderColor: 'rgba(255, 255, 255, 0.1)',
						},
						ul: {
							li: {
								'&::marker': {
									color: '#6b7280',
								},
							},
						},
						ol: {
							li: {
								'&::marker': {
									color: '#6b7280',
								},
							},
						},
					},
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}