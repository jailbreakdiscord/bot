import { AccessLevel, Command, Constants } from "dd-botkit";
import { RichEmbed } from "discord.js";
export const ServerInfoCommand: Command = {
    opts: {
        name: "serverinfo",
        access: AccessLevel.EVERYONE,
        category: "Utilities",
        usage: {
            description: "Fetch general information about the server."
        }
    },
    handler: async (message, next) => {
        const guild = message.guild;
        const client = message.client;
        const embed = new RichEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setFooter(Constants.BOT_AUTHOR)
            .setTimestamp()
            // Random hex color.
            .setColor(Math.floor(Math.random() * 16777215).toString(16))
            .setTitle("Server Info")
            .setDescription("General information about the server.")
            .setThumbnail(guild.iconURL)
            .addField("Name", guild.name, true)
            // Could potentially be changed to some other, more readable format.
            .addField(
                "Creation Date",
                new Date(guild.createdTimestamp).toUTCString(),
                true
            )
            .addBlankField()
            .addField("Region", guild.region, true)
            .addField("Verification level", guild.verificationLevel, true)
            .addBlankField()
            .addField("Channels", guild.channels.size, true)
            .addField("Roles", guild.roles.size, true)
            .addBlankField()
            .addField("Owner", guild.owner.user.tag, true)
            .addField("Members", guild.memberCount, true);
        // TODO: output to console using logger instead of throwing the error.
        await message.channel.send(embed);
    }
};
