import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  CacheType,
} from "discord.js";

import { BaseCommand } from "./BaseCommand";
import { UserService } from "../services/UserService";
import { getUserEmbed } from "../utils/users";
import logger from "../utils/logger";

export default class GetUser implements BaseCommand {
  public register():
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> {
    return new SlashCommandBuilder()
      .setName("user")
      .setDescription("Get strike user info")
      .addUserOption((option) =>
        option
          .setName("user")
          .setDescription("The user to get info from")
          .setRequired(false)
      );
  }

  public async handle(
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    await interaction.deferReply();

    const user = interaction.options.getUser("user") || interaction.user;

    UserService.getUserAccount(user.id)
      .then(async (strikeUser) => {
        const embed = getUserEmbed(strikeUser, user);
        await interaction.editReply({ embeds: [embed] });
      })
      .catch(async (err) => {
        logger.error("Could not display user info", err);
        await interaction.editReply("User not found");
      });
  }
}
