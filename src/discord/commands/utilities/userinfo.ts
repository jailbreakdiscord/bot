import {
    Command,
    AccessLevel,
    CommandError,
    Logger,
    Guards,
    Constants
} from "dd-botkit";
import { RichEmbed, User, GuildMember } from "discord.js";
export const KickCommand: Command = {
    opts: {
        name: "userinfo",
        access: AccessLevel.MODERATOR,
        category: "Moderation",
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
        //TODO: change type from any to User.
        let [_user]: any | User = message.args;
        const client = message.client;
        let user: User = _user;
        let member: GuildMember = message.guild.members.get(user.id)!;
        if (!_user) {
            user = message.author;
            member = message.member;
        }
        console.log(new Date(user.createdTimestamp).toUTCString());
        const guild = message.guild;
        const embed = new RichEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setFooter(Constants.BOT_AUTHOR)
            .setTimestamp()

            // Random hex color (16777215 === 0xffffff).
            .setColor(Math.floor(Math.random() * 16777215).toString(16))
            .setTitle("User Info")
            .setDescription(`General information about \`${user.username}\`.`)
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
            .addField("Highest role", member.highestRole.name, true)
            .addField("Members", guild.memberCount, true);
        //TODO: output to console using logger instead of throwing the error.
        message.channel.send(embed).catch((err) => {
            throw err;
        });
    }
};
