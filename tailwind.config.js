module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xxs: "320px",
      xs: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      white: "#ffffff",
    },
    letterSpacing: {
      widerest: "0.2em",
    },
    extend: {
      keyframes: {
        line: {
          from: { left: "50%", width: "0%" },
          to: { left: "5%", width: "75%" },
        },
      },
      animation: {
        "animate-hr": "line 2s linear forwards",
      },
    },
  },
  plugins: [],
};
