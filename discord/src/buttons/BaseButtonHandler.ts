import { ButtonInteraction } from "discord.js";

export abstract class BaseButtonHandler {
  public abstract register(): Record<
    string,
    (interaction: ButtonInteraction) => Promise<void>
  >;
}
