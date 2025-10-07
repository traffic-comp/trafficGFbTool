// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      rotate: {
        270: "270deg",
      },
      keyframes: {
        loader: {
          "0%": { borderLeft: "1px solid #000" },
          "25%": { borderBottom: "1px solid #000" },
          "75%": { borderRight: "1px solid #000" },
          "100%": { borderTop: "1px solid #000" },
        },
      },
      animation: {
        loader: "loader 1s linear infinite",
      },
    },
  },
};
