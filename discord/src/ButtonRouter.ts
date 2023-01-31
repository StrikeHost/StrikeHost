import { ButtonInteraction } from "discord.js";
import logger from "./utils/logger";

export class ButtonRouter {
  protected static buttons: Record<
    string,
    (arg0: ButtonInteraction) => Promise<void>
  > = {};

  /**
   * Add a button handler
   *
   * @param {string} name
   * @param {(arg0: ButtonInteraction) => Promise<void>} handlerMethod
   */
  public static add(
    name: string,
    handlerMethod: (arg0: ButtonInteraction) => Promise<void>
  ) {
    ButtonRouter.buttons[name] = handlerMethod;
  }

  /**
   * Handle a button interaction
   *
   * @param {ButtonInteraction} interaction
   */
  public static handle(interaction: ButtonInteraction) {
    const operationName = interaction.customId.split(":").slice(0, 2).join(":");
    logger.info(`Routing button ${operationName}`);
    if (ButtonRouter.buttons[operationName]) {
      logger.info(`Successfully routed button ${operationName}`);
      ButtonRouter.buttons[operationName](interaction);
    }
  }
}
