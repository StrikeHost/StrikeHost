import { ButtonInteraction, CacheType } from "discord.js";
import { InstanceService } from "../services/InstanceService";
import logger from "../utils/logger";
import { BaseButtonHandler } from "./BaseButtonHandler";

export default class InstancesButtonHandler implements BaseButtonHandler {
  public register(): Record<
    string,
    (interaction: ButtonInteraction<CacheType>) => Promise<void>
  > {
    return { start: this.startInstance, stop: this.stopInstance };
  }

  /**
   * Start an instance via a button
   *
   * @param {ButtonInteraction} interaction
   * @returns {Promise<void>}
   */
  private async startInstance(
    interaction: ButtonInteraction<CacheType>
  ): Promise<void> {
    await interaction.deferReply();

    const [, , instanceId] = interaction.customId.split(":");

    InstanceService.startInstance(instanceId)
      .then(async () => {
        logger.info(`Started instance ${instanceId} via button`, interaction);

        await interaction.editReply({
          content: `Started instance!`,
        });
      })
      .catch(async (error) => {
        logger.error(
          "Failed to start instance via button ",
          error,
          interaction
        );
        await interaction.editReply({
          content: "Failed to start instance! Please try again later.",
        });
      });
  }

  /**
   * Stop an instance via a button
   *
   * @param {ButtonInteraction} interaction
   * @returns {Promise<void>}
   */
  private async stopInstance(
    interaction: ButtonInteraction<CacheType>
  ): Promise<void> {
    await interaction.deferReply();

    const [, , instanceId] = interaction.customId.split(":");

    InstanceService.stopInstance(instanceId)
      .then(async () => {
        logger.info(`Stopped instance ${instanceId} via button`, interaction);

        await interaction.editReply({
          content: `Stopped instance!`,
        });
      })
      .catch(async (error) => {
        logger.error("Failed to stop instance via button ", error, interaction);
        await interaction.editReply({
          content: "Failed to stop instance! Please try again later.",
        });
      });
  }
}
