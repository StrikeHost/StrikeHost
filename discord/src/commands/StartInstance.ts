import {
  CacheType,
  SlashCommandBuilder,
  ChatInputCommandInteraction,
} from "discord.js";

import { BaseCommand } from "./BaseCommand";
import { InstanceService } from "../services/InstanceService";
import { InstanceStatusType } from "../interfaces/Instance";

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
    await interaction.deferReply({ ephemeral: true });
    const instanceId = interaction.options.getString("id");

    if (!instanceId) {
      await interaction.editReply({
        content: "Please provide your instance ID",
      });
      return;
    }

    InstanceService.getInstanceStatus(instanceId)
      .then((instance) => {
        if (
          instance.status === InstanceStatusType.RUNNING ||
          instance.status === InstanceStatusType.STARTING
        ) {
          interaction.editReply({
            content: "Instance is already running!",
          });
        } else {
          InstanceService.startInstance(instanceId)
            .then(() => {
              interaction.editReply({
                content: "Instance started!",
              });
            })
            .catch(() => {
              interaction.editReply({
                content:
                  "Cannot start instance right now, please try again later",
              });
            });
        }
      })
      .catch(() => {
        interaction.editReply({
          content: "Cannot find instance with that ID",
        });
      });
  }
}
