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
    fontWeight: {
      thin: "100",
      light: "300",
      regular: "400",
      bold: "700",
      black: "900",
    },
    colors: {
      white: "#ffffff",
      light: "#e2e8f0",
      dark: "#0e1111",
    },
    letterSpacing: {
      widerest: "0.2em",
    },
    extend: {
      width: {
        mobileMenu: "calc(100vw - 1rem)",
      },
      keyframes: {
        line: {
          from: { left: "50%", width: "0%" },
          to: { left: "5%", width: "75%" },
        },
      },
      animation: {
        animateHr: "line 2s linear forwards",
      },
    },
  },
  plugins: [],
};
