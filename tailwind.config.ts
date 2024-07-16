import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/(pages)/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/common/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue40: "#0088CC",
        blue35: "#0077B3",
        grey50: "#777788",
        grey5: "#E6F1F6",
        grey70: "#ADADB8",
      },
    },
  },
  plugins: [],
};
export default config;
