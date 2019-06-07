import { Command } from "dd-botkit";

export const SetPrefix: Command = {
    opts: {
        name: "set-prefix",
        usage: {
            description: "Sets the prefix used to invoke the bot in this guild.",
            args: [
                {
                    name: "prefix",
                    type: "string"
                }
            ]
        },
        node: "configuration.set-prefix"
    },
    handler: async (msg) => {
        const config = await msg.guild.db.config;
        config.commandPrefix = msg.args[0] as string;
        return config.save().then(() => msg.success());
    }
};