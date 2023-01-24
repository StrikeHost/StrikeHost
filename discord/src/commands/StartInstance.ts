import {
  CacheType,
  SlashCommandBuilder,
  ChatInputCommandInteraction,
} from "discord.js";

import { BaseCommand } from "./BaseCommand";
import { InstanceService } from "../services/InstanceService";

export default class StartInstance implements BaseCommand {
  public register():
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> {
    return new SlashCommandBuilder()
      .setName("start")
      .setDescription("Start a new instance")
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

    await interaction.reply("Starting instance...");

    if (!instanceId) {
      await interaction.reply("No instance ID provided");
      return;
    }

    await InstanceService.startInstance(instanceId);

    await interaction.followUp("Instance started!");
  }
}
