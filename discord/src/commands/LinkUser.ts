import {
	SlashCommandBuilder,
	ChatInputCommandInteraction,
	CacheType,
} from "discord.js";

import { BaseCommand } from "./BaseCommand";
import { UserService } from "../services/UserService";

export default class LinkUser implements BaseCommand {
	public register():
		| SlashCommandBuilder
		| Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> {
		return new SlashCommandBuilder()
			.setName("link")
			.setDescription(
				"Link your discord account with your strike account"
			)
			.addStringOption((option) =>
				option
					.setName("id")
					.setDescription("Your strike id")
					.setRequired(true)
			);
	}

	public async handle(
		interaction: ChatInputCommandInteraction<CacheType>
	): Promise<void> {
		const user = interaction.user;
		const strikeId = interaction.options.getString("id");

		if (!strikeId) {
			await interaction.reply({
				content: "Please provide your strike id",
				ephemeral: true,
			});
			return;
		}

		const success = await UserService.LinkUserAccount(user.id, strikeId);

		if (success) {
			await interaction.reply({
				content: "Successfully linked your account",
				ephemeral: true,
			});
		}
	}
}
