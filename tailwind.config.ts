import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";

const config: Config = {
content: [
"./index.html",
"./src/**/*.{vue,js,ts,jsx,tsx}",
],
theme: {
},

plugins: [],
};

const withMTConfig = withMT(config);

export default withMTConfig;