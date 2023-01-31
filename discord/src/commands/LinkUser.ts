import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  CacheType,
} from "discord.js";

import { BaseCommand } from "./BaseCommand";
import { UserService } from "../services/UserService";

export default class LinkUser implements BaseCommand {
  public register():
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> {
    return new SlashCommandBuilder()
      .setName("link")
      .setDescription("Link your discord account with your strike account")
      .addStringOption((option) =>
        option.setName("id").setDescription("Your strike id").setRequired(true)
      );
  }

  public async handle(
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    const user = interaction.user;
    const strikeId = interaction.options.getString("id");

    await interaction.deferReply({ ephemeral: true });

    if (!strikeId) {
      await interaction.editReply({
        content: "Please provide your strike id",
      });
      return;
    }

    UserService.getUserAccount(user.id)
      .then(() => {
        interaction.editReply({
          content: "You already have a linked account!",
        });
      })
      .catch(() => {
        UserService.linkUserAccount(user.id, strikeId)
          .then(() => {
            interaction.editReply({
              content: "Successfully linked your account",
            });
          })
          .catch(() => {
            interaction.editReply({
              content:
                "Cannot link your account right now, please try again later",
            });
          });
      });
  }
}
