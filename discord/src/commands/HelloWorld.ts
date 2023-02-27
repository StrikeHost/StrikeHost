import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { BaseCommand } from "./BaseCommand";

export class HelloWorld implements BaseCommand {
	public register(): SlashCommandBuilder {
		return new SlashCommandBuilder()
			.setName("hello")
			.setDescription("Replies with Hello World!");
	}

	public async handle(interaction: CommandInteraction): Promise<void> {
		await interaction.reply("Test1");
	}
}
