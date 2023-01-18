import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { BaseCommand } from "./BaseCommand";

export default class StartInstance extends BaseCommand {
	public register(): SlashCommandBuilder {
		return new SlashCommandBuilder()
			.setName("start")
			.setDescription("Start a new instance");
	}

	public async handle(interaction: CommandInteraction): Promise<void> {
		await interaction.deferReply();

		await interaction.editReply({
			content: "You must link your account before using this command",
		});
		return;

		await interaction.editReply({
			content: `Instance started`,
		});
	}
}
