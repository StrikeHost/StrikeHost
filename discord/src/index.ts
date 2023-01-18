import * as dotenv from "dotenv";
import { readdirSync } from "fs";
import { BaseInteraction, REST, Routes, Collection } from "discord.js";

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

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

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

(async () => {
	try {
		console.log("Started refreshing application (/) commands.");

		await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
			body: Router.getRoutes(),
		});

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error(error);
	}
})();

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction: BaseInteraction) => {
	if (!interaction.isChatInputCommand()) return;

	Router.handle(interaction);
});

client.login(process.env.BOT_TOKEN);
