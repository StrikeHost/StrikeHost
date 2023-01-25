import dayjs from "dayjs";
import {
  SlashCommandBuilder,
  CacheType,
  EmbedBuilder,
  ChatInputCommandInteraction,
  APIEmbedField,
  RestOrArray,
  ActionRowBuilder,
  ButtonBuilder,
} from "discord.js";
import { Instance } from "../interfaces/Instance";
import { InstanceService } from "../services/InstanceService";
import { getInstanceEmbed } from "../utils/instances";

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
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    const instances = await InstanceService.getInstances(interaction.user.id);

    if (instances.length === 0) {
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("No instances found")
            .setDescription("This user has no instances"),
        ],
        components: [],
        ephemeral: true,
      });
      return;
    }

    const [embed, actionRow] = getInstanceEmbed(instances[0]);

    await interaction.reply({
      embeds: [embed],
      // @ts-ignore
      components: [actionRow],
      ephemeral: true,
    });

    // TODO: Add pagination using reactions
  }
}
