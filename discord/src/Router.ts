import { ChatInputCommandInteraction, CacheType } from "discord.js";
import { BaseCommand } from "./commands/BaseCommand";

type Route = {
	name: string;
	description: string;
};

export class Router {
	protected static commands: Record<string, BaseCommand> = {};

	public static add<T extends new () => BaseCommand>(handler: T) {
		const commandHandler = new handler();
		const commandName = commandHandler.register().name;
		Router.commands[commandName] = commandHandler;
	}

	public static handle(interaction: ChatInputCommandInteraction<CacheType>) {
		if (Router.commands[interaction.commandName]) {
			Router.commands[interaction.commandName].handle(interaction);
		}
	}

	public static getRoutes(): Route[] {
		return Object.values(Router.commands).map((command) => {
			return command.register().toJSON();
		});
	}
}
