import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "discord.js";
import { Instance, InstanceStatusType } from "../interfaces/Instance";

/**
 * Get a displayable status for an instance
 *
 * @param {InstanceStatusType} status
 * @returns {string}
 */
export const getDisplayableInstanceStatus = (status: InstanceStatusType) => {
  switch (status) {
    case InstanceStatusType.PROVISIONING:
      return "Provisioning 🟡";
    case InstanceStatusType.RUNNING:
      return "Running 🟢";
    case InstanceStatusType.STOPPED:
      return "Stopped 🔴";
    case InstanceStatusType.STARTING:
      return "Starting 🟡";
    case InstanceStatusType.STOPPING:
      return "Stopping 🟡";
  }
};

/**
 * Get an embed for an instance
 *
 * @param {Instance} instance
 * @returns {[EmbedBuilder]}
 */
export const getInstanceEmbed = (
  instance: Instance
): [EmbedBuilder, ActionRowBuilder] => {
  const embed = new EmbedBuilder()
    .setColor("#e1aa17")
    .setTitle(`${instance.image.game.name} Server`)
    .addFields([
      {
        name: "Game",
        value: instance.image.game.name,
        inline: true,
      },
      {
        name: "Image",
        value: instance.image.name,
        inline: true,
      },
      {
        name: "Version",
        value: instance.version.name,
        inline: true,
      },
      {
        name: "Status",
        value: getDisplayableInstanceStatus(instance.status),
        inline: true,
      },
      {
        name: "Address",
        value: `${instance.agent.ip}:${instance.port}`,
        inline: true,
      },
      {
        name: "Instance ID",
        value: `\`${instance.id}\``,
      },
    ]);

  const buttons: ButtonBuilder[] = [];

  if (instance.status === InstanceStatusType.RUNNING) {
    buttons.push(
      new ButtonBuilder()
        .setCustomId(`instance:stop:${instance.id}`)
        .setLabel("Stop Instance")
        .setStyle(4),
      new ButtonBuilder()
        .setCustomId(`instance:restart:${instance.id}`)
        .setLabel("Restart Instance (NYI)")
        .setStyle(1)
        .setDisabled(true)
    );
  } else {
    buttons.push(
      new ButtonBuilder()
        .setCustomId(`instance:start:${instance.id}`)
        .setLabel("Start Instance")
        .setStyle(3)
    );
  }

  const actionRow = new ActionRowBuilder().addComponents(buttons);

  return [embed, actionRow];
};
