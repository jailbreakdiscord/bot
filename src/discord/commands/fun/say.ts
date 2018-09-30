import { Command, AccessLevel, CommandError, Logger, Guards } from "dd-botkit";

export const Say: Command = {
    opts: {
        name: "say",
        access: AccessLevel.MODERATOR,
        category: "Fun",
        guards: [
            Guards.Argumented("say", "Have the bot say something.", [
                {
                    name: "message",
                    type: "string",
                    required: true
                }
            ])
        ]
    },
    handler: async (msg, next) => {
        const [message] = msg.args;

        if (!message) {
            throw new CommandError({
                message: "Please include a message to send."
            });
        }

        await msg.delete()
        await msg.send(args[0])
    }
};
