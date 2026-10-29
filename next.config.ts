import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // don't advertise the framework in an X-Powered-By header
  poweredByHeader: false,
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        // CSS modules must keep their module type, or their classes aren't exported
        condition: { not: { path: /\.module\.css$/ } },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
