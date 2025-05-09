import { Kysely } from "kysely";
import { Database } from "./schema";
import { D1Dialect } from "kysely-d1";

export const createDbClient = (db: D1Database) => {
  return new Kysely<Database>({
    dialect: new D1Dialect({ database: db }),
  });
};
