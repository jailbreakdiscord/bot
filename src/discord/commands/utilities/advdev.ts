import { Command, AccessLevel, CommandError, Logger, Guards } from "dd-botkit";
import { User } from "discord.js";
export const KickCommand: Command = {
    opts: {
        name: "advdev",
        access: AccessLevel.ADMIN,
        category: "Utilities",
        guards: [
            Guards.Argumented("kick", "Kicks a user", [
                {
                    name: "Decline or accept",
                    type: "boolean",
                    required: true
                },
                {
                    name: "user",
                    type: "user",
                    required: true,
                    unlimited: true
                }
            ])
        ]
    },
    handler: async (message, next) => {
        // decision == false - decline
        // decision == true - accept
        const [decision, _user]: any | User = message.args;
        const user: User = _user;
        const member = message.guild.members.get(user.id);
        if (!member) return;
        if (decision) {
            await user.send("some message to accept");
            await member.addRole("Advanced Developers");
            return message.success();
        }
        await user.send("some message declining developer");
    }
};
