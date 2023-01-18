import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export abstract class BaseCommand {
	public abstract register():
		| SlashCommandBuilder
		| Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;

	public abstract handle(interaction: CommandInteraction): Promise<void>;
}
