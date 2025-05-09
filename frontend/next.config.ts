import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

import process from "process";

const nextConfig = {} as NextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
initOpenNextCloudflareForDev().then(() => {
  console.log(`Starting server in ${process.env.NODE_ENV} mode...`);
});

export default nextConfig;
