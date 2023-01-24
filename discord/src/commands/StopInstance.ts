import {
  CacheType,
  SlashCommandBuilder,
  ChatInputCommandInteraction,
} from "discord.js";

import { BaseCommand } from "./BaseCommand";
import { InstanceService } from "../services/InstanceService";

export default class StopInstance implements BaseCommand {
  public register():
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> {
    return new SlashCommandBuilder()
      .setName("stop")
      .setDescription("Stop a new instance")
      .addStringOption((option) =>
        option
          .setName("id")
          .setDescription("Your instance ID")
          .setRequired(true)
      );
  }

  public async handle(
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    const instanceId = interaction.options.getString("id");

    if (!instanceId) {
      await interaction.reply("No instance ID provided");
      return;
    }

    await InstanceService.stopInstance(instanceId);

    await interaction.reply("Stopping instance...");
  }
}
