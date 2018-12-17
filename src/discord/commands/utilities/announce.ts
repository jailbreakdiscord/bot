import { Command, AccessLevel, Guards } from "dd-botkit";
import { TextChannel, Role } from "discord.js";
export const AnnounceCommand: Command = {
    opts: {
        name: "announce",
        access: AccessLevel.MODERATOR,
        category: "Utilities",
        guards: [
            Guards.Argumented("announce", "Announce .", [
                {
                    name: "channel",
                    type: "channel",
                    required: true
                },
                {
                    name: "role",
                    type: "string",
                    required: true,
                    unlimited: true
                }
            ])
        ]
    },
    handler: async (message, next) => {
        const [channel, role]: TextChannel | Role | any = message.args;
        await message.reply("Please provide an announcemnt.");
        // Only allow the original author to provide an announcement.
        const announcement = await message.channel.awaitMessages(
            (x) => x.author === message.author,
            {
                max: 1,
                time: 60 * 1000, // 1 minute.
                errors: ["time"]
            }
        );
        const pingRole = message.guild.roles.find((x) => x.name === role);
        if (!pingRole) return message.reply("Invalid role.");
        await pingRole.setMentionable(true);
        await (channel as TextChannel).send(
            `${pingRole}, ${announcement.first().content}`
        );
        await pingRole.setMentionable(false);
    }
};
