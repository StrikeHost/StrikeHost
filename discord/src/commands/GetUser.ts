import {
	SlashCommandBuilder,
	ChatInputCommandInteraction,
	CacheType,
} from "discord.js";

import { BaseCommand } from "./BaseCommand";
import { UserService } from "../services/UserService";

export default class GetUser implements BaseCommand {
	public register():
		| SlashCommandBuilder
		| Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> {
		return new SlashCommandBuilder()
			.setName("user")
			.setDescription("Get strike user info")
			.addUserOption((option) =>
				option
					.setName("user")
					.setDescription("The user to get info from")
					.setRequired(false)
			);
	}

	public async handle(
		interaction: ChatInputCommandInteraction<CacheType>
	): Promise<void> {
		const user = interaction.options.getUser("user") || interaction.user;

		const strikeUser = await UserService.GetUserAccount(user.id);

		if (!strikeUser) {
			await interaction.reply("User not found");
			return;
		}

		await interaction.reply(JSON.stringify(strikeUser));
	}
}
