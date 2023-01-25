import { ChatInputCommandInteraction, CacheType } from "discord.js";
import { BaseCommand } from "./commands/BaseCommand";
import logger from "./utils/logger";

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
      Router.commands[interaction.commandName]
        .handle(interaction)
        .catch((error) => {
          logger.error(
            "Error while retrieving user instances: " + JSON.stringify(error)
          );
        });
    }
  }

  public static getRoutes(): Route[] {
    return Object.values(Router.commands).map((command) => {
      return command.register().toJSON();
    });
  }
}
