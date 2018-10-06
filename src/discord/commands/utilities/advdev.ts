import { Command, AccessLevel, CommandError, Logger, Guards } from "dd-botkit";
import { User } from "discord.js";
export const AdvDevCommand: Command = {
    opts: {
        name: "advdev",
        access: AccessLevel.ADMIN,
        category: "Utilities",
        guards: [
            Guards.Argumented(
                "advdev",
                "Decline or accept a user to advanced developer.",
                [
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
                ]
            )
        ]
    },
    handler: async (message, next) => {
        if (message.guild.id !== "349243932447604736") return message.fail();
        // decision == false - decline
        // decision == true - accept
        const [decision, _user]: any | User = message.args;
        const user: User = _user;
        const member = message.guild.members.get(user.id);
        if (!member) return;
        if (decision) {
            // Accept user.
            await user.send(
                `Hi ${
                    user.username
                }}\nThank you for applying to the Advanced Developer role; we appreciate your work and enthusiasm. We are incredibly happy to inform you that your application has been approved 🎉. As you may know, this gives you access to #developer-backroom.\nThis channel is locked to the public, and nothing is to be leaked, without a developer's or and administrators permission. If you are caught sharing secret information, we will make the necessary decisions about your punishment.`
            );
            await member.addRole("Advanced Developers");
            return message.success();
        }
        // Reject user.
        await user.send(`Hi ${
            user.username
        }\nThank you for applying for the Advanced Developer role; we appreciate your work and enthusiasm. We regret to inform you that your application for Advanced Developer was not accepted at this time, as unfortunately, we are not able to accept every application. We loved reading over your application, and encourage you to re-apply when you feel that you meet the criteria; you're more than welcome to do this in a months time. We look forward to see you in #development, and you'll still retain your Developer role. 

        Best regards, 
        the /r/jailbreak discord staff`);
    }
};
