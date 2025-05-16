// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";

// const sql = neon(process.env.DATABASE_URL!);

// export const db = drizzle({ client: sql });

//
//
//

// import { neonConfig, Pool } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-serverless";
// import { WebSocket } from "ws";

// neonConfig.webSocketConstructor = WebSocket;
// const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// export const db = drizzle(pool);

import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool });
