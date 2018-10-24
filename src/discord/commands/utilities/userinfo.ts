import { Command, AccessLevel, Guards, Constants } from "dd-botkit";
import { RichEmbed, User, GuildMember } from "discord.js";
export const KickCommand: Command = {
    opts: {
        name: "userinfo",
        access: AccessLevel.EVERYONE,
        category: "Utilities",
        guards: [
            Guards.Argumented(
                "userinfo",
                "Fetch general information about a member.",
                [
                    {
                        name: "member",
                        type: "user",
                        required: false
                    }
                ]
            )
        ]
    },
    handler: async (message, next) => {
        // Define constants for ease of accesss.
        const client = message.client;
        const guild = message.guild;

        // TODO: change type from any to User.
        // Simple hack to avoid TypeErrors
        const [_user]: any | User = message.args;
        let user: User;
        let member: GuildMember;
        if (!_user) {
            user = message.author;
            member = message.member;
        } else {
            user = _user;
            member = message.guild.members.get(_user.id)!;
        }
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
