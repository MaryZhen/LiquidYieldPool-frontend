import path from "path";
import withBundleAnalyzer from '@next/bundle-analyzer';
import process from "process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "",
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    config.resolve.alias["@src"] = path.resolve("./src");
    return config;
  },
};
if (process.env.SHOW_ANALYZER) {
  console.log("SHOW_ANALYZER is true");
}
const exportresult = process.env.SHOW_ANALYZER ? withBundleAnalyzer(nextConfig) : nextConfig;
export default exportresult;
