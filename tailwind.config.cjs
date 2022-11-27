module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}",
  ],
  darkMode: "class",
  plugins: [require("tailwind-dracula")("dracula")],
};
