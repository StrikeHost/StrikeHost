import { EmbedBuilder, User as DiscordUser } from "discord.js";
import { User } from "../interfaces/Instance";

export const getUserEmbed = (
  user: User,
  discordUser: DiscordUser
): EmbedBuilder => {
  return new EmbedBuilder()
    .setTitle(`${user.first_name} ${user.last_name}`)
    .setThumbnail(discordUser.avatarURL())
    .addFields([
      {
        name: "ID",
        value: `\`${user.id}\``,
      },
      {
        name: "Servers",
        value: String(user.instances.length),
        inline: true,
      },
      {
        name: "Is Admin",
        value: user.admin ? "Yes" : "No",
        inline: true,
      },
    ])
    .setFooter({
      text:
        "User created at " + new Date(user.created_at).toLocaleString("en-GB"),
    });
};
