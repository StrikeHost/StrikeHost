import { SlashCommandBuilder, CommandInteraction, CacheType } from "discord.js";
import { InstanceService } from "../services/InstanceService";

import { BaseCommand } from "./BaseCommand";

export default class GetUserInstances implements BaseCommand {
  public register():
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> {
    return new SlashCommandBuilder()
      .setName("instances")
      .setDescription("Get all instances for a user");
  }

  public async handle(
    interaction: CommandInteraction<CacheType>
  ): Promise<void> {
    const instances = await InstanceService.getInstances(interaction.user.id);

    await interaction.reply({
      content: JSON.stringify(instances),
      ephemeral: true,
    });
  }
}
