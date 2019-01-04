import { Command, CommandError } from "dd-botkit";

export const NicknameCommand: Command = {
    opts: {
        name: "nickname",
        category: "Moderation",
        usage: {
            description: "Force changes the nickname of a user",
            args: [
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
        },
        node: "moderation.change-nickname"
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

        await member.setNickname(nickname as string);
        await msg.success();
    }
};
