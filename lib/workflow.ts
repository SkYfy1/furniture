import { Client } from "@upstash/workflow";
import { Client as QStashClient } from "@upstash/qstash";

export const workflow = new Client({
  baseUrl: process.env.QSTASH_URL,
  token: process.env.QSTASH_TOKEN,
});

export const qstash = new QStashClient({ token: process.env.QSTASH_TOKEN! });
