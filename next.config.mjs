/** @type {import('next').NextConfig} */
import path from 'path'
// import withBundleAnalyzer from '@next/bundle-analyzer';
import process from "process";

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@ant-design', 'rc-util', 'rc-pagination', 'rc-picker'], // 该配置为了解决antd的兼容问题
  basePath: "",
  // sassOptions: { // 配置 Sass 配置选项,否则样式无法编译识别
  //   includePaths: ['styles'], // 指定包含 Sass 文件的目录
  // },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    // const srcPath = path.resolve(new URL('.', import.meta.url).pathname, 'src')
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   '@': srcPath, // 根据你的项目结构调整
    //   '@src': srcPath,
    // };
    // config.resolve.alias["@"] = path.resolve("src");
    return config;
  },
};
if (process.env.SHOW_ANALYZER) {
  console.log("SHOW_ANALYZER is true");
}
// const exportresult = process.env.SHOW_ANALYZER ? withBundleAnalyzer(nextConfig) : nextConfig;
// const exportresult = nextConfig
export default nextConfig;
