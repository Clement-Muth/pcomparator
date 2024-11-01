import { createKysely } from "@vercel/postgres-kysely";
import type { DB } from "pcomparator/src/types/db";

export const db = createKysely<DB>();
