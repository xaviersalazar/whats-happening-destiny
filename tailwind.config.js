module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      white: "#ffffff",
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
