import {
  CacheType,
  SlashCommandBuilder,
  ChatInputCommandInteraction,
} from "discord.js";

import { BaseCommand } from "./BaseCommand";
import { InstanceService } from "../services/InstanceService";
import { InstanceStatusType } from "../interfaces/Instance";

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
    await interaction.deferReply({ ephemeral: true });

    // get instance ID from options, get status and then try to stop it
    const instanceId = interaction.options.getString("id");

    if (!instanceId) {
      await interaction.editReply({
        content: "Please provide your instance ID",
      });
      return;
    }

    InstanceService.getInstanceStatus(instanceId)
      .then((instance) => {
        if (instance.status !== InstanceStatusType.RUNNING) {
          interaction.editReply({
            content: "Instance is not running!",
          });
        } else {
          InstanceService.stopInstance(instanceId)
            .then(() => {
              interaction.editReply({
                content: "Instance stopped!",
              });
            })
            .catch(() => {
              interaction.editReply({
                content:
                  "Cannot stop instance right now, please try again later",
              });
            });
        }
      })
      .catch(() => {
        interaction.editReply({
          content: "Cannot find instance with this ID",
        });
      });
  }
}
