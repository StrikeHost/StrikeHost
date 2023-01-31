import { SlashCommandBuilder, CommandInteraction, CacheType } from "discord.js";
import { UserService } from "../services/UserService";
import { BaseCommand } from "./BaseCommand";

export default class UnlinkUser implements BaseCommand {
  public register():
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> {
    return new SlashCommandBuilder()
      .setName("unlink")
      .setDescription("Unlink your Discord account from your Strike account");
  }

  public async handle(
    interaction: CommandInteraction<CacheType>
  ): Promise<void> {
    await interaction.deferReply({ ephemeral: true });

    UserService.getUserAccount(interaction.user.id)
      .then(() => {
        UserService.unlinkUserAccount(interaction.user.id)
          .then(() => {
            interaction.editReply({
              content:
                "Your Discord account has been unlinked from your Strike account",
            });
          })
          .catch(() => {
            interaction.editReply({
              content:
                "Cannot unlink your account right now, please try again later",
            });
          });
      })
      .catch(() => {
        interaction.editReply({
          content: "You don't have a linked account!",
        });
      });
  }
}
