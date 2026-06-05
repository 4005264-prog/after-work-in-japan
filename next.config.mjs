const isGitHubPages = process.env.GITHUB_PAGES === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  basePath: isGitHubPages ? "/after-work-in-japan" : "",
  assetPrefix: isGitHubPages ? "/after-work-in-japan/" : ""
};

export default nextConfig;
