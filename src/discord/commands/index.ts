import { Command } from "dd-botkit";

import { User, Guild } from "../../database/entities";

export const TestCommand: Command = {
    opts: {
        name: "test"
    },
    handler: async (msg, next) => {
        const user = await User.findOne({ id: msg.author.id });
        console.log(user);
        console.log(await user!.messages);
        const guild = await Guild.findOne({ id: msg.guild.id });
        console.log(await guild!.members);

        await msg.reply("logged some db test stuff to console!");
    }
};
