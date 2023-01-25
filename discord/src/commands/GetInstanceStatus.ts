import {
  SlashCommandBuilder,
  CacheType,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from "discord.js";
import { Instance } from "../interfaces/Instance";
import { InstanceService } from "../services/InstanceService";
import { BaseCommand } from "./BaseCommand";

export default class GetInstanceStatus implements BaseCommand {
  public register():
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> {
    return new SlashCommandBuilder()
      .setName("status")
      .setDescription("Get the status of an instance")
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
      interaction.reply("No instance ID provided");
      return;
    }

    await interaction.deferReply();

    const status = await InstanceService.getInstanceStatus(instanceId);

    if (!status) {
      interaction.editReply("Instance not found");
      return;
    }

    const embed = this.getEmbed(status);

    interaction.editReply({ embeds: [embed] });
  }

  private getEmbed(instance: Instance): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setColor("#e1aa17")
      .setTitle(`${instance.image.game.name} Server`)
      .addFields([
        {
          name: "Status",
          value: instance.status,
        },
        {
          name: "IP Address",
          value: instance.agent.ip,
          inline: true,
        },
        {
          name: "Port",
          value: String(instance.port),
          inline: true,
        },
        {
          name: "Player Count",
          value: `${instance.detailed_status?.player_count} / ${instance.detailed_status?.max_players}`,
          inline: true,
        },
        {
          name: "Player List",
          value: instance.detailed_status?.player_list?.join(", ") || "",
        },
        {
          name: "CPU",
          value: String(instance.cpus),
          inline: true,
        },
        {
          name: "Memory",
          value: `${instance.memory} MB`,
          inline: true,
        },
      ]);

    return embed;
  }
}
