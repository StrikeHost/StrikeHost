import * as dotenv from "dotenv";

import { initRoutes } from "./routes";
import { Agent } from "./classes/Agent";
import { Database } from "./classes/Database";

// Add types to process.env
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AGENT_SECRET: string;
      GAME_NODE_ID: number;
      DATABASE_PATH: string;
      SOCKET_SERVER_ADDRESS: string;
    }
  }
}

dotenv.config();

if (process.env.NODE_ENV !== "development") {
  const Bugsnag = require("@bugsnag/js");
  Bugsnag.start({ apiKey: "0f1fb96b2e05419fbc9b7cd03c9f3b97" });
}

Database.init();
initRoutes();

const agent = new Agent();
agent.init();
