const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        brown: {
          500: "#522e2c",
        },
      },
    },
  },

  plugins: [require("@tailwindcss/forms")],
};

module.exports = config;
