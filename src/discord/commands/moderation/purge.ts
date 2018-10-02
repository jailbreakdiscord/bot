import { Command, AccessLevel, CommandError, Logger, Guards } from "dd-botkit";
import { GuildMember } from "discord.js";
export const PurgeCommand: Command = {
    opts: {
        name: "purge",
        access: AccessLevel.MODERATOR,
        category: "Moderation",
        guards: [
            Guards.Argumented("purge", "Purge a channel.", [
                {
                    name: "amount",
                    type: "number",
                    required: true
                }
            ])
        ]
    },
    handler: async (message, next) => {
        const [amount]: any | number = message.args;
        if (amount > 100 || amount < 2) {
            throw new CommandError({ message: "Please provide a number between 2 and 99." });
        }
        
        // This syntax could be clarified if necessary.
        await message.channel.bulkDelete(await message.channel.fetchMessages({ limit: amount + 1 }));
    }
};
