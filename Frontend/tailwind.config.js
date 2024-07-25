/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/html/utils/withMT";

const config = {
  content: [
    "./index.html",
    "./src/**/*.html",
    "./node_modules/@material-tailwind/html/**/*.{js,ts,html}",
  ],
  theme: {},
  plugins: [],
};

export default withMT(config);
