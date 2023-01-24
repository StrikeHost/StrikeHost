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
    await UserService.unlinkUserAccount(interaction.user.id);

    await interaction.reply({
      content:
        "Your Discord account has been unlinked from your Strike account",
      ephemeral: true,
    });
  }
}
