/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/html/utils/withMT";

const config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,html}",
    "./node_modules/@material-tailwind/html/**/*.{js,ts,html}",
  ],
  theme: {
    colors: {
      primary: "#1d2125",
    },
  },
  plugins: [],
};

export default withMT(config);
