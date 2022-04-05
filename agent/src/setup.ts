import * as dotenv from "dotenv";
import { Database } from "sqlite3";
import { promisify } from "util";

dotenv.config();

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GAME_NODE_ID: number;
      DATABASE_PATH: string;
      SOCKET_SERVER_ADDRESS: string;
    }
  }
}

async function run() {
  const db = new Database(process.env.DATABASE_PATH);
  const runQuery = promisify(db.run).bind(db);

  await runQuery("DROP TABLE IF EXISTS instances");
  await runQuery("DROP TABLE IF EXISTS settings");

  await runQuery(
    `CREATE TABLE IF NOT EXISTS instances (
      id VARCHAR(256), 
      data TEXT,
      PRIMARY KEY(id)
    )`
  );

  await runQuery(
    "CREATE TABLE IF NOT EXISTS settings (key TEXT, value TEXT, PRIMARY KEY(key))"
  );
}

run();
