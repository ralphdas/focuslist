"use server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function getURLbasedOnEnv() {
  const { env } = await getCloudflareContext({ async: true });
  if (env.NEXTJS_ENV === "development") {
    return "http://localhost:8787";
  } else {
    return "https://todos-api-worker.ralph-das.workers.dev";
  }
}

export async function getCurrentDeploymentVersion() {
  const { env } = await getCloudflareContext({ async: true });
  const version = env.CF_VERSION_METADATA.id;

  return `v.${version.split("-")[0]}`;
}
