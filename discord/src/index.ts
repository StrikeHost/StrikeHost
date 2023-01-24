import * as dotenv from "dotenv";
import { readdirSync } from "fs";
import {
  BaseInteraction,
  REST,
  Routes,
  Collection,
  Client,
  GatewayIntentBits,
} from "discord.js";

import { Router } from "./Router";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string;
      CLIENT_ID: string;
    }
  }
}

dotenv.config();

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Load commands
const commandsPath = __dirname + "/commands";
const commandFiles = readdirSync(commandsPath).filter(
  (file) => file.endsWith(".ts") && file !== "BaseCommand.ts"
);

for (const file of commandFiles) {
  const filePath = `${commandsPath}/${file}`;
  const command = require(filePath);

  const commandName = file.split(".")[0];

  // @ts-ignore
  Router.add(Object.values(command)[0]);

  console.log(`Loaded command ${commandName}`);
}

client.on("ready", async () => {
  console.log(`Logged in as ${client.user!.tag}!`);

  const guild = await client.guilds.fetch("913783506528792606");
  await guild.commands.set([]);
  await guild.commands.set(Router.getRoutes());

  console.log("Set application commands");
});

client.on("interactionCreate", async (interaction: BaseInteraction) => {
  if (!interaction.isChatInputCommand()) return;

  Router.handle(interaction);
});

client.login(process.env.BOT_TOKEN);
