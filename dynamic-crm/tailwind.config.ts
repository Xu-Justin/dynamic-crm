import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";
import colors from "tailwindcss/colors";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: { ...colors },
        },
    },
    plugins: [],
};

export default withMT(config);
