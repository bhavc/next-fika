/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {}
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#072c60",
					secondary: "#ff4000",
					accent: "#3b82f6",
					neutral: "#162027",
					"base-100": "#f3f4f6",
					info: "#3b82f6",
					success: "#22e225",
					warning: "#fcd34d",
					error: "#e60000"
				}
			}
		]
	}
};
