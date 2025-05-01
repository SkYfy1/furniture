import { sql } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";

export const hasValueInArray = (table: PgColumn, tag: string) => {
  return sql`${sql.placeholder(tag)} = ANY(${table})`;
};
