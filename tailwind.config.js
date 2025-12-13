module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",

    // Scan MFE remote modules
    "./node_modules/**/**/*.{js,ts,jsx,tsx}",
  ],

  safelist: [
    "grid",
    "grid-cols-3",
    "md:grid-cols-6",
    "gap-6",
  ],

  theme: {
    extend: {},
  },
  plugins: [],
};
