import { Command, AccessLevel, CommandError, Logger, Guards } from "dd-botkit";

export const KickCommand: Command = {
    opts: {
        name: "kick",
        access: AccessLevel.MODERATOR,
        category: "Moderation",
        guards: [
            Guards.Argumented("kick", "Kicks a user", [
                {
                    name: "user",
                    type: "user",
                    required: true
                },
                {
                    name: "reason",
                    type: "string",
                    required: false,
                    unlimited: true
                }
            ])
        ]
    },
    handler: async (msg, next) => {
        const [user, reason] = msg.args;

        // prettier-ignore
        await msg.reply(`And this is the point where I'd usually kick <@${(user as any).id}> for ${reason || "no reason"} but i'm in debug mode.`);
    }
};
