import { Command } from "dd-botkit";
import { Collection, Message, TextChannel } from "discord.js";

export const EraseChannel: Command = {
    opts: {
        name: "erase-channel",
        usage: {
            description: "Erases all messages in the specified channel",
            args: [
                {
                    name: "channel",
                    type: "channel"
                }
            ]
        },
        node: "moderator.erase-channel"
    },
    handler: async (msg) => {
        let messages: Collection<string, Message>;
        while ((messages = await (msg.args[0] as any as TextChannel).fetchMessages({ limit: 100 })).size > 0) {
            await msg.channel.bulkDelete(messages);
        }
        await msg.author.send(`I'm done cleaning <#${msg.channel.id}>`);
    }
};