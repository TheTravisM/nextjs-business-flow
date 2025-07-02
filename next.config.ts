import type { NextConfig } from "next";
const path = require('path');

const nextConfig: NextConfig = {
  /* config options here */
    reactStrictMode: true,
    sass: true,
    sassOptions: {
      includePaths: [path.resolve(__dirname, 'scss')],
    },
};

export default nextConfig;
