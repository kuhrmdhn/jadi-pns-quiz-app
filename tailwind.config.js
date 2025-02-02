/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#0E469B",
          "accent": "#333333",
        }
      }
    ]
  },
  theme: {
    extend: {
      colors: {
        "gray-soft": "#fafafa",
        "white-darken": "#fafffa"
      },
      keyframes: {
        "slide-left": {
          from: {"right": "-100%"},
          to: {"right": "0"}
        },
        "slide-right": {
          from: {"left": "-100%"},
          to: {"left": "0"}
        }
      },
      animation: {
        "slide-left": "slide-left forwards ease-in-out .7s",
        "slide-right": "slide-right forwards ease-in-out .7s"
      },
      backdropBlur: {
        "xs": "2px"
      },
      blur: {
        "xs": "2px"
      }
    },
  },
  plugins: [
    require("daisyui")
  ],
}

