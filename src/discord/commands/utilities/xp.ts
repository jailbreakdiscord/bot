import { Command, AccessLevel, Guards, Constants } from "dd-botkit";
import { GuildMember as DGuildMember, RichEmbed } from "discord.js";
import { GuildMember } from "../../../database/entities/GuildMember";
import { getPublicLogger } from "../..";
export const XPCommand: Command = {
    opts: {
        name: "xp",
        access: AccessLevel.EVERYONE,
        category: "Utilities",
        guards: [
            Guards.Argumented("xp", "Get XP for a user.", [
                {
                    name: "user",
                    type: "member",
                    required: false
                }
            ])
        ]
    },
    handler: async (message, next) => {
        if (!message.guild) return message.fail();
        const client = message.client;
        let [_member]: any | DGuildMember = message.args;
        if (!_member) _member = message.member;
        const dbMember = await GuildMember.findOne({ id: _member.id });
        const embed = new RichEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setFooter(Constants.BOT_AUTHOR)
            .setTimestamp()
            // Random hex color.
            .setColor("RANDOM")
            .setTitle("XP")
            .setDescription(`XP for ${_member.user.tag}.`)
            .setThumbnail(_member.user.displayAvatarURL)
            .addField("Experience Points", dbMember ? dbMember.xp : 0)
            .addField(
                "Level",
                dbMember ? Math.pow(Math.sqrt(dbMember.xp), 5) : 0
            );

        await message.channel.send(embed);
        await message.success();
    }
};
