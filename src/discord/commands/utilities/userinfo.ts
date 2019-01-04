import { Command, Constants } from "dd-botkit";
import { GuildMember, RichEmbed } from "discord.js";
export const UserInfoCommand: Command = {
    opts: {
        name: "userinfo",
        category: "Moderation",
        usage: {
            description: "Fetch general information about a member.",
            args: [
                {
                    name: "user",
                    type: "member",
                    required: false
                }
            ]
        },
        node: "util.userinfo"
    },
    handler: async (message, next) => {
        // Define constants for ease of accesss.
        const client = message.client;
        const guild = message.guild;

        let [ member ] = message.args as [GuildMember | undefined];
        member = member || message.member;

        const { user } = member;

        const embed = new RichEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setFooter(Constants.BOT_AUTHOR)
            .setTimestamp()

            // Random hex color (16777215 === 0xffffff).
            .setColor(Math.floor(Math.random() * 16777215).toString(16))
            .setTitle("User Info")
            .setDescription(`General information about \`${user.username}\`.`)
            .setThumbnail(user.displayAvatarURL)
            .addField("Tag", user.tag, true)

            // Could potentially be changed to some other, more readable format.
            .addField(
                "Creation Date",
                new Date(user.createdTimestamp).toUTCString(),
                true
            )
            .addBlankField()
            .addField("Nickname", member.displayName, true)
            .addField(
                "Join date",
                new Date(member.joinedTimestamp).toUTCString(),
                true
            )
            .addBlankField()
            .addField("Roles", member.roles.map((x) => x), true)
            .addBlankField()
            .addField("Highest role", member.highestRole, true)
            .addField("Member count", guild.memberCount, true);
        await message.channel.send(embed);
    }
};
