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
            // Accept user.
            await user.send(`Hi ${user.username}}\nThank you for applying to the Advanced Developer role; we appreciate your work and enthusiasm. We are incredibly happy to inform you that your application has been approved 🎉. `);
            await member.addRole("Advanced Developers");
            return message.success();
        }
        // Reject user.
        await user.send(`Hi ${user.username}\nThank you for applying for the Advanced Developer role; we appreciate your work and enthusiasm. We regret to inform you that your application for Advanced Developer was not accepted at this time, as unfortunately, we are not able to accept every application. We loved reading over your application, and encourage you to re-apply when you feel that you meet the criteria; you're more than welcome to do this in a months time. We look forward to see you in #development, and you'll still retain your Developer role. 

        Best regards, 
        the /r/jailbreak discord staff`);
    }
};
