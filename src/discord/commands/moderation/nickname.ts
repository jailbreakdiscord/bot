import { Command, AccessLevel, CommandError, Logger, Guards } from "dd-botkit";

export const NicknameCommand: Command = {
    opts: {
        name: "nickname",
        access: AccessLevel.MODERATOR,
        category: "Moderation",
        guards: [
            Guards.Argumented(
                "nickname",
                "Force changes the nickname of a user",
                [
                    {
                        name: "user",
                        type: "user",
                        required: true
                    },
                    {
                        name: "nickname",
                        type: "string",
                        required: true
                    }
                ]
            )
        ]
    },
    handler: async (msg, next) => {
        const [user, nickname] = msg.args;
        
        // FIXME: Types here are completely wrong.
        const member = msg.guild.members.get((user as any).id);


        if (!member) {
            throw new CommandError({
                message: "Please specify a member of this guild."
            });
        }

        await member.setNickname(nickname);
        await msg.success();
    }
};
