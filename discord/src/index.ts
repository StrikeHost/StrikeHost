import * as dotenv from "dotenv";
import { readdirSync } from "fs";
import {
  BaseInteraction,
  REST,
  Routes,
  Collection,
  Client,
  GatewayIntentBits,
  Events,
} from "discord.js";

import { Router } from "./Router";
import { ButtonRouter } from "./ButtonRouter";
import logger from "./utils/logger";

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

// Load buttons
const buttonsPath = __dirname + "/buttons";
const buttonFiles = readdirSync(buttonsPath).filter(
  (file) => file.endsWith(".ts") && file !== "BaseButtonHandler.ts"
);

for (const file of buttonFiles) {
  const filePath = `${buttonsPath}/${file}`;
  const handler = require(filePath);

  const handlerName = file.split(".")[0].toLowerCase();
  // Instantiate handler
  // @ts-ignore
  const handlerInstance = new (Object.values(handler)[0])();

  // @ts-ignore
  const buttons: Record<string, (ButtonInteraction) => Promise<void>> =
    handlerInstance.register();

  for (const [buttonName, buttonHandler] of Object.entries(buttons)) {
    // Add to button lookup table
    ButtonRouter.add(`${handlerName}:${buttonName}`, buttonHandler);

    logger.info(`Loaded button ${handlerName}:${buttonName}`);
  }
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

client.on(Events.InteractionCreate, (interaction: BaseInteraction) => {
  if (!interaction.isButton()) return;

  logger.info(`Received button interaction ${interaction.customId}`);

  ButtonRouter.handle(interaction);
});

client.login(process.env.BOT_TOKEN);
