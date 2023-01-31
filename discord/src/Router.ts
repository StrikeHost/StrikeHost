import {
  ChatInputCommandInteraction,
  CacheType,
  GuildMemberRoleManager,
} from "discord.js";
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
    if (!Router.authenticate(interaction)) {
      return;
    }

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

  private static authenticate(
    interaction: ChatInputCommandInteraction<CacheType>
  ): boolean {
    if (process.env.REQUIRES_DISCORD_FLAG) {
      // Check roles for one that contains 'strike'
      const roles = interaction.member?.roles;
      if (!roles) {
        logger.error("Could not find roles for user");
        return false;
      }

      if (roles instanceof GuildMemberRoleManager) {
        const hasStrikeRole = roles.cache.some((role) =>
          role.name.includes("strike")
        );
        if (!hasStrikeRole) {
          logger.info(
            "User does not have strike role",
            interaction.user.username,
            interaction.user.id
          );
          return false;
        }
      }

      if (Array.isArray(roles)) {
        const hasStrikeRole = roles.some((role) => role.includes("strike"));
        if (!hasStrikeRole) {
          logger.info(
            "User does not have strike role",
            interaction.user.username,
            interaction.user.id
          );
          return false;
        }
      }

      logger.info(
        "User has strike role",
        interaction.user.username,
        interaction.user.id
      );
    }

    return true;
  }
}
