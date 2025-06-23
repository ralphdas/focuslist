import { Kysely } from "kysely";
import { Database } from "./schema";
import { D1Dialect } from "kysely-d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const db = new Kysely<Database>({
  dialect: new D1Dialect({ database: getCloudflareContext().env.DB }),
});
